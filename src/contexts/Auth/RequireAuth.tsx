import { useContext } from "react";
import { CriarLogin } from "../../pages/CriarLogin";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);

  const userToken = localStorage.getItem("authToken");

  if (!userToken) {
    return <CriarLogin />;
  }

  return children;
};
