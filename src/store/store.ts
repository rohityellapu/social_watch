"use client";
import { configureStore } from "@reduxjs/toolkit";
import socailwatchSlice from "@/slices/socailwatchSlice";
import authSlice from "@/slices/authSlice";
export const store = configureStore({
  reducer: {
    socailwatch: socailwatchSlice,
    auth: authSlice,
  },
});


