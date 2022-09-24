import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { Login } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<Login | null>(null);
  const api = useApi();

  // useEffect(() => {
  //   const validateToken = async () => {
  //     const storageData = localStorage.getItem("authToken");
  //     if (storageData) {
  //       const data = await api.validateToken(storageData);
  //       if (data.ok) {
  //         setUser(data);
  //       }
  //     }
  //   };
  //   validateToken();
  // }, [api]);

  // useEffect(() => {
  //   const testeTask = async () => {
  //     const storageTask = localStorage.getItem("authToken");
  //     if (storageTask) {
  //       const task = await api.loadTask(storageTask);
  //       console.log(task);
  //     }
  //   };
  //   testeTask();
  // }, [api]);

  const signin = async (name: string, pass: string) => {
    const data = await api.signin(name, pass);
    if (data.ok) {
      setUser(data);
      setToken(data.data.token);
      setData(data.data.task);
      return true;
    }
    return false;
  };

  const signup = async (name: string, pass: string, Rpass: string) => {
    const data = await api.signup(name, pass, Rpass);
    if (data.ok) {
      setUser(data);
      setToken(data.data.token);
      setData(data.data.name);
      return true;
    }
    return false;
  };

  const signout = async () => {
    console.log("signout está sendo executada.");
    setUser(null);
    setToken("");
    setData("");
    await api.logout();
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const setData = (data: any) => {
    localStorage.setItem("authData", data);
  };

  // const loadTask = async (token: string) => {
  //   const teste = await api.loadTask(token);
  //   debugger;
  //   console.log(teste);
  //   if (token) {
  //     console.log("ola");
  //     return true;
  //   }
  //   return false;
  // };

  return (
    <AuthContext.Provider value={{ user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
