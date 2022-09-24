import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Recado } from "../../types/User";
import "./Recados.css";

interface ITask {
  ok: boolean;
  created_at: Date;
  updated_at: Date;
  description: string;
  detail: string;
  id: string;
  data: [];
}

export const Recados: any = () => {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
    window.location.href = window.location.href;
  };

  const api = axios.create({
    baseURL: process.env.REACT_APP_API,
  });

  const [tasks, setTasks] = useState<ITask[]>([]);
  debugger;

  useEffect(() => {
    loadTask();
  }, []);

  async function loadTask() {
    if (auth.user?.data.userId) {
      debugger;
      const tasks = await api.get(
        `/task/readTasksByUserId?token=${auth.user.data.token}`
      );

      setTasks(tasks.data.data);
      console.log(tasks.data.data);
    }
  }

  return (
    <>
      <div className='container mt-5 rounded-4 shadow'>
        <div className='row bg-white rounded-4 align-items-md-stretch'>
          <header className='container-fluid bg-white rounded-4'>
            {/* <!--CABEÇALHO--> */}
            <div className=''>
              <h1 className='fw-bold text-start p-2'>Meus Recados</h1>
              <div className='row'>
                {/* <div className='col-12 col-sm-5 m-1'>
                  <Link to='/'>Home</Link>
                </div> */}
                <div className='col-12 col-sm-1 m-1'>
                  {/* {storageData} */}
                  {auth.user?.data.userName}
                  {auth.user && (
                    <button onClick={handleLogout} className='btn btn-primary'>
                      Sair
                    </button>
                  )}
                </div>
              </div>
              <form action='' className='row mt-2 bg-white'>
                <div className='col-12 col-sm-5 m-1'>
                  <input
                    type='text'
                    name='descricao'
                    id='input-descricao'
                    placeholder='Descrição'
                    className='form-control input-note'
                  />
                </div>
                <div className='col-12 col-sm-5 m-1'>
                  <input
                    type='text'
                    name='detalhametno'
                    id='input-detalhamento'
                    placeholder='Detalhamento'
                    className='form-control input-note'
                  />
                </div>
                <div className='col-12 col-sm-1 m-1'>
                  <input
                    type='button'
                    value='Salvar'
                    className='btn btn-success'
                    id='btn-post'
                  />
                </div>
              </form>
            </div>
          </header>
          <main>
            <div className='m-2 table-responsive'>
              <table className='table table-hover align-middle' id='note-table'>
                <thead className=''>
                  <tr className='fw-bold text-start'>
                    <th>Descrição</th>
                    <th>Detalhamento</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td className='text-start'>{task.description}</td>
                      <td className='text-start'>{task.detail}</td>
                      <td>
                        <button className='btn btn-primary m-1'>Editar</button>
                        <button className='btn btn-danger m-1'>Apagar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
