import { createRoot } from "react-dom/client";
import '@mantine/core/styles.css';
import "./index.css";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { MantineProvider } from "@mantine/core";

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MantineProvider>
      <HashRouter basename={routerBasename}>
        <App />
      </HashRouter>
    </MantineProvider>
  </Provider>,
);
