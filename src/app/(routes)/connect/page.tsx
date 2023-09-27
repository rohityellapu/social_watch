'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card,Box,Grid,CardMedia, Button, Typography} from '@mui/material';
export default function Connect() {
  const router = useRouter();
  return (
    <>
        <Grid
                    container
                    direction="column"
                    alignItems="center"
                    
                    >
      <Typography variant='h4' fontWeight="bold" sx={{padding:2}} >Select a network to connect a profile</Typography>
      </Grid>
      <Grid 
       container direction="row" justifyContent="space-around" 
       sx={{mx:'auto'}}>
    
        <Card  sx={{ padding: 2, textAlign: 'center',}} >
        <CardMedia
                component="img"
                alt="Instagram Image"
                height="140"
                image="/instagram.svg"
                title="Instagram Social"
                sx={{ padding: 2 }}
              />
          <Typography sx={{  mx: 'auto',
          textAlign: 'center',
          
           }} variant="h6" component="p">Instagram</Typography>
          <Button sx={{  marginTop:1
           }} variant='contained'>Connect</Button>
        </Card>
        
        <Card sx={{ padding: 2, textAlign: 'center'}} >
        <CardMedia
                component="img"
                alt="Instagram Image"
                height="135"
                image="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                title="Instagram Social"
                sx={{ padding: 2 }}
              />
          <Typography sx={{  mx: 'auto',
          textAlign: 'center',
          
           }} variant="h6" component="p">Facebook</Typography>
          <Button sx={{  marginTop:1
           }} variant='contained'>Connect</Button>
        </Card>
        <Card  sx={{ padding: 2, textAlign: 'center',}} >
        <CardMedia
                component="img"
                alt="Instagram Image"
                height="135"
                image="/twitter.svg"
                title="Instagram Social"
                sx={{ padding: 2 }}
              />
          <Typography sx={{  mx: 'auto',
          textAlign: 'center',
          
           }} variant="h6" component="p">Twitter</Typography>
          <Button sx={{  marginTop:1
           }} variant='contained' onClick={() => router.push('/auth/twitter')}>Connect</Button>
        </Card>
        <Card  sx={{ padding: 2, textAlign: 'center',}} >
        <CardMedia
                component="img"
                alt="Instagram Image"
                height="135"
                image="/youtube.svg"
                title="Instagram Social"
                sx={{ padding: 2 }}
              />
          <Typography sx={{  mx: 'auto',
          textAlign: 'center',
          
           }} variant="h6" component="p">Youtube</Typography>
          <Button sx={{  marginTop:1
           }} variant='contained' onClick={() => router.push('/auth/twitter')}>Connect</Button>
        </Card>
      </Grid>
      
    </>
  );
}
