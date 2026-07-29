import Products from "../admin/pages/Products";

const baseUrl = "/admin";

export const adminPaths = {
  products: baseUrl + "/products",
};

const adminRoutes = [
  {
    path: adminPaths.products,
    element: <Products />,
  },
];

export default adminRoutes;
