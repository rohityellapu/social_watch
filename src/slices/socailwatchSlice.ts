"use client"
import { createSlice } from "@reduxjs/toolkit";


// all code typescript

interface SocialWatchState {
    // socialwatch is array of objects
    socialwatch: any[];
    lodding: boolean;
    enableGenerateAiOption: boolean;
    socialChennal : string;
}

const initialState: SocialWatchState = {
    socialwatch: [{
        content: "",
        typedText: "",
        URL: "",
        tone: "",
        size: "",
    }],
    lodding: false,
    enableGenerateAiOption: false,
    socialChennal : "Twitter"
};


export const socialwatchSlice = createSlice({
    name: "socialwatch",
    initialState,
    reducers: {
        // add socialwatch
        addSocialWatch: (state, action) => {
            state.socialwatch = action.payload;
        },
        // add socialwatch
        addSocialWatchLoading: (state, action) => {
            state.lodding = action.payload;
        },
        showGenerateAiOption: (state, action) => {
            // console.log("action.payload showGeneratetor",action.payload)
            state.enableGenerateAiOption = action.payload;
        },
        addSocailChennal: (state, action) => {
            // console.log("action.payload addSocailChennal",action.payload)
            state.socialChennal = action.payload;
        },
    },
    extraReducers: {
        // [HYDRATE]: (state, action) => {
        //     return {
        //         ...state,
        //         ...action.payload,
        //     };
        // },
    },
});

export const { addSocialWatch, addSocialWatchLoading,showGenerateAiOption,addSocailChennal } = socialwatchSlice.actions;

export const selectSocialWatch = (state: any) => state.socialwatch

export default socialwatchSlice.reducer;

