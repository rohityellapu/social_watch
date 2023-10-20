"use client";
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Paper, Tabs, Tab, Box } from '@mui/material';
import TextArea from '@/components/comman/TextArea/textarea';
import { useSelector } from 'react-redux/';
// img next
import Image from 'next/image'
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


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface PreviewWatchProps {
    previewData: string;
}

const PreviewWatch = ({ previewData }: PreviewWatchProps) => {
    const [value, setValue] = React.useState(0);
    const socialData = useSelector((state: any) => state.socailwatch)
    // console.log(socialData, "socialData")
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    console.log(socialData, "socialData?.URL")
    // console.log(socialData.socialwatch.URL, "socialData?.URL")
    useEffect(() => {
        // console.log(socialData.socialwatch.URL, "socialData?.URL")
    }
        , [socialData.socialwatch.previewUrl])
    return (
        // <Item>
        <Paper elevation={3}>
            <Box sx={{ width: '100%' }} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Twitter " style={{
                            textTransform: "none",
                        }} {...a11yProps(0)} />
                        <Tab label="Linkedin" style={{
                            textTransform: "none",
                        }}  {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    {
                        socialData.socialwatch.content

                    }
                    <Paper elevation={0}>
                        <iframe src={socialData.socialwatch.previewUrl}
                            width="400"
                            height="400"
                            scrolling='no'
                            style={{
                                backgroundColor: "grey"
                            }}></iframe>
                    </Paper>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    {
                        socialData.socialwatch.content
                    }
                    <Paper elevation={0}>
                        {/* img from public folder */}
                        <iframe src={socialData.socialwatch.URL} style={{
                            backgroundColor: "grey",
                            // width: "100%",

                        }}
                            width="400"
                            allowFullScreen
                            // fullscreen
                            // full width 
                            // height="400"
                            height="400"
                            scrolling='no'
                        ></iframe>

                    </Paper>
                </CustomTabPanel>
            </Box>
        </Paper>

        // </Item>
    );
};

export default PreviewWatch;