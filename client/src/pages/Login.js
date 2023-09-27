import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
// import { Button, CssBaseline, TextField, Box, Typography, Container } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const defaultTheme = createTheme();

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

  // return (
  //   <ThemeProvider theme={defaultTheme}>
  //   <Container component="main" maxWidth="xs">
  //     <CssBaseline />
  //     <Box
  //               sx={{
  //                 marginTop: 8,
  //                 display: 'flex',
  //                 flexDirection: 'column',
  //                 alignItems: 'center',
  //               }}
  //     >
  //     <Link to="/signup">Don't have an account yet? Signup</Link>

  //     <Typography component="h1" variant="h5">Login</Typography>
  //     <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
  //       <div>
  //         <TextField
  //         margin="normal"
  //         required
  //         fullWidth
  //         autoFocus
  //         label="Email Address"
  //         placeholder='Email Address'
  //         name='email'
  //         type='email'
  //         id='email'
  //         onChange={handleChange}
  //         />
  //       </div>
  //       <div>
  //         <TextField
  //         margin="normal"
  //         required
  //         fullWidth
  //         autoFocus
  //         label="Password"
  //         placeholder='Enter your password'
  //         name='password'
  //         type='password'
  //         id='pwd'
  //         onChange={handleChange}
  //         />
  //       </div>
  //       <div>
  //         {error ? (
  //           <div>
  //             <p>Your email or password is incorrect or credentials invalid!</p>
  //           </div>
  //         ): null}
  //         <div>
  //         <Button
  //             type="submit"
  //             fullWidth
  //             variant="contained"
  //             sx={{ mt: 3, mb: 2 }}
  //           >
  //             Login
  //           </Button>
  //         </div>
  //       </div>
  //     </Box>
  //     </Box>
  //   </Container>
  //   </ThemeProvider>
  // );

  return (
    <div>
      <Link to="/signup">Don't have an account yet? Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
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
            <button type='submit'>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;