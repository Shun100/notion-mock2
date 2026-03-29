import { useContext } from "react";
import { AuthContext } from "./authContext";

/*
 * 3. Hook (Custom Hook)
 * Providerが配ったContextの値を利用するための「API」
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}