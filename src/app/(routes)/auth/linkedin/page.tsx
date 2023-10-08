'use client'
import { NextPageContext } from 'next'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Card,Box,Grid,Paper,Typography,Button} from '@mui/material';
// import { TwitterApi } from 'twitter-api-v2';
import React, { useState,useEffect } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import axios from 'axios';
import Auth from '@/components/Button/Auth';
export default function TwitterAuth() {
  const router = useRouter();
  const [TweetAuth, setAuth] = useState(0);
  const [Username, setUser] = useState('Username');
  useEffect(() => {
    fetch('https://authserver-one.vercel.app/auth')
    .then(async (rawdata)=>{
      const data=await rawdata.json()
            { setAuth(data[0].Linkedin.Authenticated)
              setUser("Authenticated User")}
  })
    .catch((error)=> console.log(error))
  });
  var AuthorNot=-1
  var AuthUrl=''
  var oauth_consumer_key=process.env.REACT_APP_TWITTER_CONSUMER_KEY;
  var oauth_consumer_secret=process.env.REACT_APP_TWITTER_CONSUMER_SECRET;
  var CALLBACK_URL='https://authserver-one.vercel.app/twitter'
  const twitterLoginq = async () =>{
    fetch('https://authserver-one.vercel.app/auth')
    .then(async (rawdata)=>{
      const data=await rawdata.json()
            {console.log(data[0].Linkedin.Authenticated)
              AuthorNot=data[0].Linkedin.Authenticated}
  })
    .catch((error)=> console.log(error))
  }
  const twitterLogin = async () => {
    const authWindow = window.open(
      'https://authserver-one.vercel.app/auth/linkedin',
      '_blank',
      'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600,left=100,top=100'
    )

    if (!authWindow) {
      console.error(
        'Your browser is blocking popups. Allow popups log in with Twitter.'
      )
      return
    }

    // const res = await fetch(`https://authserver-one.vercel.app/twitter1`)
    // const data = await res.json()
    // console.log(data)
    // const authURL = data.url
    authWindow.location.href = `https://authserver-one.vercel.app/auth/linkedin`

    // listen for "window.opener.postMessage" sent from backend via <script>
    // window.addEventListener('message', (event) => {
    //   if (event?.data?.username) {
    //     const username = event?.data?.username
    //     console.log('Success')
    //   }
    // })
  }
  twitterLoginq();
    // const funalert=alert("✔️ This works on every component!");
  return (
    <>
    {TweetAuth==-1?
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
   
    >
    <h1 className='text-4xl font-bold mb-10'>Select a network to connect a profile.</h1>
    <Paper>
    <Image src="/linkedin.svg" alt="Twitter Logo" width={100} height={100} />
    </Paper>
    <Typography variant='h5' sx={{paddingTop:2}} fontWeight="medium" >Authorize Flable on Twitter</Typography>
    <Typography variant='body1' sx={{marginTop:2}}>We need permission to access and publish content to Twitter on your behalf.</Typography>
    <Typography  variant='body2' sx={{marginTop:1,marginBottom:4}}>Add your Twitter profile to monitor activity and send tweets.</Typography>
    {/* <Button onClick={()=>twitterLogin} variant='outlined'>
    Go To Twitter
    </Button> */}
    {TweetAuth?<button onClick={twitterLogin}>Redirect</button>:<button onClick={twitterLogin}>Authenticate</button>}
    </Grid>
    :TweetAuth==1?
    <div>
        <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                   
                    >
      <h1 className='text-4xl font-bold mb-10'>You can Start Posting</h1>
      <Paper className='card'>
        <Image src="/linkedin.svg" alt="Twitter Logo" width={100} height={100} />
      </Paper>
      <Typography variant='h5' sx={{padding:2}} fontWeight="medium">Connection Successful</Typography>
      <Typography variant='body1'sx={{padding:2}} >{Username}</Typography>
      <div className='flex flex-row'>
      {/* <Button variant='outlined' sx={{marginRight:2}}>
        Connect another account
     </Button> */}
     <Button variant='contained' onClick={() => router.push('/scheduler')} >
        Start posting
     </Button>
      </div>  
      </Grid>
    </div>
    :
<div>
        <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                   
                    >
      <h1 className='text-4xl font-bold mb-10'>Failed Authentication</h1>
      <Paper className='card'>
        <Image src="/linkedin.svg" alt="Twitter Logo" width={100} height={100} />
      </Paper>
      <Typography variant='h5' sx={{padding:2}} fontWeight="medium">Connection Unsuccessful</Typography>
     
      <div className='flex flex-row'>
      <Button variant='outlined' sx={{marginRight:2}}>
        Restart The Auth
     </Button>
    
      </div>  
      </Grid>
    </div>
    }
          
     
    </>
    
  );
}

