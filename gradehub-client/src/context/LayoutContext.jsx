import { createContext, useContext, useEffect, useState } from "react";

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const openSidebar = () => setSidebarOpen(true);

  const closeSidebar = () => setSidebarOpen(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <LayoutContext.Provider
      value={{
        sidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }

  return context;
}
