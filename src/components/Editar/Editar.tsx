import { useContext, useState, ChangeEvent } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Editar: any = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const userName = localStorage.getItem("authName");
  const userToken = localStorage.getItem("authToken");

  const params = useParams();
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");

  const handleDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleDetailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDetail(event.target.value);
  };

  function voltar() {
    navigate("/tasks");
  }

  async function handleEditTask() {
    setDescription(description);
    setDetail(detail);
    debugger;
    if (params) {
      const id = params.id;
      if (userToken && id) {
        await auth.editTask(id, description, detail, userToken);
      }
    }
    navigate("/private");
  }

  return (
    <>
      <div className='container mt-5 rounded-4 shadow'>
        <div className='row bg-white rounded-4 align-items-md-stretch'>
          <header className='container-fluid bg-white rounded-4'>
            <div className=''>
              <h1 className='fw-bold text-center p-2'>Meus Recados</h1>
              <h2 className='text-center p-2'>
                Bem vindo -{" "}
                <span className='text-center text-decoration-underline fs-4 p-2'>
                  {userName}
                </span>
              </h2>
              {/* <div>
                <button onClick={voltar} className='btn btn-primary m-1'>
                  Voltar
                </button>
              </div> */}
            </div>
          </header>
        </div>
      </div>
      <div className='container shadow'>
        <Form
          className='row  mt-2 bg-white rounded-4'
          onSubmit={handleEditTask}
        >
          <Form.Group className='col-12 col-sm-12 m-1'>
            <Form.Control
              type='text'
              placeholder='Descrição'
              name='description'
              id='description'
              //value={result?.description}
              onChange={handleDescriptionInput}
            />
          </Form.Group>
          <Form.Group className='col-12 col-sm-12 m-1'>
            <Form.Control
              type='text'
              placeholder='Detalhamento'
              name='detail'
              id='detail'
              //value={result?.detail}
              onChange={handleDetailInput}
            />
          </Form.Group>
          <Form.Group className='row m-1'>
            <Button
              className=' btn col-12 col-sm-2 m-1'
              variant='success'
              // onClick={createTk}
              type='submit'
            >
              Salvar
            </Button>
            <Button
              className=' btn col-12 col-sm-2 m-1'
              variant='primary'
              onClick={voltar}
            >
              Voltar
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};
