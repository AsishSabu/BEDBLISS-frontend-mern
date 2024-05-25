import {combineReducers} from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import destinationSlice from "../slices/destinationSlice";


export const rootReducer=combineReducers({
    userSlice,
    destinationSlice
});

export type RootState=ReturnType<typeof rootReducer>