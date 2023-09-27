"use client";
import React, { useEffect } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
import ImageSharpIcon from '@mui/icons-material/ImageSharp';
import VideoCameraBackSharpIcon from '@mui/icons-material/VideoCameraBackSharp';
import axios from 'axios'
import { showGenerateAiOption, addSocialWatch } from "@/slices/socailwatchSlice";
import { useSelector, useDispatch } from "react-redux";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};



const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 12px 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border:none;
    box-shadow: none;
    padding-bottom: 7rem;
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? blue[500] : blue[200]
    };
    }
  
    // firefox
    &:focus-visible {
      // outline: 0;
    }
  `
);


interface TextAreaProps {
  setCaptionType: () => void;
  captionType: string;
}
const TextArea = ({
  setCaptionType,
  captionType
}: TextAreaProps) => {
  // console.log(captionType, "captionType textArea")
  const [url, setUrl] = React.useState<string>("")
  const dispatch = useDispatch();
  const socailName = useSelector((state: any) => state.socailwatch)
  const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    // create url for image and video
    const file = event.target.files[0];
    // url shoud auto adjust in iframe
    const url = URL.createObjectURL(file);
    // console.log(url, "url")
    dispatch(addSocialWatch({
      URL: url
    }))
    setUrl(url)
  }
  useEffect(() => {

  }, [url])
  const handleSuggestionAi = async (e: any, params: any) => {
    // setProgress(true)
    try {
      // console.log(params,"params")
      const payload = {
        client_id: "A01016",
        social_channel: socailName.socialChennal,
        reference_text: captionType,
        tone: "",
        no_hashtags: "",
        word_size: "",
        top_posts: "",
        top_competitor_posts: "",
        top_hashtags: ""
      }
      // console.log(payload, "payload")
      e.preventDefault()
      // console.log(payload, "e   **&^%%^")
      // ts define url type
      const url =  process.env.NEXT_PUBLIC_AI_GENERATE_URL
      const response = await axios.post(url, payload)
      // console.log(response, "textarea &&&&&&&&&&&&44$$$$$$$$$$$")
      if (response.data.captions[0]) {
        // console.log("i am indcdcdscds", response.data.captions[0])
        // dispath action and set enableGenerateAiOption true in redux
        dispatch(showGenerateAiOption(true))

        dispatch(addSocialWatch({
          content: response.data.captions[0],
          URL: url
        }))

      }

    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Paper elevation={3} sx={{
      }}>

        <StyledTextarea
          maxRows={4}
          aria-label="maximum height"
          placeholder="content goes here...."
          defaultValue={captionType?.length > 0 ? captionType : ""}
          name="captionType"
          onChange={(e) => setCaptionType(e.target.value)}
        />

        {/* input type accept only image and video */}
        {/* <label for="avatar">upload img and video</label> */}
        <Paper elevation={3} sx={{
          margin: "10px",
        }}>
          <div style={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "flex-start",
            padding: "10px",

          }}>
            <iframe src={url}
              style={{
                backgroundColor: "grey",
              }}
              // autoPlay off
              // autoPlay={false}
              width={url?.length > 0 ? "30%" : "30%"}
              height={url?.length > 0 ? "auto" : "auto"}
              allowFullScreen
            //  allowScriptAccess="always"

            />
          </div>
        </Paper>
        <br />
      </Paper>
      {/* with icon click upload file */}
      <div style={{
        float: "left",
        padding: "10px",
      }}>
        <input
          accept="image/*,video/*"
          id="contained-button-file"
          // multiple
          type="file"
          onChange={handleChangeUrl}
          // show icon with input
          style={{ display: "none" }}
        />
        {/* icon={<ImageSharpIcon />} */}
        {/* show img for ImageSharpIcon  */}
        <label htmlFor="contained-button-file">
          <ImageSharpIcon />
        </label>
        {/* show img for VideoCameraBackSharpIcon  */}
        <label htmlFor="contained-button-file">
          <VideoCameraBackSharpIcon />
        </label>
      </div>
      {/* button float right */}
      <div style={{
        float: "right",
        paddingTop: "10px",
      }}>
        <Button variant="outlined" color="primary"
          onClick={(e) => handleSuggestionAi(e)}
          // button size small
          size="small"
        >Suggestions by AI assist</Button>

      </div>
      <br />

    </div>
  );
};

export default TextArea;
