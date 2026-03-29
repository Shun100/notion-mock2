import { useNotes } from '../../modules/notes/noteHook';
import NoteItem from './NoteItem';

type Props = {
  layer?: number;
  parentId?: number | null;
}

// ノート一覧を表すReactコンポーネント
export default function NoteList({ layer = 0, parentId = null }: Props) {
  const { notes } = useNotes();

  return (
    <>
      {
        /*
         * リストを描画するとき、Reactでは必ず各行に key属性 を付ける決まりがある
         * 各行をReactが識別して、効率よく再レンダリングするため
         */
        notes?.filter(note => note.parentId === parentId)
          .map(note => 
            <div key={note.id}>
              <NoteItem note={note} layer={layer} />              {/* 自身のノート */}
              <NoteList layer={layer + 1} parentId={note.id} />   {/* 自身の子ノート一覧 */}
            </div>
          )
      }
    </>
  );
}
