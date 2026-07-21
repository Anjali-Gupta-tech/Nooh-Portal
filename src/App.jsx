import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { DashboardLayout } from "./layouts/DashboardLayout";

// Import all Pages
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { DashboardHome } from "./pages/DashboardHome";
import { Projects } from "./pages/Projects";
import { ProjectDetails } from "./pages/ProjectDetails";

import { Products } from "./pages/Products";
import { ProductDetails } from "./pages/ProductDetails";
import { Stock } from "./pages/Stock";


import { Gallery } from "./pages/Gallery";
import { Documents } from "./pages/Documents";
import { PDFPreview } from "./pages/PDFPreview";


import { Settings } from "./pages/Settings";

// Simple Router Guard
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("nooh_auth") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Secure Internal Dashboard Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Index redirects to home */}
            <Route index element={<Navigate to="/home" replace />} />
            
            {/* Dashboard Home */}
            <Route path="home" element={<DashboardHome />} />

            {/* Projects */}
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetails />} />

            {/* Clients */}
         

            {/* Products */}
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetails />} />

            {/* Stock */}
            <Route path="stock" element={<Stock />} />

            {/* Franchise */}
            
           

            {/* Gallery */}
            <Route path="gallery" element={<Gallery />} />

            {/* Documents */}
            <Route path="documents" element={<Documents />} />
            <Route path="documents/preview/:id" element={<PDFPreview />} />

            {/* Vendors */}
            

            {/* Employees */}
         

            {/* Settings */}
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Wildcard Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}
