import { useNotes } from '../context/NotesContext';
import NoteItem from './NoteItem';

// ノート一覧を表すReactコンポーネント
export default function NoteList() {
  const { notes } = useNotes();

  return (
    <>
      {
        notes?.map(note => <div><NoteItem note={ note }/></div>)
      }
    </>
  );
}
