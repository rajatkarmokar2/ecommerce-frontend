import {
  AppShell,
  Burger,
  Group,
  Text,
  NavLink,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/store";

const AdminLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAppSelector((state) => state.auth);

  // 🔐 Protect admin routes
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const menu = [
    { label: "Dashboard", path: "/admin" },
    { label: "Products", path: "/admin/products" },
    { label: "Orders", path: "/admin/orders" },
    { label: "Users", path: "/admin/users" },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 220,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      {/* 🔝 Header */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Text fw={700}>Admin Panel</Text>
          </Group>

          <Text size="sm">👤 {user?.name}</Text>
        </Group>
      </AppShell.Header>

      {/* 📚 Sidebar */}
      <AppShell.Navbar p="md">
        <ScrollArea h="100%">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              label={item.label}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </ScrollArea>
      </AppShell.Navbar>

      {/* 📄 Main Content */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminLayout;
