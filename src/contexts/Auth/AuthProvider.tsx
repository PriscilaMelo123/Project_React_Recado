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
      api.loadTask(userToken);
    }
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

  const signin = async (name: string, pass: string) => {
    const data = await api.signin(name, pass);
    if (data.ok) {
      setUser(data);
      setUserName(data.data.userName);
      setUserId(data.data.userId);
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
    setUserName("");
    setToken("");
    setData("");
    setUserId("");
    await api.logout();
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const setData = (data: any) => {
    localStorage.setItem("authData", JSON.stringify(data));
  };

  const setUserName = (data: string) => {
    localStorage.setItem("authName", JSON.stringify(data));
  };

  const setUserId = (data: string) => {
    localStorage.setItem("authId", JSON.stringify(data));
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

  const loadTask = async (token: string) => {
    if (userToken) {
      const tasks = await api.loadTask(token);
      setUser(tasks.data);
      return tasks.data;
    }
    return false;
  };

  const deletTask = async (id: string, token: string) => {
    const del = await api.deletTask(id, token);
    console.log(del);
    return del;
  };

  return (
    <AuthContext.Provider
      value={{ user, signin, signup, signout, createTask, loadTask, deletTask }}
    >
      {children}
    </AuthContext.Provider>
  );
};
