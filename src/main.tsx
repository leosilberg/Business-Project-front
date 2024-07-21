import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.tsx";
import { SnackBarCtxProvider } from "./Context/SnackBarContext.tsx";
import { ThemeProvider } from "./Components/ui/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SnackBarCtxProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SnackBarCtxProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
