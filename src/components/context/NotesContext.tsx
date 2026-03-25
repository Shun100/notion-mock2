import { createContext, useContext, useState, type ReactNode } from "react";
import type { Note } from "../../modules/notes/note.entity";

type NotesContextType = {
  notes: Note[] | null,
  setNotes: (notes: Note[] | null) => void
}

const NotesContext = createContext<NotesContextType | null>(null);

// Contextの公開範囲
export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[] | null>(null);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  )
}

// カスタムフック
export const useNotes = () => {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}