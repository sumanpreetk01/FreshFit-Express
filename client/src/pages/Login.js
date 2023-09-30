import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import './css/login.css'
// import { Button, TextField, Box, Typography, Container, Grid } from '@mui/material';


function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className='login-container'>
      <Link to="/signup" className='signup-link'>
        Don't have an account yet? Sign up
      </Link>

      <h2>Login</h2>
      <form className='login-form' onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
          className='input-field'
          placeholder='Email Address'
          name='email'
          type='email'
          id='email'
          onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='pwd'>Password</label>
          <input
          className='input-field'
          placeholder='Enter your password'
          name='password'
          type='password'
          id='pwd'
          onChange={handleChange}
          />
        </div>
        <div>
          {error ? (
            <div>
              <p>Your email or password is incorrect or credentials invalid!</p>
            </div>
          ): null}
          <div>
            <button className='submit-button' type='submit'>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;