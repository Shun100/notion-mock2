import SideBar from './components/SideBar';
import SearchModal from './components/SearchModal';
import './styles/layout.css';
import { Outlet } from 'react-router-dom';

// 画面の共通部分
export default function Layout() {
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
