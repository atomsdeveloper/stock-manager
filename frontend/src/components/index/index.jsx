import React, {useState} from "react";
import Swal from 'sweetalert2';

import { useNavigate } from "react-router-dom";

// Styles
import '../../assets/css/index.css';

const Index = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const request = async (event) => {
      event.preventDefault();

      if (!name && !email && !password) {
        Swal.fire({
          icon: 'error',
          title: 'Ops...',
          text: 'All fields are required',
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }

      try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
          throw new Error('Network response failed');
        }

        const data = await response.json();
        if (!data) {
          throw new Error('Data response not exists.');
        } 

        localStorage.setItem('name', data.user.name);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('token', data.token);

        navigate('/home')
      } catch (error) {
        console.error('Error:', error);
      }
}
  return (
    <div className="container">
      <div className="container-content">

        <form className="form-entrar" onSubmit={request}>
          <div className="form-group">
            <div className="form-title">
              <h1>Bem vindo ao <br /> Gerenciador de Estoque.</h1>
              <img src="/icons/icon-box.png" alt="Icone do Título do Formulário." />
            </div>
            <input
              type="text"
              name="usuario"
              placeholder="Dígite seu usuário..."
              className="form-control"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Dígite seu e-mail..."
              className="form-control"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="senha"
              placeholder="Dígite seu senha..."
              className="form-control"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-success">
              Entrar
            </button>
          </div>
        </form>
        
        <div className="container-image">
          <div className="image-tag">
            <img src="/images/image-login.jpg" alt="Imagem de Login" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index;

