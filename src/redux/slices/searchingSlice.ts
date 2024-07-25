import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addDays } from "date-fns"


interface SearchOptions {
  adult: number
  children: number
  room: number
}

interface Budget {
  min: number
  max: number
}

interface SearchingState {
  destination: string | undefined
  dates: { startDate: any; endDate: any }[];
  options: SearchOptions
  stayTypes: string[]
  budget: Budget
  amenities: string[]
  page:number
}

const initialState: SearchingState = {
  destination: "kochi",
  dates: [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
    },
  ],
  options: {
    adult: 1,
    children: 1,
    room: 1,
  },
  stayTypes: [],
  budget: {
    min: 0,
    max: 0,
  },
  amenities: [],
  page:1
}

const searchingSlice = createSlice({
  name: "searchingSlice",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Partial<SearchingState>>) => {
      return { ...state, ...action.payload }
    },
    clearData: () => initialState,
  },
})

export const { setData, clearData } = searchingSlice.actions
export default searchingSlice.reducer