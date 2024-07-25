import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HotelInterface } from "../../types/hotelInterface"

interface DestinationState {
  loading: boolean
  destinations: string[] | null
  destination: string | null
  featured: HotelInterface[] | null
  search: HotelInterface[]
  length:number|null
  error: string | null
}

const initialState: DestinationState = {
  loading: false,
  destinations: null,
  destination: null,
  featured: null,
  search: [],
  length:0,
  error: null,
}

const destinationSlice = createSlice({
  name: "destinationSlice",
  initialState,
  reducers: {
    setSearchResult: (state, action: PayloadAction<HotelInterface[]>) => {
      state.search = action.payload
    },
    removeSearchResult: (state) => {
      state.search = []
    },
    setLength: (state, action: PayloadAction<number>) => {
      state.length= action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { removeSearchResult, setSearchResult,setLength, setLoading, setError } = destinationSlice.actions
export default destinationSlice.reducer
