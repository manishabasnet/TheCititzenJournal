import React, { useState } from 'react';
import axios from 'axios';
import signupstyles from './SignUp.module.css'

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/signup/', {
        name,
        email,
        password,
      });
      console.log(response.data);
      // Clear the form fields after successful submission
      setName('');
      setEmail('');
      setPassword('');
      //Can redirect to login or show a success message here
    } catch (error) {
      console.error('There was an error signing up!', error);
    }
  };

  return (
    <div className={signupstyles.formcontainer}>
        <div className={signupstyles.welcomemessage}><h1> Welcome to The Citizen Journal</h1></div>
        <form onSubmit={handleSubmit} className={signupstyles.form}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button className={signupstyles.button} type="submit">Sign Up</button>
        </form>
    </div>
  );
}

export default Signup;
