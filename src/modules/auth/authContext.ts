import { createContext } from "react";
import type { User } from "../users/userEntity";

/*
 * 1. Context
 * 状態や関数など「共有したい値」を入れておく入れ物
 */
type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | null>(null);