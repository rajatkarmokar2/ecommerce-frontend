import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearUser } from "../features/auth/authSlice";
import { notifications } from "@mantine/notifications";
import { useGetCartQuery } from "../store/api/generatedApi";
import { Button } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const reduxCartItems = useAppSelector((state) => state.cart?.items || []);
  const user = useAppSelector((state) => state.auth?.user);

  const { data: cartData } = useGetCartQuery(undefined, {
    skip: !user && !localStorage.getItem("token"),
  });

  const apiCartItems =
    cartData?.cart?.items || cartData?.data?.items || cartData?.items;
  const cartCount = apiCartItems ? apiCartItems.length : reduxCartItems.length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    notifications.show({
      title: "Logged Out",
      message: "You have been logged out successfully.",
      color: "blue",
    });
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          🛍️ Shop
        </button>

        {/* 🔹 Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/admin">Admin</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </button>

          <Button>
            <IconSettings />
          </Button>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-black text-white px-3 py-1 rounded cursor-pointer hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/login")}
                className="text-sm bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="text-sm border border-black px-4 py-2 rounded cursor-pointer hover:bg-gray-100"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
