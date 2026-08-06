import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

const rawBaseQuery = fetchBaseQuery({
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const dynamicBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;

  const apiType = state.config.api;

  const baseUrl =
    apiType === "nest"
      ? import.meta.env.VITE_NEST_API
      : import.meta.env.VITE_EXPRESS_API;

  const adjustedArgs =
    typeof args === "string"
      ? { url: baseUrl + args }
      : { ...args, url: baseUrl + args.url };

  return rawBaseQuery(adjustedArgs, api, extraOptions);
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["Products", "Cart", "Orders", "User", "Auth"],
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
});
