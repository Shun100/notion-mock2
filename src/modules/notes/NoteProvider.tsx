import { useState, type ReactNode } from "react";
import type { Note } from "./noteEntity";
import { NotesContext } from "./noteContext";

/*
 * 2. Provider
 * Contextに値を入れて、子コンポーネントに届ける「配達役」
 * 
 * アプリ全体に適用したければApp.tsxに以下のように記述する
 * function App() {
 *  return (
 *    <AuthProvider>
 *      <Home />
 *    </AuthProvider>  
 *  );
 * }
 */
export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[] | null>(null);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  )
}