import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { Login } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<Login | null>(null);
  const api = useApi();
  const auth = useContext(AuthContext);

  const userToken = localStorage.getItem("authToken");
  const usersStorage = localStorage.getItem("authData");

  useEffect(() => {
    if (userToken) {
      api.validateToken(userToken);
    }
    // if (userToken && usersStorage) {
    //   //debugger;
    //   const hasUser = JSON.parse(usersStorage)?.filter(
    //     (user: any) => user. === JSON.parse(userToken)
    //   );

    //   if (hasUser) setUser(hasUser[0]);
    // }
  }, []);

  // useEffect(() => {
  //   validateToken();
  // }, []);

  // const validateToken = async () => {
  //   const storageData = localStorage.getItem("authToken");
  //   if (storageData) {
  //     const data = await api.loadTask(storageData);
  //     if (data.ok) {
  //       setUser(data);
  //     }
  //   }
  // };

  const loadTask: any = async (token: string) => {
    if (userToken) {
      const tasks = await api.loadTask(token);
      setUser(tasks.data.data);
      return true;
    }
    return false;
  };

  const signin = async (name: string, pass: string) => {
    const data = await api.signin(name, pass);
    if (data.ok) {
      setUser(data);
      setToken(data.data.token);
      setData(data);
      return true;
    }
    return false;
  };

  const signup = async (name: string, pass: string, Rpass: string) => {
    const data = await api.signup(name, pass, Rpass);
    if (data.ok) {
      setUser(data);
      setToken(data.data.token);
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
    localStorage.setItem("authData", JSON.stringify(data));
  };

  const createTask = async (
    description: string,
    detail: string,
    token: string
  ) => {
    const data = await api.createTask(description, detail, token);
    if (data.ok) {
      setUser(data);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{ user, signin, signup, signout, createTask, loadTask }}
    >
      {children}
    </AuthContext.Provider>
  );
};
