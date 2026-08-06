import { generatedApi } from "./generatedApi";

export const enhancedApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Products", "Cart", "Orders", "User", "Auth"],
  endpoints: {
    getProducts: {
      providesTags: ["Products"],
    },
    postProducts: {
      invalidatesTags: ["Products"],
    },
    getCart: {
      providesTags: ["Cart"],
    },
    postCartItem: {
      invalidatesTags: ["Cart"],
    },
    patchCartItem: {
      invalidatesTags: ["Cart"],
    },
    deleteCartClear: {
      invalidatesTags: ["Cart"],
    },
    postAuthLogin: {
      invalidatesTags: ["Auth"],
    },
    postAuthRegister: {
      invalidatesTags: ["Auth"],
    },
    getAuthProfile: {
      providesTags: ["Auth"],
    },
  },
});

export const {
  useGetProductsQuery,
  useGetCartQuery,
  usePostCartItemMutation,
  usePatchCartItemMutation,
  useDeleteCartClearMutation,
  useGetAuthProfileQuery,
} = enhancedApi;
