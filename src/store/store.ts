"use client";
import { configureStore } from "@reduxjs/toolkit";
import socailwatchSlice from "@/slices/socailwatchSlice";
export const store = configureStore({
  reducer: {
    socailwatch: socailwatchSlice,
  },
});


