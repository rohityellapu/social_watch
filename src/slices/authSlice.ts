"use client";
import { createSlice } from "@reduxjs/toolkit";


interface AuthState {
    isLogin: boolean;
    twitter: boolean;
    facebook: boolean;
    instagram: boolean;
    linkedin: boolean;
    youtube: boolean;

}

const initialState: AuthState = {
    isLogin: false,
    twitter: false,
    facebook: false,
    instagram: false,
    linkedin: false,
    youtube: false,
};



export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // add socialwatch
        addTwitter: (state, action) => {
            state.twitter = action.payload;
        },
        addFacebook: (state, action) => {
            state.facebook = action.payload;
        },
        addInstagram: (state, action) => {
            state.instagram = action.payload;
        },
        addLinkedin: (state, action) => {
            state.linkedin = action.payload;
        },
        addYoutube: (state, action) => {
            state.youtube = action.payload;
        },
        addLogin: (state, action) => {
            state.isLogin = action.payload;
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

export const {
    addTwitter,
    addFacebook, 
    addInstagram,
    addLinkedin,
    addYoutube,
    addLogin,
} = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: any) => state.auth;

