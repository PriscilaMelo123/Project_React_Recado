export const Header: any = () => {
  const userName = localStorage.getItem("authName");
  return (
    <>
      <header className='container-fluid bg-white rounded-4'>
        {/* <!--CABEÇALHO--> */}
        <div className=''>
          <h1 className='fw-bold text-center p-2'>Meus Recados</h1>
          <h2 className='text-center p-2'>
            Bem vindo -{" "}
            <span className='text-center text-decoration-underline fs-4 p-2'>
              {userName}
            </span>
          </h2>
          <div>
            {/* <button onClick={newTask} className='btn btn-dark'>
              Nova Task
            </button>
            <button onClick={handleLogout} className='btn btn-primary m-1'>
              Sair
            </button> */}
            {/* <Formulario /> */}
          </div>
        </div>
      </header>
    </>
  );
};
