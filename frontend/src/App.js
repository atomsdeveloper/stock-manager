import React, {useState} from "react";
import Swal from 'sweetalert';

// Styles
import './assets/css/index.css';
import './assets/css/app.css';

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const request = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      Swal.fire({
          icon: 'error',
          title: 'Ops...',
          text: 'All fields are required',
          footer: '<a href="#">Why do I have this issue?</a>'
      });
      return;
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
        throw new Error('Network response was not ok');
        console.error(`Error ${response.status}: ${response.statusText}`);
      }

      await response.json();
      window.location.href = 'http://localhost:8080/home';

    } catch (error) {
      console.error('Error:', error);
    }
}
  return (
    <div className="container">
      <form className="form-entrar" onSubmit={request}>
        <div className="form-group">
          <input
              type="text"
              name="usuario"
              placeholder="Usuário"
              className="form-control"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
          />
          <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="form-control"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <input
              type="password"
              name="senha"
              placeholder="Senha"
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
    </div>
  )
}

export default App;
