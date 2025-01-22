import React, {useState} from "react";
import Swal from 'sweetalert2';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

import {
  Button
} from "../../components/ui/button"

import {
  Input
} from "../../components/ui/input"

import { useNavigate } from "react-router-dom";

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
    <div className="w-screen h-screen bg-slate-400">

      <div className="flex flex-row h-full bg-slate-300">

        <Card className="flex flex-col justify-center items-center w-2/4 h-full">
          <CardHeader>
            <CardTitle>Bem Vindo ao Gerenciador de Estoque.</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col justify-center items-center h-ful" onSubmit={request}>
              <Input
                type="text"
                name="usuario"
                placeholder="Dígite seu usuário..."
                className="form-control"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                name="email"
                placeholder="Dígite seu e-mail..."
                className="form-control"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                name="senha"
                placeholder="Dígite seu senha..."
                className="form-control"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit">Enviar</Button>
          </CardFooter>
        </Card>
        <div className="w-2/4 h-full rotate-90">
            <img className="w-full rotate-180" src="/images/image-login.jpg" alt="Imagem de Login" />
        </div>

      </div>
    </div>
  )
}

export default Index;

