import React from "react";

import { useNavigate } from "react-router-dom";

// Styles
import '../../assets/css/index.css';

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

  } catch (error) {
    navigate('/'); 
  }

  return (
    <div className="">
       <h1>Home</h1>
    </div>
  )
}

export default Home;

