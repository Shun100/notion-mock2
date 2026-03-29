import { createContext } from "react";
import type { Note } from "./note.entity";

/*
 * 1. Context
 * 状態や関数など「共有したい値」を入れておく入れ物
 */
type NotesContextType = {
  notes: Note[] | null,
  setNotes: (notes: Note[] | null) => void
}

export const NotesContext = createContext<NotesContextType | null>(null);