"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, Box, Grid, Paper, Typography, Button } from "@mui/material";

export default function Connect() {
  const router = useRouter();

  return (
    <div>
      <Grid container spacing={0} direction="column" alignItems="center">
        <h1 className="text-4xl font-bold mb-10">
          Select a network to connect a profile.
        </h1>
        <Paper className="card">
          <Image
            src="/twitter.svg"
            alt="Twitter Logo"
            width={100}
            height={100}
          />
        </Paper>
        <Typography variant="h5" sx={{ padding: 2 }} fontWeight="medium">
          Connection Successful
        </Typography>
        <Typography variant="body1" sx={{ padding: 2 }}>
          Username
        </Typography>
        <div className="flex flex-row">
          <Button variant="outlined" sx={{ marginRight: 2 }}>
            Connect another account
          </Button>
          <Button variant="contained" onClick={() => router.push("/scheduler")}>
            Start posting
          </Button>
        </div>
      </Grid>
    </div>
  );
}
