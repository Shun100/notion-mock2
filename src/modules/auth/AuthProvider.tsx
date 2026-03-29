import { useState, type ReactNode } from "react";
import type { User } from "../users/userEntity";
import { AuthContext } from "./authContext";

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
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}> {/* Contextの公開範囲 */}
      {children} {/* 子コンポーネント */}
    </AuthContext.Provider>
  )
}