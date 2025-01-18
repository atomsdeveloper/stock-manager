import React from "react";

import { useNavigate } from "react-router-dom";

// Styles
import '../../assets/css/app.css';

const Home = async () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    // Redireciona para login se o token não existir
    navigate('/');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/home', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Unauthorized access');
    }

    const data = await response.json();
  } catch (error) {
    console.error('Error:', error);
    navigate('/'); // Redireciona para login em caso de erro
  }

  return (
    <div className="container">
       <h1>Home</h1>
    </div>
  )
}

export default Home;

