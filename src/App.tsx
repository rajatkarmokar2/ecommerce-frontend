import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import appRoutes from "./routes/appRoutes";
import adminRoutes from "./routes/adminRoutes";
import AdminLayout from "./admin/components/Layout";
import AppLayout from "./components/AppLayout";
import { Suspense } from "react";
import { LoadingOverlay } from "@mantine/core";

function App() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <Routes>
        <Route element={<AppLayout />}>
          {appRoutes?.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={item.element}
            ></Route>
          ))}
        </Route>
        <Route element={<AdminLayout />}>
          {adminRoutes?.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={item.element}
            ></Route>
          ))}
          <Route path="/admin" element={<Navigate to="/admin/products" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
