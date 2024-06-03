import {combineReducers} from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import destinationSlice from "../slices/destinationSlice";
import bookingslice from "../slices/bookingslice";


export const rootReducer=combineReducers({
    userSlice,
    destinationSlice,
    bookingslice
});

export type RootState=ReturnType<typeof rootReducer>