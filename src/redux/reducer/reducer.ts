import { combineReducers } from "@reduxjs/toolkit"
import userSlice from "../slices/userSlice"
import destinationSlice from "../slices/destinationSlice"
import searchingSlice from "../slices/searchingSlice"
import bookingSlice from "../slices/bookingslice"
import chatSlice from "../slices/chatSlice"
import locationSlice from "../slices/locationSlice"

export const rootReducer = combineReducers({
  userSlice,
  destinationSlice,
  bookingSlice,
  searchingSlice,
  locationSlice,
  chatSlice,
  
})

export type RootState = ReturnType<typeof rootReducer>
