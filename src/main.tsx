import { createRoot } from "react-dom/client";
import '@mantine/core/styles.css';
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MantineProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </Provider>,
);
