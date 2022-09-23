import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import { RequireAuth } from "./contexts/Auth/RequireAuth";
import { Private } from "./pages/Private";
import { Recados } from "./components/Recados/Recados";
import { Login } from "./pages/Login";
import { CriarLogin } from "./pages/CriarLogin";

function App() {
  return (
    <div className='App'>
      {/* <header>
        <nav>
          <br />
          <Link to='/'>Home</Link>
          <Link to='/signup'>Criar login</Link>
          <Link to='/tasks'>Recados</Link>
          <Link to='/private'>Página Privada</Link>
        </nav>
      </header>
      <hr /> */}
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<CriarLogin />} />
        <Route path='/tasks' element={<Recados />} />
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
