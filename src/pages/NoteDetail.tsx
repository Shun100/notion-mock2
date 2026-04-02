import { useParams } from 'react-router-dom';
import TitleInput from '../components/TitleInput';
import '../styles/pages/note-detail.css';
import { noteRepository } from '../modules/notes/noteRepository';
import { useEffect, useState } from 'react';
import type { Note } from '../modules/notes/noteEntity';
import { useNotes } from '../modules/notes/noteHook';

export default function NoteDetail() {
  const params = useParams(); // useParams: URLのパラメータを取得するフック
  const id = parseInt(params.id!);
  const [note, setNote] = useState<Note | null>(null);
  const { notes, setNotes } = useNotes();

  // ノート更新
  const updateNote = async (title: string): Promise<Note | null> => {
    if (note) {
      const updatedNote = noteRepository.update(
        note.id,
        { title, content: note.content }
      );
      return updatedNote;
    } else {
      return null;
    }
  }

  // タイトル変更時処理
  const onTitleChange = async (newTitle: string) => {
    if (note) {
      const updatedNote = await updateNote(newTitle);
      // setNote(updatedNote);
      
      // ノート一覧更新
      if (notes && updatedNote) {
        const updatedNotes = notes.map(n => n.id === note.id ? updatedNote : n);
        setNotes(updatedNotes);
      }
    }
  }

  useEffect(() => {
    const getById = async () => {
      const note = await noteRepository.getById(id);
      setNote(note);
    }
    getById();
  }, [id]);

  if (note) {
    return (
      <div className="note-detail-container">
        <div className="note-detail-content">
          <TitleInput initialTitle={note.title} onTitleChange={onTitleChange}/>
        </div>
      </div>
    );
  } else {
    return <div>note does note exist</div>;
  }
}
