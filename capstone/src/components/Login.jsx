import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = ({setToken, userInfo, setUserInfo}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                email,
                password
            })
        });
        const result = await response.json();
        console.log(result)
        setMessage(result.message);
        setToken(result.token)

        setUserInfo(result.user)
        if(result.token && result.user){
        localStorage.setItem("token", JSON.stringify(result.token))
        localStorage.setItem("user", JSON.stringify(result.user))
        localStorage.setItem("loggedIn", true)
        if(result.token){
          navigate('/Profile') 
        }
        if(!response.ok) {
          throw(result)
        }
        setEmail('');
        setPassword('');
    } }catch (err) {
        console.error(`${err.name}: ${err.message}`);
    }}
  

  const handleSubmit = (e) => {
    e.preventDefault();
    login();  
  };

  return (
    <div className = "loginPage">
      <h2>Login</h2>

     

      <form className='form'onSubmit={handleSubmit}>
     
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type='submit'>Sign In</button> <br/>
        <div className='registerLink'>
        <Link to="/Register">Register </Link> </div>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;