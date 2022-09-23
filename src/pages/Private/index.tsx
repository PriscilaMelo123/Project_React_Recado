import { useContext } from "react";
import { Recados } from "../../components/Recados/Recados";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Private = () => {
  return (
    <div>
      <Recados />
    </div>
  );
};
