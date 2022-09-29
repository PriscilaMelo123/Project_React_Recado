import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RequireAuth } from "./contexts/Auth/RequireAuth";
import { Private } from "./pages/Private";
import { Recados } from "./components/Recados/Recados";
import { Login } from "./pages/Login";
import { CriarLogin } from "./pages/CriarLogin";
import { Formulario } from "./components/Formulario/Formulario";
import { useEffect } from "react";
import { useApi } from "./hooks/useApi";

function App() {
  const navigate = useNavigate();
  const api = useApi();
  const userToken = localStorage.getItem("authToken");
  useEffect(() => {
    if (userToken) {
      api.validateToken(userToken);
      navigate("/private");
    }
  }, []);
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<CriarLogin />} />
        <Route path='/tasks' element={<Recados />} />
        <Route path='/new_tasks' element={<Formulario />} />
        <Route
          path='/private'
          element={
            <RequireAuth>
              <Private />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
