import {
  AppShell,
  Group,
  Text,
  Button,
  ActionIcon,
  Badge,
  Avatar,
  Menu,
} from "@mantine/core";
import {
  IconLogout,
  IconSettings,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import {
  useGetAuthProfileQuery,
  useGetCartQuery,
} from "../store/api/enhancedApi";
import { useEffect } from "react";
import { setUser } from "../features/auth/authSlice";
import { appPath } from "../routes/appRoutes";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const profileQUery = useGetAuthProfileQuery();

  const user = profileQUery?.data?.data;

  useEffect(() => {
    if (profileQUery.isLoading) return;
    if (user) {
      dispatch(
        setUser({
          _id: user?.id,
          email: user?.email,
          name: user?.name,
          role: user?.role,
        }),
      );
    } else {
      navigate("/login");
    }
  }, [user, profileQUery.isLoading]);

  const cartQUery = useGetCartQuery();

  const cartCount = cartQUery.data?.cart?.items?.length;

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        {/* 🏷️ Logo */}
        <Text
          fw={700}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          MyShop
        </Text>

        {/* 🧭 Navigation */}
        <Group>
          <NavLink to="/" className="[.active]:underline hover:underline">
            Home
          </NavLink>

          <NavLink to="/products" className="[.active]:underline hover:underline">
            Products
          </NavLink>

          {user ? (
            <>
              <NavLink className="[.active]:underline hover:underline" to="/orders">
                Orders
              </NavLink>

              {/* 🛒 Cart */}
              <div className="relative">
                <ActionIcon
                  variant="light"
                  size="lg"
                  onClick={() => navigate("/cart")}
                >
                  <IconShoppingCart size={20} />
                </ActionIcon>
                {cartCount > 0 && (
                  <Badge
                    size="xs"
                    color="red"
                    style={{
                      position: "absolute",
                      top: -5,
                      right: -5,
                    }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </div>
            </>
          ) : (
            <Button variant="subtle" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}

          {/* {user ? <Avatar>{user?.name?.charAt(0).toUpperCase()}</Avatar> : null} */}

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Avatar>
                {user?.name?.charAt(0).toUpperCase() ?? <IconUser />}
              </Avatar>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconSettings size={14} />}
                onClick={() => navigate(appPath.settings)}
              >
                Settings
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item color="red" leftSection={<IconLogout size={14} />}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default Header;
