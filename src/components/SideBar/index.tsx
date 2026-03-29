import Item from './Item';
import NoteList from '../NoteList';
import UserItem from './UserItem';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { noteRepository } from '../../modules/notes/note.repository';
import { useNotes } from '../../modules/notes/noteHook';

export default function SideBar() {
  const { notes, setNotes}  = useNotes();

  /**
   * ノート作成
   */
  const createNote = async (): Promise<void> => {
    try {
      const newNote = await noteRepository.create({ title: '無題' });
      setNotes([newNote, ...(notes ?? [])]); // ノート一覧に追加
    } catch (error) {
      console.error(error);
      alert('ノートの作成に失敗しました');
    }
  }

  return (
    <>
      <aside className='sidebar'>
        <div>
          <div>
            <UserItem />
            <Item
              label='検索'
              icon={FiSearch}
              onClick={() => {}}
            />
          </div>
          <div className='sidebar-spacer'>
            <NoteList />
            <Item label='ノートを作成' icon={FiPlus} onClick={createNote} />
          </div>
        </div>
      </aside>
      <div className='sidebar-placeholder'></div>
    </>
  );
}
