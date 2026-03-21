import SideBar from './components/SideBar';
import SearchModal from './components/SearchModal';
import './styles/layout.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './components/context/AuthContext';

// 画面の共通部分
export default function Layout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 未ログインならサインイン画面にリダイレクト
  if (!user) {
    navigate('/signin');
  }

  return (
    <div className='layout-container'>
      <SideBar /> {/* ノート一覧を表示するサイドバー */}
      <main className='layout-main'>
        <Outlet /> {/* ここに入るコンポーネントはURLによって動的に変わる */}
      </main>
      <SearchModal /> {/* ノート検索画面 */}
    </div>
  );
}
