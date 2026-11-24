import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./store";
import App from "./App";
import { AppThemeProvider } from "./styles/theme";
import "@fontsource/baloo-2/latin-700.css";
import "@fontsource/baloo-2/latin-800.css";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-700.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppThemeProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AppThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
