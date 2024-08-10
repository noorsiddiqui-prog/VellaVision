import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  // userId: "63701cc1f03239b7f700000e",
  userId: "63701cc1f03239b7f700000e",
  searchValue: "",
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setMode, setSearchValue } = globalSlice.actions;

export default globalSlice.reducer;
