import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HotelInterface } from "../../types/hotelInterface"

interface DestinationState {
  loading: boolean
  destinations: string[] | null
  destination: string | null
  featured: HotelInterface[] | null
  search: HotelInterface[]
  error: string | null
}

const initialState: DestinationState = {
  loading: false,
  destinations: null,
  destination: null,
  featured: null,
  search: [],
  error: null,
}

const destinationSlice = createSlice({
  name: "destinationSlice",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<HotelInterface[]>) => {
      state.search = action.payload
    },
    removeSearchValue: (state) => {
      state.search = []
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { removeSearchValue, setSearchValue, setLoading, setError } = destinationSlice.actions
export default destinationSlice.reducer
