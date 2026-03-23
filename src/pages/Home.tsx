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

export default function Home() {
  const { setUser } = useAuth();
  const [title, setTitle] = useState('無題');
  const navigate = useNavigate();
  const didRun = useRef(false);

  /**
   * ノート新規作成
   * @returns { Promise<void> } ノート作成完了を表すPromiseオブジェクト
   */
  const createNote = async (): Promise<void> => {
    try {
      await noteRepository.create({ title });
      setTitle(''); // ホーム画面にノート名が残ってしまうので、空文字に戻す
    } catch (error) {
      console.error(error);
      alert('ノートの作成に失敗しました');
    }
  }

  // ページ初回レンダリング時処理
  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const initByCurrentUser = async (): Promise<void> => {
      const currentUser = await authRepository.getCurrentUser();
      if (currentUser) {
        // ログイン済みなら、ログイン中のユーザ情報に設定
        setUser(currentUser);
      } else {
        // 未ログインなら、サインインページにリダイレクト
        navigate('/signin');
      }
    }
    initByCurrentUser();
  }, [setUser, navigate]);

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
