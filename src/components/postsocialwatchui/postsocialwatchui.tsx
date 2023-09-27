import React, { useState, useEffect } from 'react';
import { Paper, Typography, Divider, Button } from '@mui/material';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import axios from 'axios';
const PostSocialWatchUi = () => {

    const [date, setDate] = useState<Dayjs | null>(dayjs('2023-04-17'));
    const [time, setTime] = useState<Dayjs | null>(dayjs('2023-04-17T15:30'));
    const socailwatch = useSelector((state: any) => state.socailwatch)
    // console.log(socailwatch, "socailwatch POst #£££££££££")
    // console.log(date, "date")
    // console.log(time, "time")
    const handleSchedule = () => {
        let payload

        let timevalue = time?.get('hour') + ":" + time?.get('minute')
        let datevalue = date?.toISOString().substr(0, 10)
        // console.log(timevalue, "timevalue")
        if (socailwatch.socialChennal === 'Twitter') {
            payload = {
                tweet: socailwatch.socialwatch.content,
                time: new Date(`${datevalue} ${timevalue}`).getTime(),
                date: `${datevalue} ${timevalue}`,
            }
            axios.post("https://authserver-one.vercel.app/tweet", payload).then((res) => {
                console.log(res, "res")
            }).catch((err) => {
                console.log(err, "err")
            })

        } else if (socailwatch.socialChennal === 'Facebook') {
            payload = {
                post: socailwatch.socialwatch.content,
                time: new Date(`${datevalue} ${timevalue}`).getTime(),
                date: `${datevalue} ${timevalue}`,

            }
            axios.post("https://authserver-one.vercel.app/facebook", payload).then((res) => {
                console.log(res, "res")
            }).catch((err) => {
                console.log(err, "err")
            })
        }

        // console.log(payload, "payload")

    }




    return (
        <>
            <Paper elevation={3} sx={{
                display: "flex",
                flexDirection: "row",
                p: 1, margin: 'auto', maxWidth: "98%", flexGrow: 1,
            }}
            >
                <Typography variant="h6" component="h6" 
                    sx={{
                        // fontWeight: "bold",
                        fontFamily: "Nunito Sans",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingTop: "5px",
                    }}
                >
                    When to post
                </Typography>
                <Paper elevation={3} sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "5px",
                    paddingLeft: "10px",
                    height: '2.5rem',
                    width: '40%',

                }}>
                    <Typography variant="h6" component="h6" 
                        sx={{
                            // fontWeight: "bold",
                            fontFamily: "Nunito Sans",
                            float: "right",
                        }}
                    >
                        Specific days and times
                    </Typography>

                    <Typography variant="h6" component="h6" gutterBottom>
                        <ArrowDropDownSharpIcon
                            // size
                            fontSize="large"
                        />
                    </Typography>

                </Paper>

            </Paper>
            <Paper elevation={3} sx={{
                p: 1, margin: 'auto', maxWidth: "98%", flexGrow: 1,
                // margin buttom: 10px;
                mb: 1,
                // disable border top and box shadow top none
                borderTop: "none",
                boxShadow: "none",
                border: "1px solid #ccc",

            }}>
                {/* <Divider /> */}
                <br />
                <div style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                label="Date"
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <div style={{
                        borderLeft: "1px solid #ccc",
                        height: "100%",
                        margin: "auto",
                        marginLeft: "10px",
                        marginRight: "10px",
                    }}></div>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                            <TimePicker
                                label="time"
                                value={time}
                                onChange={(newValue) => setTime(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <Typography variant="h6" component="h6" gutterBottom
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        paddingTop: "10px",
                        color: "#437EEB",
                    }}
                >
                    <AddIcon
                        // size
                        fontSize="large"
                    /> Add more schedules times
                </Typography>
            </Paper>


            {/* button right side */}

            <div style={{
                float: "right",
                paddingTop: "5px",
            }}>
                <Button
                    variant="contained"
                    // remove capitalization
                    // button size small
                    onClick={handleSchedule}
                    size="small"

                    style={{
                        backgroundColor: "#437EEB",
                        color: "#fff",
                        border: "none",
                        // padding: "10px",
                        fontFamily: "Nunito Sans",
                        // fontWeight: "bold",
                        outline: "none",
                        // remove capitalization
                        textTransform: "none",
                        marginRight: "10px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                    }}
                >Send</Button>
            </div>
        </>
    );
};

export default PostSocialWatchUi;