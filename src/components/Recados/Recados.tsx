import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import "./Recados.css";
import { Button, Form } from "react-bootstrap";
import { Formulario } from "../Formulario/Formulario";
import { Login, Recado } from "../../types/User";
import { api, useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signout();
    window.location.href = window.location.href;
  };

  const [tasks, setTasks] = useState<ITask[]>([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    loadTask();
  }, []);

  async function loadTask() {
    if (auth.user?.data.userId) {
      const tasks = await api.get(
        `/task/readTasksByUserId?token=${auth.user.data.token}`
      );
      console.log(tasks.data.data);
      setTasks(tasks.data.data);
    }
  }

  function newTask() {
    navigate("/new_tasks");
  }

  async function deletTask(id: string) {
    const token = localStorage.getItem("authToken");
    if (auth.user?.ok) {
      const del = await api.delete(`/task/${id}?token=${token}`);
      console.log(del);
    }
    loadTask();
  }

  return (
    <>
      <div className='container mt-5 rounded-4 shadow'>
        <div className='row bg-white rounded-4 align-items-md-stretch'>
          <header className='container-fluid bg-white rounded-4'>
            {/* <!--CABEÇALHO--> */}
            <div className=''>
              <h1 className='fw-bold text-start p-2'>Meus Recados</h1>
              <h2 className='text-center p-2'>
                Bem vindo -{" "}
                <span className='text-center text-decoration-underline fs-4 p-2'>
                  {auth.user?.data.userName}
                </span>
                {auth.user && (
                  <button onClick={handleLogout} className='btn btn-primary'>
                    Sair
                  </button>
                )}
              </h2>
              <div>
                <button onClick={newTask} className='btn btn-dark'>
                  Nova Task
                </button>
                {/* <Formulario /> */}
              </div>
              {/* <form action='' className='row mt-2 bg-white'>
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
              </form> */}
            </div>
          </header>
          <main>
            <div className='m-2 table-responsive'>
              <table className='table table-hover align-middle' id='note-table'>
                <thead className=''>
                  <tr className='fw-bold text-start'>
                    <th>Descrição</th>
                    <th>Detalhamento</th>
                    <th className='text-center'>Ações</th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td className='text-start'>{task.description}</td>
                      <td className='text-start'>{task.detail}</td>
                      <td>
                        <button className='btn btn-primary m-1'>Editar</button>
                        <button
                          className='btn btn-danger m-1'
                          onClick={() => deletTask(task.id)}
                        >
                          Apagar
                        </button>
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
