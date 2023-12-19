"use client";
import React, { useEffect } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
// import ImageSharpIcon from '@mui/icons-material/ImageSharp';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
// import VideoCameraBackSharpIcon from '@mui/icons-material/VideoCameraBackSharp';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import axios from 'axios'
import { showGenerateAiOption, addSocialWatch } from "@/slices/socailwatchSlice";
import { useSelector, useDispatch } from "react-redux";
import { type } from "os";
import swal from 'sweetalert';

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
    border:none;
    box-shadow: none;
    padding-bottom: 7rem;
    };
  
    &:hover {
    }
  
    &:focus {
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
  const [previewUrl, setPreviewUrl] = React.useState<string>("")
  const [aiTextInsert, setAiTextInsert] = React.useState<boolean>(false)
  const dispatch = useDispatch();

  const socailName = useSelector((state: any) => state.socailwatch)
  const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      const render = new FileReader();
      // read file and set width and height with canvas 

      render.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          const dataurl = canvas.toDataURL(file.type);
          console.log(dataurl, "dataurl1")
          dispatch(addSocialWatch({
            url: dataurl,
            previewImageBool:false,
            // previewUrl: dataurl
          }))
          setUrl(dataurl)
        }
        img.src = e.target.result;
      }
      render.readAsDataURL(file);

    }
    if (file) {
      const render = new FileReader();
      // read file and set width and height with canvas 

      render.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          const dataurl = canvas.toDataURL(file.type);
          console.log(dataurl, "dataurl2")
          dispatch(addSocialWatch({
            // url: url,
            previewUrl: dataurl,
            previewImageBool:false,
          }))

          setPreviewUrl(dataurl)
        }
        img.src = e.target.result;
      }
      render.readAsDataURL(file);
    }


  }

  // useEffect(() => {

  // }, [url,previewUrl])
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
      const url = 'http://85.214.66.84:4380/get_caption'
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer 09d20e094fa6ca2556c81816b7a9563b93f7099f6f0f89aa6cf63b88e8m3e9`,
          "Access-Control-Allow-Origin": "*",
          }
          })
      // sweet alert message ai suggestion sucess
      // if (response?.data?.captions[0]) {
      //   swal("Your AI Suggestion has been Generated!", "success");
      // }else{
      //   swal("Your AI Suggestion has been not Generated!", "error");
      // }
      // console.log(response, "textarea &&&&&&&&&&&&44$$$$$$$$$$$")
      if (response?.data?.captions[0]) {
        // console.log("i am indcdcdscds", response.data.captions[0])
        // dispath action and set enableGenerateAiOption true in redux
        dispatch(showGenerateAiOption(true))

        dispatch(addSocialWatch({
          content: response.data.captions[0],
          URL: url,
          previewUrl: socailName.socialwatch.previewUrl,
          previewImageBool:false,
        }))

      }

    }
    catch (error) {
      console.log(error)
    }
  }

  //  if redux socailName.socialwatch.aiTypedTex is getting true then set captionType by redux socailName.socialwatch.aiTypedText and useEffect
  useEffect(() => {
    if (socailName.socialwatch.aiTypedText) {
      setAiTextInsert(true)
    }
  }, [socailName])

  // console.log(socailName, "socailName")
  // console.log(captionType, "captionType")
  // console.log(socailName.socialwatch.typedText, "socailName.socialwatch.aiTypedtext")
  console.log(socailName.socialwatch.aiTypedText, "socailName.socialwatch.aiTypedtext")
  return (
    <div>
      <Paper elevation={3} sx={{
      }}>
        {
          socailName.socialwatch.aiTypedText === true ?
            <StyledTextarea
              maxRows={4}
              aria-label="maximum height"
              placeholder="content goes here...."
              defaultValue={socailName.socialwatch.typedText}
              // defaultValue={captionType}
              name="captionType"
              onChange={(e) => setCaptionType(e.target.value)}
            /> : ""
        }
        {
          aiTextInsert === false ?
            <StyledTextarea
              maxRows={4}
              aria-label="maximum height"
              placeholder="content goes here...."
              defaultValue={captionType?.length > 0 ? captionType : ""}
              // defaultValue={captionType}
              name="captionType"
              onChange={(e) => setCaptionType(e.target.value)}
            /> : ""
        }



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
              width="200"
              height="200"
              // allowFullScreen
              // disable scroll
              scrolling="no"
            //  allowScriptAccess="always"

            />
          </div>
        </Paper>
        <br />
      </Paper>
      {/* with icon click upload file */}
      <div style={{
        float: "left",
        paddingTop: "20px",
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
          <SentimentSatisfiedAltIcon
            fontSize="small"

          />
        </label>
        <label htmlFor="contained-button-file">
          <InsertPhotoOutlinedIcon
            fontSize="small"

          />
        </label>
        {/* show img for VideoCameraBackSharpIcon  */}
        <label htmlFor="contained-button-file"

        >
          <VideocamOutlinedIcon
            // size of icon
            style={{
              // margin top
              // paddingTop: "px",
            }}
            fontSize="medium"
          />
        </label>
      </div>
      {/* button float right */}
      <div style={{
        float: "right",
        paddingTop: "20px",
      }}>
        <Button variant="outlined" color="primary"
          onClick={(e) => handleSuggestionAi(e)}
          // button size small
          size="small"
        >Suggestions by AI assist</Button>

      </div>
      <br />
      <br />

    </div>
  );
};

export default TextArea;
