"use client"
import React from 'react';
import { Typography, Paper } from '@mui/material';
// import useSelector from 'react-redux';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import BasicTabs from '@/components/comman/Tabeffect/tab';
import SuggestionAi from "@/components/comman/suggestionAi/suggestionai"
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import PostSocialWatchUi from '@/components/postsocialwatchui/postsocialwatchui'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const tabsJson = [
    {
        label: "Linkedin",
        index: 0,
        component: ""
    },
    {

        label: "Twitter",
        index: 1,
        component: ""
    }
]

interface SocialWatchProps {
    aiTextJson: any;
    setSocial_channel: () => void;
    setCaptionType: () => void;
    captionType: string;
    setPreviewData: () => void;
}
const SocialWatch = ({ aiTextJson, setSocial_channel, setCaptionType,
    captionType,
    setPreviewData
}: SocialWatchProps) => {
    const showAiGenerator = useSelector((state: any) => state.socailwatch)
    // console.log(showAiGenerator, "showAiGenerator")
    return (
        <>
            <br />
            <Paper elevation={3} sx={{
                p: 1, margin: 'auto', maxWidth: "100%", flexGrow: 1,
                // margin buttom: 10px;
                mb: 1,
            }}>
                <Typography variant="h6" component="h6" gutterBottom
                    sx={{
                        // fontWeight: "bold",
                        fontFamily: "Nunito Sans",
                    }}
                >
                    Select social media account
                </Typography>
                {/* move right content */}
                <div style={{
                    float: "right",
                    position: "relative",
                    top: "-2.2rem",
                }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        <ArrowDropDownSharpIcon
                            // size
                            fontSize="large"
                        />
                    </Typography>
                </div>
            </Paper>
            {/* <br/> */}

            {/* <Item> */}

                <BasicTabs setSocial_channel={setSocial_channel}
                    setCaptionType={setCaptionType}
                    captionType={captionType}
                />

              
                <br />
                {
                    showAiGenerator?.enableGenerateAiOption === true ?
                        <SuggestionAi aiTextJson={aiTextJson}
                            setPreviewData={setPreviewData}
                        /> : ""
                }
                <br />
                <PostSocialWatchUi/>
                <br/>
                <br/>
                <br/>
               
            {/* </Item> */}
        </>
    );
};

export default SocialWatch;