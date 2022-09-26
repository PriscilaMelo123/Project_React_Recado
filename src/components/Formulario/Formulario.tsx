import axios from "axios";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../contexts/Auth/AuthContext";

// interface ITask {
//   description: string;
//   detail: string;
//   token: string;
// }

interface ITask {
  ok: boolean;
  created_at: Date;
  updated_at: Date;
  description: string;
  detail: string;
  id: string;
  data: [];
}

export const Formulario: any = () => {
  // const [model, setModel] = useState<ITask>({
  //   description: "",
  //   detail: "",
  //   token: "",
  // });

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // const api = axios.create({
  //   baseURL: process.env.REACT_APP_API,
  // });

  const token = localStorage.getItem("authToken");

  // console.log(token);

  // function updatedModel(e: ChangeEvent<HTMLInputElement>) {
  //   setModel({
  //     ...model,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [tk, setTk] = useState("");

  const handleDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleDetailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDetail(event.target.value);
  };

  const createTk = async () => {
    if (token) {
      const tk = await auth.createTask(description, detail, token);
      //debugger;
      if (tk) {
        navigate("/private");
      } else {
        alert("Não deu certo.");
      }
    }
  };

  // const api = axios.create({
  //   baseURL: process.env.REACT_APP_API,
  // });

  // const [tasks, setTasks] = useState<ITask[]>([]);

  // useEffect(() => {
  //   loadTask();
  // }, []);

  // async function loadTask() {
  //   if (auth.user?.data.userId) {
  //     const tasks = await api.get(
  //       `/task/readTasksByUserId?token=${auth.user.data.token}`
  //     );

  //     setTasks(tasks.data.data);
  //     //console.log(tasks.data.data);
  //   }
  // }
  // async function onSubmit(e: ChangeEvent<HTMLFormElement>, token: AuthContextType) {
  //   e.preventDefault();
  //   debugger;

  //   if (auth.user?.ok) {
  //     const response = await api.post("/task/", { e, auth.user.data.token });
  //     console.log(response);
  //   }
  // }

  return (
    <>
      <div className='container'>
        <Form className='row  mt-2 bg-white'>
          <Form.Group className='col-12 col-sm-5 m-1'>
            <Form.Control
              type='text'
              placeholder='Descrição'
              name='description'
              onChange={handleDescriptionInput}
            />
          </Form.Group>
          <Form.Group className='col-12 col-sm-5 m-1'>
            <Form.Control
              type='text'
              placeholder='Detalhamento'
              name='detail'
              onChange={handleDetailInput}
            />
          </Form.Group>
          <Button
            className=' btn col-12 col-sm-1 m-1'
            variant='success'
            onClick={createTk}
          >
            Salvar
          </Button>
        </Form>
      </div>
    </>
  );
};
