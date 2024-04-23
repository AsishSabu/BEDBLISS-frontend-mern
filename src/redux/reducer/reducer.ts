import {combineReducers} from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";


export const rootReducer=combineReducers({
    userSlice
});

export type RootState=ReturnType<typeof rootReducer>