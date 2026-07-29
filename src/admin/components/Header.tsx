import { useAppSelector } from "../../store/store";

const AdminHeader = () => {
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    // dispatch(logout());
  };

  return (
    <header
      style={{
        height: "60px",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <h3>Admin Panel</h3>

      <div>
        <span style={{ marginRight: "15px" }}>👤 {user?.name || "Admin"}</span>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default AdminHeader;
