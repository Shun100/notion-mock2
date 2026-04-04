import Item from './Item';
import NoteList from '../NoteList';
import UserItem from './UserItem';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { noteRepository } from '../../modules/notes/noteRepository';
import { useNotes } from '../../modules/notes/noteHook';
import { useNavigate } from 'react-router-dom';

type Props = {
  onSearchButtonClick: () => void;
}

// ナビゲーションメニューのReactコンポーネント
export default function SideBar({ onSearchButtonClick }: Props) {
  const { notes, setNotes }  = useNotes();
  const navigate = useNavigate();

  // ノート作成
  const createNote = async (): Promise<void> => {
    try {
      const newNote = await noteRepository.create({ title: '無題' });
      setNotes([newNote, ...(notes ?? [])]); // ノート一覧に追加
      if (newNote) {
        navigate(`/notes/${newNote.id}`); // 詳細画面に遷移
      }
    } catch (error) {
      console.error(error);
      alert('ノートの作成に失敗しました');
    }
  }

  return (
    <>
      <aside
        className='sidebar'
        onClick={() => {
          navigate('/');
        }} // 余白部分をクリックしたらホーム画面にリダイレクト
      >
        <div>
          <div>
            <UserItem />
            <Item
              label='検索'
              icon={FiSearch}
              onClick={onSearchButtonClick}
            />
          </div>
          <div className='sidebar-spacer'>
            <NoteList />
            <Item
              label='ノートを作成'
              icon={FiPlus}
              onClick={createNote}
            />
          </div>
        </div>
      </aside>
      <div className='sidebar-placeholder'></div>
    </>
  );
}
