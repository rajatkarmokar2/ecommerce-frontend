import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ApiType = "express" | "nest";

interface ConfigState {
  api: ApiType;
}

const initialState: ConfigState = {
  api: (localStorage.getItem("api") as ApiType) || "express",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setApi: (state, action: PayloadAction<ApiType>) => {
      state.api = action.payload;
      localStorage.setItem("api", action.payload);
    },
  },
});

export const { setApi } = configSlice.actions;
export default configSlice.reducer;
