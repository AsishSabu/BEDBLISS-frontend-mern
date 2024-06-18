import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
interface searchingState {
  destination: string | undefined;
  dates: { startDate: Date; endDate: Date }[];
  options: {
    adult: number;
    children: number;
    room: number;
  };
}

const initialState: searchingState = {
  destination: "manali",
  dates: [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
    },
  ],
  options: {
    adult: 2,
    children: 1,
    room: 1,
  },
};


const searchingSlice = createSlice({
  name: "searchingSlice",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Partial<searchingState>>) => {
      return { ...state, ...action.payload };
    },
    clearData: () => initialState,
  },
});

export const { setData, clearData } = searchingSlice.actions;
export default searchingSlice.reducer;