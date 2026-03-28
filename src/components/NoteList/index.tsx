import { useNotes } from '../context/NotesContext';
import NoteItem from './NoteItem';

type Props = {
  layer?: number;
  parentId?: number;
}

// ノート一覧を表すReactコンポーネント
export default function NoteList({ layer = 0, parentId}: Props) {
  const { notes } = useNotes();

  return (
    <>
      {
        /*
         * リストを描画するとき、Reactでは必ず各行に key属性 を付ける決まりがある
         * 各行をReactが識別して、効率よく再レンダリングするため
         */
        notes?.map(note => <div key={note.id}><NoteItem note={note} layer={0}/></div>)

        // notes?.filter(note => note.parentId == parentId)
        //   .map(note => 
        //     <div key={note.id}>
        //       {/* 本ノート */}
        //       <NoteItem note={note} layer={layer} />
              
        //       {/* 子ノート一覧 */}
        //       <NoteList layer={layer++} parentId={parentId} />
        //     </div>
        //   )
      }
    </>
  );
}
