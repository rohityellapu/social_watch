import * as React from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
export default function Auth(){
    return <Button onClick={() => 'http://localhost:3000/auth/facebook'} variant='outlined'>
        Go To Twitter
    </Button>;
}