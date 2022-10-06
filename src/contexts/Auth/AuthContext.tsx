import { createContext } from "react";
import { Login, Recado } from "../../types/User";

export type AuthContextType = {
  user: Login | null;
  signin: (name: string, pass: string) => Promise<boolean>;
  signup: (name: string, pass: string, Rpass: string) => Promise<boolean>;
  signout: () => void;
  createTask: (
    description: string,
    detail: string,
    token: string
  ) => Promise<boolean>;
  loadTask: (token: string) => Promise<any>;
  deletTask: (id: string, token: string) => Promise<any>;
};

export const AuthContext = createContext<AuthContextType>(null!);
