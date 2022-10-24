import { configureStore } from "@reduxjs/toolkit";
import { projectListSlice } from "./project.list.slice";
import { authSlice } from "./auth.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
