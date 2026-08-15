import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";
import { LayoutProvider } from "./context/LayoutContext";
import { AcademicProvider } from "./context/AcademicContext";
import { ToastProvider } from "./context/ToastContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LayoutProvider>
      <BrowserRouter>
        <AuthProvider>
          <AcademicProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </AcademicProvider>
        </AuthProvider>
      </BrowserRouter>
    </LayoutProvider>
  </React.StrictMode>,
);
