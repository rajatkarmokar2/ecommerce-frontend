import { baseApi as api } from "./baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAuthProfile: build.query<
      GetAuthProfileApiResponse,
      GetAuthProfileApiArg
    >({
      query: () => ({ url: `/auth/profile` }),
    }),
    postAuthLogin: build.mutation<
      PostAuthLoginApiResponse,
      PostAuthLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postAuthRegister: build.mutation<
      PostAuthRegisterApiResponse,
      PostAuthRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/register`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
      query: () => ({ url: `/users` }),
    }),
    putUsersById: build.mutation<PutUsersByIdApiResponse, PutUsersByIdApiArg>({
      query: (queryArg) => ({
        url: `/users/${queryArg.id}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteUsersById: build.mutation<
      DeleteUsersByIdApiResponse,
      DeleteUsersByIdApiArg
    >({
      query: (queryArg) => ({ url: `/users/${queryArg.id}`, method: "DELETE" }),
    }),
    getProducts: build.query<GetProductsApiResponse, GetProductsApiArg>({
      query: (queryArg) => ({
        url: `/products`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          search: queryArg.search,
        },
      }),
    }),
    postProducts: build.mutation<PostProductsApiResponse, PostProductsApiArg>({
      query: (queryArg) => ({
        url: `/products`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getProductsById: build.query<
      GetProductsByIdApiResponse,
      GetProductsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/products/${queryArg.id}` }),
    }),
    patchProductsById: build.mutation<
      PatchProductsByIdApiResponse,
      PatchProductsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/products/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    deleteProductsById: build.mutation<
      DeleteProductsByIdApiResponse,
      DeleteProductsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/products/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getCart: build.query<GetCartApiResponse, GetCartApiArg>({
      query: () => ({ url: `/cart` }),
    }),
    postCartItem: build.mutation<PostCartItemApiResponse, PostCartItemApiArg>({
      query: (queryArg) => ({
        url: `/cart/item`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    patchCartItem: build.mutation<
      PatchCartItemApiResponse,
      PatchCartItemApiArg
    >({
      query: (queryArg) => ({
        url: `/cart/item`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    deleteCartClear: build.mutation<
      DeleteCartClearApiResponse,
      DeleteCartClearApiArg
    >({
      query: () => ({ url: `/cart/clear`, method: "DELETE" }),
    }),
    getOrders: build.query<GetOrdersApiResponse, GetOrdersApiArg>({
      query: () => ({ url: `/orders` }),
    }),
    postOrders: build.mutation<PostOrdersApiResponse, PostOrdersApiArg>({
      query: (queryArg) => ({
        url: `/orders`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getOrdersById: build.query<GetOrdersByIdApiResponse, GetOrdersByIdApiArg>({
      query: (queryArg) => ({ url: `/orders/${queryArg.id}` }),
    }),
    putOrdersById: build.mutation<
      PutOrdersByIdApiResponse,
      PutOrdersByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/orders/${queryArg.id}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteOrdersById: build.mutation<
      DeleteOrdersByIdApiResponse,
      DeleteOrdersByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/orders/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postPaymentCheckout: build.mutation<
      PostPaymentCheckoutApiResponse,
      PostPaymentCheckoutApiArg
    >({
      query: (queryArg) => ({
        url: `/payment/checkout`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postPaymentCheck: build.mutation<
      PostPaymentCheckApiResponse,
      PostPaymentCheckApiArg
    >({
      query: (queryArg) => ({
        url: `/payment/check`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postPaymentApprove: build.mutation<
      PostPaymentApproveApiResponse,
      PostPaymentApproveApiArg
    >({
      query: (queryArg) => ({
        url: `/payment/approve`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getInvoice: build.query<GetInvoiceApiResponse, GetInvoiceApiArg>({
      query: () => ({ url: `/invoice` }),
    }),
    postInvoice: build.mutation<PostInvoiceApiResponse, PostInvoiceApiArg>({
      query: (queryArg) => ({
        url: `/invoice`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getInvoiceById: build.query<
      GetInvoiceByIdApiResponse,
      GetInvoiceByIdApiArg
    >({
      query: (queryArg) => ({ url: `/invoice/${queryArg.id}` }),
    }),
    getByFile: build.query<GetByFileApiResponse, GetByFileApiArg>({
      query: (queryArg) => ({ url: `/${queryArg.file}` }),
    }),
    postUpload: build.mutation<PostUploadApiResponse, PostUploadApiArg>({
      query: (queryArg) => ({
        url: `/upload`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generatedApi };
export type GetAuthProfileApiResponse =
  /** status 200 Successful response */ any;
export type GetAuthProfileApiArg = void;
export type PostAuthLoginApiResponse =
  /** status 200 Successful response */ any;
export type PostAuthLoginApiArg = {
  body: object;
};
export type PostAuthRegisterApiResponse =
  /** status 200 Successful response */ any;
export type PostAuthRegisterApiArg = {
  body: object;
};
export type GetUsersApiResponse = /** status 200 Successful response */ any;
export type GetUsersApiArg = void;
export type PutUsersByIdApiResponse =
  /** status 200 Successful response */ any;
export type PutUsersByIdApiArg = {
  /** The id parameter */
  id: string;
  body: object;
};
export type DeleteUsersByIdApiResponse =
  /** status 200 Successful response */ any;
export type DeleteUsersByIdApiArg = {
  /** The id parameter */
  id: string;
};
export type GetProductsApiResponse = /** status 200 Successful response */ any;
export type GetProductsApiArg = {
  page?: number;
  limit?: number;
  search?: string;
};
export type PostProductsApiResponse =
  /** status 200 Successful response */ any;
export type PostProductsApiArg = {
  body: object;
};
export type GetProductsByIdApiResponse =
  /** status 200 Successful response */ any;
export type GetProductsByIdApiArg = {
  /** The id parameter */
  id: string;
};
export type PatchProductsByIdApiResponse =
  /** status 200 Successful response */ any;
export type PatchProductsByIdApiArg = {
  /** The id parameter */
  id: string;
  body: {
    /** File to upload */
    file: any;
  };
};
export type DeleteProductsByIdApiResponse =
  /** status 200 Successful response */ any;
export type DeleteProductsByIdApiArg = {
  /** The id parameter */
  id: string;
};
export type GetCartApiResponse = /** status 200 Successful response */ any;
export type GetCartApiArg = void;
export type PostCartItemApiResponse =
  /** status 200 Successful response */ any;
export type PostCartItemApiArg = {
  body: object;
};
export type PatchCartItemApiResponse =
  /** status 200 Successful response */ any;
export type PatchCartItemApiArg = {
  body: object;
};
export type DeleteCartClearApiResponse =
  /** status 200 Successful response */ any;
export type DeleteCartClearApiArg = void;
export type GetOrdersApiResponse = /** status 200 Successful response */ any;
export type GetOrdersApiArg = void;
export type PostOrdersApiResponse = /** status 200 Successful response */ any;
export type PostOrdersApiArg = {
  body: object;
};
export type GetOrdersByIdApiResponse =
  /** status 200 Successful response */ any;
export type GetOrdersByIdApiArg = {
  /** The id parameter */
  id: string;
};
export type PutOrdersByIdApiResponse =
  /** status 200 Successful response */ any;
export type PutOrdersByIdApiArg = {
  /** The id parameter */
  id: string;
  body: {
    /** File to upload */
    file: any;
  };
};
export type DeleteOrdersByIdApiResponse =
  /** status 200 Successful response */ any;
export type DeleteOrdersByIdApiArg = {
  /** The id parameter */
  id: string;
};
export type PostPaymentCheckoutApiResponse =
  /** status 200 Successful response */ any;
export type PostPaymentCheckoutApiArg = {
  body: object;
};
export type PostPaymentCheckApiResponse =
  /** status 200 Successful response */ any;
export type PostPaymentCheckApiArg = {
  body: object;
};
export type PostPaymentApproveApiResponse =
  /** status 200 Successful response */ any;
export type PostPaymentApproveApiArg = {
  body: object;
};
export type GetInvoiceApiResponse = /** status 200 Successful response */ any;
export type GetInvoiceApiArg = void;
export type PostInvoiceApiResponse = /** status 200 Successful response */ any;
export type PostInvoiceApiArg = {
  body: {
    /** File to upload */
    file: any;
  };
};
export type GetInvoiceByIdApiResponse =
  /** status 200 Successful response */ any;
export type GetInvoiceByIdApiArg = {
  /** The id parameter */
  id: string;
};
export type GetByFileApiResponse = /** status 200 Successful response */ any;
export type GetByFileApiArg = {
  /** The file parameter */
  file: string;
};
export type PostUploadApiResponse = /** status 200 Successful response */ any;
export type PostUploadApiArg = {
  body: {
    /** File to upload */
    file: any;
  };
};
export const {
  useGetAuthProfileQuery,
  usePostAuthLoginMutation,
  usePostAuthRegisterMutation,
  useGetUsersQuery,
  usePutUsersByIdMutation,
  useDeleteUsersByIdMutation,
  useGetProductsQuery,
  usePostProductsMutation,
  useGetProductsByIdQuery,
  usePatchProductsByIdMutation,
  useDeleteProductsByIdMutation,
  useGetCartQuery,
  usePostCartItemMutation,
  usePatchCartItemMutation,
  useDeleteCartClearMutation,
  useGetOrdersQuery,
  usePostOrdersMutation,
  useGetOrdersByIdQuery,
  usePutOrdersByIdMutation,
  useDeleteOrdersByIdMutation,
  usePostPaymentCheckoutMutation,
  usePostPaymentCheckMutation,
  usePostPaymentApproveMutation,
  useGetInvoiceQuery,
  usePostInvoiceMutation,
  useGetInvoiceByIdQuery,
  useGetByFileQuery,
  usePostUploadMutation,
} = injectedRtkApi;
