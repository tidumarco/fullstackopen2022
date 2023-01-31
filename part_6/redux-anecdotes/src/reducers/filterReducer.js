import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
