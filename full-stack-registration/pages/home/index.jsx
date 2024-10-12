import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../src/assets/trash.png";
import api from '../../src/services/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef();
  const inpuAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inpuAge.current.value,
      email: inputEmail.current.value
    })

    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)

    getUsers()
  }

  useEffect(() => { // Vai executar quando a página abrir
    getUsers();
  }, [])

  return (

    <div className="container">
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" type="text" name="nome" ref={inputName}/>
        <input placeholder="Idade" type="number" name="idade" ref={inpuAge}/>
        <input placeholder="E-mail" type="email" name="email" ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Criar conta</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="" />
          </button>
        </div>
      ))}
      
    </div>
  );
}

export default Home;
