'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.
// var [authenticated,setAuth] = useState(false)
// export var isAuthenticated = () => authenticated
// export var authenticateUser = () => { authenticated = true }
// export const unauthenticateUser = () => {authenticated = false}
export default function SignIn() {
  const [loginStatus, setStatus] = useState(0);
  const router = useRouter()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: data.get('email'),
      password: data.get('password')
    });

    var requestOptions:any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

  fetch("https://authserver-one.vercel.app/login", requestOptions)
  .then(response => {
   if(response.status==200){
    localStorage.setItem("isAuthenticated", "true");
    router.push('/connect')
   }
   else{
    setStatus(-1)
   }
    })
  .catch(error => {console.log('error', error); setStatus(-1)});

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
          {loginStatus==-1?<p>Incorrect Data</p>:<p></p>}
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