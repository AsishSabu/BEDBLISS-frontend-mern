import { combineReducers } from "@reduxjs/toolkit"
import userSlice from "../slices/userSlice"
import destinationSlice from "../slices/destinationSlice"
import searchingSlice from "../slices/searchingSlice"
import bookingSlice from "../slices/bookingslice"

export const rootReducer = combineReducers({
  userSlice,
  destinationSlice,
  bookingSlice,
  searchingSlice,
})

export type RootState = ReturnType<typeof rootReducer>
