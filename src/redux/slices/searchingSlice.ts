import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface searchingState {
  destination: string | undefined;
  dates: { startDate: Date; endDate: Date;}[];
  options: {
    adult: number | undefined;
    children: number | undefined;
    room: number | undefined; // Changed to number
  };
}

const initialState: searchingState = {
  destination: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined, // Changed to number
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