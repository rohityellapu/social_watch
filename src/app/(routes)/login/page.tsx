'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {addLogin} from '@/slices/authSlice';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
// TODO remove, this demo shouldn't need to reset the theme.
// var [authenticated,setAuth] = useState(false)
// export var isAuthenticated = () => authenticated
// export var authenticateUser = () => { authenticated = true }
// export const unauthenticateUser = () => {authenticated = false}
export default function SignIn() {
  const [loginStatus, setStatus] = useState(0);
  const router = useRouter()
  const dispatch = useDispatch()
  const auth = useSelector((state: any) => state.auth)
  console.log(auth,"auth")

  // auth useEffect

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email_address: data.get('email'),
      password: data.get('password'),
    });

    var raw = JSON.stringify({
      email_address: data.get('email'),
      password: data.get('password')
    });
    await axios.post('http://localhost:8000/login', raw, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        console.log(response.data.data[0],"REPONSE LOGIN");
        // set dATA into local storage
        let token ={
          client_id:response.data.data[0].client_id,
          email_address:response.data.data[0].email_address,
          token:response.data.data[0].email_token
        }
        console.log(token,"token")
        localStorage.setItem('token', JSON.stringify(token));
        dispatch(addLogin(true))
        if (auth?.isLogin) {
          router.push('/connect')
        }
        else {
         router.push('/')
        }
      })
      .catch(function (error) {
        console.log(error,"error");
      });


  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        {loginStatus == -1 ? <p>Incorrect Data</p> : <p></p>}
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>

        </Box>
      </Box>

    </Container>
  );
}