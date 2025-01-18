import React from "react";

import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

// Components
import Index from "./components/index";
import Home from "./components/home";

// Styles
import './assets/css/app.css';

export const Error = () => {
  return (
    <div class="container">
      <h1>Error</h1>
    </div>
  );
}

export const PrivateRoute = ({children}) => {
  const token = localStorage.getItem('token');
  if(!token) {
    return (
      <Navigate to={"/"}/>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
          <Route path="/home" element={
            <>
              <PrivateRoute>
                < Home/>
              </PrivateRoute>
            </>
          } 
          />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App;
