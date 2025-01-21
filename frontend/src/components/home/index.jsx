import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import '../../assets/css/index.css';

const Home = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const requestToken = async () => {
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
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          navigate('/')
          throw new Error('Unauthorized access');
        }
    
      } catch (error) {
        navigate('/'); 
      }
    }

    requestToken();
  }, [navigate])

  return (
    <div>
       <h1>Home</h1>
    </div>
  )
}

export default Home;

