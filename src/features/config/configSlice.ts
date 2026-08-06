import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ConfigState {
  api: string;
}

const initialState: ConfigState = {
  api:
    (localStorage.getItem("api") as string) ||
    import.meta.env.VITE_EXPRESS_API ||
    import.meta.env.VITE_NEST_API ||
    "http://localhost:4000/api",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setApi: (state, action: PayloadAction<string>) => {
      state.api = action.payload;
      localStorage.setItem("api", action.payload);
    },
  },
});

export const { setApi } = configSlice.actions;
export default configSlice.reducer;
