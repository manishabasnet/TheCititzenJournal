import React, { useState } from 'react';
import axios from 'axios';
import loginstyles from './Login.module.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Save tokens to localStorage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('username', response.data.username);

      navigate('/artifacts'); 
    } catch (error) {
      console.error('Invalid Credential. Check your email address and password', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={loginstyles.form}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button className={loginstyles.button} type="submit">Login</button>
    </form>
  );
}

export default Login;
