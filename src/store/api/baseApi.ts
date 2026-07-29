import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) return "http://localhost:4000/api/v1";
  return envUrl.endsWith("/api") || envUrl.includes("/api/")
    ? envUrl
    : `${envUrl}/api`;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Products", "Cart", "Orders", "User", "Auth"],
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
});
