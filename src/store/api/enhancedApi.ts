import { generatedApi } from "./generatedApi";

export const enhancedApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Products", "Cart", "Orders", "User", "Auth"],
  endpoints: {},
});

export const { getProducts } = enhancedApi.endpoints;
