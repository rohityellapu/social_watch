import React, { useEffect } from 'react';
import { Typography, Paper, Tabs, Tab, Box, Grid, Autocomplete, TextField, Button, Divider, CircularProgress } from '@mui/material';
import axios from 'axios';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { useSelector, useDispatch } from 'react-redux';
import { addSocialWatch } from '@/slices/socailwatchSlice'
import swal from 'sweetalert';
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
const tone = [
    {
        label: "Personal"
    },
    {
        label: "Professional"
    },
    {
        label: "Witty"
    },
    {
        label: "Casual"
    },
    {
        label: "Empathetic"
    }
]

const word_size = [
    {
        label: "Small"
    },
    {
        label: "Medium"
    },
    {
        label: "Long"
    }
]
interface SuggestionAiProps {
    aiTextJson: any;
    setPreviewData: () => void;
}
const SuggestionAi = ({ aiTextJson,
    setPreviewData
}: SuggestionAiProps) => {
    const [value, setValue] = React.useState(0);
    const [aiText, setAiText] = React.useState()
    const [toneValue, setToneValue] = React.useState<string>("")
    const [wordSize, setWordSize] = React.useState<string>("")
    const [progress, setProgress] = React.useState<boolean>(false)
    const dispatch = useDispatch()
    // console.log(toneValue, "toneValue")
    // console.log(wordSize, "wordSize")
    const content = useSelector((state: any) => state.socailwatch)
    // console.log(content, "content")
    const handleInsert = () => {
        dispatch(addSocialWatch({
            content: aiText,
            typedText: aiText,
            URL: content?.socialwatch.URL,
            aiTypedText:true
        }))
    }

    console.log(content, "content?.socialwatch.content")
    // console.log(content?.socialwatch.content, "content?.socialwatch.content")
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleSuggestion = async (e: any, params: any) => {
        setProgress(true)
        try {
            // console.log(params, "params")
            const payload = {
                client_id: "A01016",
                social_channel: params.social_channel,
                reference_text: params.reference_text,
                tone: toneValue,
                no_hashtags: params.no_hashtags,
                word_size: wordSize,
                top_posts: params.top_posts,
                top_competitor_posts: params.top_competitor_posts,
                top_hashtags: params.top_hashtags
            }
            e.preventDefault()
            // console.log(payload, "e   **&^%%^")
            const response = await axios.post('http://85.214.66.84:4040/get_caption', payload)
            if(response.data.captions[0]){
                // sweet alert
                swal({
                    title: "success!",
                    text: "Ai suggestion text generated successfully",
                    icon: "success",
                });

            }else{
                swal({
                    title: "error!",
                    text: "Ai suggestion text not generated",
                    icon: "error",
                });
            }
            // console.log(response)
            setAiText(response.data.captions[0])
            setPreviewData(response.data.captions[0])
            dispatch(addSocialWatch({
                content: response.data.captions[0],
                URL: content?.socialwatch.URL
            }))
            if (response.data.captions[0]) {
                setProgress(false)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setAiText(content?.socialwatch.content)
    }
        , [aiText])
    // console.log(content?.socialwatch.content, 'siggestiooojn7889876')
    return (
        <>
            {/* <Paper elevation={3} sx={{
                p: 1, margin: 'auto', maxWidth: "100%", flexGrow: 1,
                // margin buttom: 10px;
                mb: 1,
            }}> */}

            {/* </Paper> */}
            <Paper elevation={3}>
                <Typography variant="h6" component="h6" gutterBottom
                    sx={{
                        // fontWeight: "bold",
                        fontFamily: "Nunito Sans",
                        display: "flex",
                        justifyContent: "flex-start",
                        padding: "10px"
                    }}
                >
                    Generate captions with AI

                </Typography>
                {/* move right content */}
                <div style={{
                    float: "right",
                    position: "relative",
                    top: "-3rem",
                    right: "1rem"
                }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        <ArrowDropDownSharpIcon
                            // size
                            fontSize="large"
                        />
                    </Typography>
                </div>
                <Divider />
                <Box sx={{ width: '100%' }} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Text" {...a11yProps(0)}
                            style={{
                                textTransform: "none",
                            }}
                            />
                            <Tab label="Image"
                             style={{
                                textTransform: "none",
                            }}
                            {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Grid container spacing={2}>
                            <Grid xs={6}>
                                <textarea style={{
                                    width: "90%",
                                    height: "2.5rem",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    resize: "vertical",
                                    outline: "none",
                                    fontFamily: "Nunito Sans",
                                    fontSize: "1rem"
                                }}
                                    // name="captionType"
                                    // defaultValue={aiTextJson?.reference_text?.length > 0 ? aiTextJson?.reference_text : ""}
                                    // onChange={
                                    //     (e: any) => {
                                    //         setAiText(e.target.value)
                                    //     }
                                    // }
                                    placeholder='What this post is about ?'
                                />
                            </Grid>
                            <Grid xs={3}
                            style={{
                                paddingLeft: "30px"

                            }}
                            >
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    // size small
                                    size='small'
                                    options={tone}
                                    sx={{ width: 150 }}
                                    onChange={(e: any) => setToneValue(e.target.textContent)}
                                    renderInput={(params) => <TextField {...params} label="Tone" />}
                                />
                            </Grid>
                            <Grid xs={3}
                            
                            style={{
                                paddingLeft: "35px"
                            }}
                            >
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={word_size}
                                    sx={{ width: 150 }}
                                    size='small'
                                    onChange={(e: any) => setWordSize(e.target.textContent)}
                                    renderInput={(params) => <TextField {...params} label="Word size" />}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <p style={{
                            width: "100%",
                            height: "auto"
                        }}>
                            {/* if progress is true then show circularbar */}
                            {
                                content?.socialwatch.content
                            }
                        </p>
                        <br />
                        <Divider sx={{
                            marginBottom: "10px"
                        }} />

                        <div style={{
                            float: "left",
                        }}
                        >
                            1/10
                        </div>
                        <div style={{
                            float: "right",
                        }}>
                            <Button variant="text" color="primary" 
                            size='small'
                            style={{
                                textTransform: "none",
                            }}
                            onClick={(e) => handleSuggestion(e, aiTextJson)}>
                                Regenerate
                            </Button>

                            <Button variant="outlined" color="primary" sx={{
                                marginLeft: "10px"
                            }}
                            style={{
                                textTransform: "none",
                            }}
                            size='small'
                            onClick={handleInsert}
                            >Insert</Button>
                        </div>
                        <br />
                    </CustomTabPanel>

                </Box>
            </Paper>
        </>
    );
};

export default SuggestionAi;