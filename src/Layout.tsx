import SideBar from './components/SideBar';
import SearchModal from './components/SearchModal';
import './styles/layout.css';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

// 画面の共通部分
export default function Layout() {
  const[isShowModal, setIsShowModal] = useState(false);

  const showSearchModal = () => {
    setIsShowModal(true);
  }

  const closeSearchModal = () => {
    setIsShowModal(false);
  }

  return (
    <div className='layout-container'>
      <SideBar onSearchButtonClick={showSearchModal} /> {/* ノート一覧を表示するサイドバー */}
      <main className='layout-main'>
        <Outlet /> {/* ここに入るコンポーネントはURLによって動的に変わる */}
      </main>
      <SearchModal isOpen={isShowModal} onClose={closeSearchModal}/> {/* ノート検索画面 */}
    </div>
  );
}
