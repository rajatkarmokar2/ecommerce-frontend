import {
  AppShell,
  Group,
  Text,
  Button,
  ActionIcon,
  Badge,
  Avatar,
} from "@mantine/core";
import { IconSettings, IconShoppingCart } from "@tabler/icons-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import {
  useGetAuthProfileQuery,
  useGetCartQuery,
} from "../store/api/generatedApi";
import { useEffect } from "react";
import { setUser } from "../features/auth/authSlice";
import { appPath } from "../routes/appRoutes";

const AppLayout = () => {
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
    <AppShell header={{ height: 60 }} padding="md">
      {/* 🔝 Header */}
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
            <Button variant="subtle" onClick={() => navigate("/")}>
              Home
            </Button>

            <Button variant="subtle" onClick={() => navigate("/products")}>
              Products
            </Button>

            {user ? (
              <>
                <Button variant="subtle" onClick={() => navigate("/orders")}>
                  Orders
                </Button>

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

            <ActionIcon
              variant="light"
              size="lg"
              onClick={() => navigate(appPath.settings)}
            >
              <IconSettings />
            </ActionIcon>

            {user ? (
              <Avatar>{user?.name?.charAt(0).toUpperCase()}</Avatar>
            ) : null}
          </Group>
        </Group>
      </AppShell.Header>

      {/* 📄 Main Content */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
