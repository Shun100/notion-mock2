import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { FiPlus } from 'react-icons/fi';
import '../styles/pages/home.css';
import { useAuth } from '../components/context/AuthContext';
import { useEffect, useState, useRef } from 'react';
import { authRepository } from '../modules/auth/auth.repository';
import { useNavigate } from 'react-router-dom';
import { noteRepository } from '../modules/notes/note.repository';
import { useNotes } from '../components/context/NotesContext';

export default function Home() {
  const { setUser } = useAuth();
  const [title, setTitle] = useState('無題');
  const navigate = useNavigate();
  const didRun = useRef(false);
  const { notes, setNotes } = useNotes();

  /**
   * ノート新規作成
   * @returns { Promise<void> } ノート作成完了を表すPromiseオブジェクト
   */
  const createNote = async (): Promise<void> => {
    try {
      const newNote = await noteRepository.create({ title });
      setTitle(''); // ホーム画面にノート名が残ってしまうので、空文字に戻す
      setNotes([newNote, ...(notes ?? [])]); // ノート一覧に追加
    } catch (error) {
      console.error(error);
      alert('ノートの作成に失敗しました');
    }
  }

  // ページ初回レンダリング時処理
  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    /**
     * ノート一覧取得
     * @returns { Promise<void> } ノート一覧を取得したことを表すPromiseオブジェクト
     */
    const getAllNotes = async (): Promise<void> => {
      try {
        const notes = await noteRepository.getAll();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert('ノート一覧の取得に失敗しました');
      }
    }

    const initByCurrentUser = async (): Promise<void> => {
      const currentUser = await authRepository.getCurrentUser();
      if (currentUser) {
        setUser(currentUser); // ログイン済みなら、ログイン中のユーザ情報に設定
        getAllNotes();        // ノート一覧を取得
      } else {
        navigate('/signin');  // 未ログインなら、サインインページにリダイレクト
      }
    }

    initByCurrentUser();
  }, [setUser, navigate, setNotes]);

  return (
    <Card className='home-card'>
      <CardHeader className='home-card-header'>
        <CardTitle className='home-card-title'>
          新しいノートを作成してみましょう
        </CardTitle>
      </CardHeader>
      <CardContent className='home-card-content'>
        <div className='home-input-container'>
          <input
            className='home-input'
            placeholder='ノートのタイトルを入力'
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button className='home-button' onClick={createNote}>
            <FiPlus size={16} />
            <span>ノート作成</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
