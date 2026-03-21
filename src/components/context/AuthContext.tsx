import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../../moudules/users/user.entity"

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

/*
 * カスタムフック
 * アプリ全体に適用したければApp.tsxに以下のように記述する
 * function App() {
 *  return (
 *    <AuthProvider>
 *      <Home />
 *    </AuthProvider>  
 *  );
 * }
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}