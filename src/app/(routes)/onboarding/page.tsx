'use client'
import React from 'react';
import Image from 'next/image';
import { Container,Grid,Button,Typography} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Onbaording() {
    const router = useRouter();
    return (
        <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                   
                    >
                    <Image
                        src='/abstract-business-statistics.png'
                        alt="Onboarding image"
                        width={432}
                        height={287}
                    />
                    <Grid item xs={3}>
                        <h2>Start your journey with us</h2>
                    </Grid>
                    <Typography paragraph alignItems="center">
                    By connecting your social media accounts
                    </Typography>
                    
                    <Button onClick={() => router.push('/connect')} variant="outlined">Start connecting</Button>
                </Grid>
        </div>
    )
};