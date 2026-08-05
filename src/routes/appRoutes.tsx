import { lazy } from "react";
import Settings from "../pages/Settings";
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Orders = lazy(() => import("../pages/Orders"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Products = lazy(() => import("../pages/Products"));
const Register = lazy(() => import("../pages/Register"));

export const appPath = {
  home: "/",
  products: "/products",
  productDetails: "/products/:id",
  cart: "/cart",
  order: "/orders",
  login: "/login",
  register: "/register",
  checkout: "/checkout",
  settings: "/settings",
};

const appRoutes = [
  {
    path: appPath.home,
    element: <Home />,
  },
  {
    path: appPath.products,
    element: <Products />,
  },
  {
    path: appPath.productDetails,
    element: <ProductDetails />,
  },
  {
    path: appPath.cart,
    element: <Cart />,
  },
  {
    path: appPath.order,
    element: <Orders />,
  },
  {
    path: appPath.login,
    element: <Login />,
  },
  {
    path: appPath.register,
    element: <Register />,
  },
  {
    path: appPath.checkout,
    element: <Checkout />,
  },
  {
    path: appPath.settings,
    element: <Settings />,
  },
];

export default appRoutes;
