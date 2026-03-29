import { useContext } from "react";
import { NotesContext } from "./noteContext";

/*
 * 3. Hook (Custom Hook)
 * Providerが配ったContextの値を利用するための「API」
 */
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}