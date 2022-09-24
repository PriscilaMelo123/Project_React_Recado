import { createContext } from "react";
import { Login } from "../../types/User";

export type AuthContextType = {
  user: Login | null;
  signin: (name: string, pass: string) => Promise<boolean>;
  signup: (name: string, pass: string, Rpass: string) => Promise<boolean>;
  signout: () => void;
  // loadTask: (token: string) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>(null!);
