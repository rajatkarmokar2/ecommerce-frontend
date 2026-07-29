import { Link, useLocation } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/admin" },
  { name: "Products", path: "/admin/products" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Users", path: "/admin/users" },
];

const AdminSidebar = () => {
  const { pathname } = useLocation();


  return (
    <aside
      style={{
        width: "200px",
        background: "#222",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {menu.map((item) => (
        <div key={item.path} style={{ marginBottom: "10px" }}>
          <Link
            to={item.path}
            style={{
              color: pathname === item.path ? "yellow" : "#fff",
              textDecoration: "none",
            }}
          >
            {item.name}
          </Link>
        </div>
      ))}
    </aside>
  );
};

export default AdminSidebar;
