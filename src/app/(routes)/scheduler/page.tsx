"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Grid, Box, Paper } from '@mui/material'
import SocialWatch from '@/components/socailwatch/socialwatch'
import PreviewWatch from '@/components/previewwatch/previewwatch'


export default function Scheduler(): JSX.Element {
    const [social_channel, setSocial_channel] = useState<string>("Twitter");
    const [captionType, setCaptionType] = useState<string>("");
    const [previewData, setPreviewData] = useState<string>("");
    const [aiTextJson, setAiTextJson] = useState<{}>({
      client_id: "",
      social_channel: "",
      reference_text: "",
      tone: "",
      no_hashtags: "",
      word_size: "",
      top_posts: "",
      top_competitor_posts: "",
      top_hashtags: ""
    });
  
  useEffect(() => {
    // update aiTextJson with social_channel
    setAiTextJson({...aiTextJson, social_channel: social_channel,
      reference_text: captionType,})
  }
  , [social_channel,captionType])
  
    return (
      // header 
      <>
      <div className="sidenav">
        
      </div>
      <div className='main'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={7}>
              <SocialWatch aiTextJson={aiTextJson}  setSocial_channel={setSocial_channel} captionType={captionType} setCaptionType={setCaptionType}  setPreviewData={setPreviewData}  />
            </Grid>
            <Grid item xs={5} 
            style={{
                marginTop: "1.5rem",
            }}
            >
              <PreviewWatch  previewData={previewData} />
            </Grid>
          </Grid>
        </Box>
      </div>
      </>
    )
  
  }
  