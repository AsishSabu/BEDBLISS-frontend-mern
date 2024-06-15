import { combineReducers } from "@reduxjs/toolkit"
import userSlice from "../slices/userSlice"
import destinationSlice from "../slices/destinationSlice"
import searchingSlice from "../slices/searchingSlice"
import bookingSlice from "../slices/bookingSlice"

export const rootReducer = combineReducers({
  userSlice,
  destinationSlice,
  searchingSlice,
  bookingSlice
})

export type RootState = ReturnType<typeof rootReducer>
