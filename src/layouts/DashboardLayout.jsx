import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { motion } from "motion/react";

export function DashboardLayout({ children, breadcrumbItems = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Authenticity check: Verify if mock user logged in
  useEffect(() => {
    const isAuth = localStorage.getItem("nooh_auth");
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("nooh_auth");
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden text-slate-800 font-sans" id="dashboard-layout-root">
      {/* Sidebar component */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar component */}
        <Topbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          breadcrumbItems={breadcrumbItems}
          onLogout={handleLogout}
        />

        {/* Scrollable Sub-Page Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8" id="dashboard-main-content">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.18 }}
            className="max-w-7xl mx-auto h-full"
          >
            {children || <Outlet />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
