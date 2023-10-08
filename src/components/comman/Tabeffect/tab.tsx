"use client"
import * as React from 'react';
import {Typography,Paper,Tabs,Tab,Box} from '@mui/material';
// import axios from 'axios';
import TextArea from '@/components/comman/TextArea/textarea'
import { useDispatch } from 'react-redux';
import {addSocailChennal} from '@/slices/socailwatchSlice'
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        textTransform: "none",
      }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface BasicTabsProps {
    setSocial_channel:() => void;
    setCaptionType:() => void;
    captionType:string;
}

export default function BasicTabs({setSocial_channel,
setCaptionType,
captionType
}: BasicTabsProps) {
    const [value, setValue] = React.useState<number>(0);
   const dispatch = useDispatch()
    const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
        // console.log(newValue,"newValue")
        if(newValue === 0){
           
            setSocial_channel("Twitter ")
            dispatch(addSocailChennal("Twitter"))
        }else if(newValue === 1){
            setSocial_channel("Linkedin")
            dispatch(addSocailChennal("Linkedin"))
        }
      setValue(newValue);
    };

   
    return (
      <Paper elevation={3}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
            style={{
              textTransform: "none",
            }}
            >
              <Tab label="Twitter" {...a11yProps(0)} 
              // transform:none
              style={{
                textTransform: "none",
              }}
              />
              <Tab label="Linkedin" {...a11yProps(1)} 
              style={{
                textTransform: "none",
              }}/>
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <TextArea
            setCaptionType={setCaptionType}
            captionType={captionType}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <TextArea  
            setCaptionType={setCaptionType}
            captionType={captionType}
            />
          </CustomTabPanel>
        </Box>
      </Paper>
    );
  }