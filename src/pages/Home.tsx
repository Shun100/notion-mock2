import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { FiPlus } from 'react-icons/fi';
import '../styles/pages/home.css';
import { useAuth } from '../components/context/AuthContext';
import { useEffect } from 'react';
import { authRepository } from '../moudules/auth/auth.repository';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  // ページ初回レンダリング時処理
  useEffect(() => {
    const initByCurrentUser = async () => {
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
  }, []);

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
            onChange={() => {}}
          />
          <button className='home-button' onClick={() => {}}>
            <FiPlus size={16} />
            <span>ノート作成</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
