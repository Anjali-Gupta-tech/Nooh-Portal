import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { DashboardLayout } from "./layouts/DashboardLayout";

// Import all Pages
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
import { Franchise } from "./pages/Franchise";
import ContactCards from "./pages/Contact";
import Welcome from "./pages/auth/Welcome";
import StaffLogin from "./pages/auth/StaffLogin";
import FranchiseLogin from "./pages/auth/FranchiseLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import ChatGPT from "./pages/ChatGPT";
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
  {/* Default Route */}
  <Route path="/" element={<Navigate to="/login" replace />} />

  {/* Public Routes */}
  <Route path="/login" element={<Welcome />} />
  <Route path="/login/staff" element={<StaffLogin />} />
  <Route path="/login/franchise" element={<FranchiseLogin />} />
  <Route path="/login/administration" element={<AdminLogin />} />

  {/* Protected Dashboard */}
  <Route
    path="/app"
    element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    {/* Dashboard Home */}
    <Route path="home" element={<DashboardHome />} />

    {/* Projects */}
    <Route path="projects" element={<Projects />} />
    <Route path="projects/:id" element={<ProjectDetails />} />

    {/* Products */}
    <Route path="products" element={<Products />} />
    <Route path="products/:id" element={<ProductDetails />} />

    {/* Stock */}
    <Route path="stock" element={<Stock />} />

    {/* Franchise */}
    <Route path="franchise" element={<Franchise />} />

    {/* Gallery */}
    <Route path="gallery" element={<Gallery />} />

    {/* Documents */}
    <Route path="documents" element={<Documents />} />
    <Route path="documents/preview/:id" element={<PDFPreview />} />

    {/* Contact */}
    <Route path="contact" element={<ContactCards />} />
      {/* Chatgpt */}
      <Route path="chatgpt" element={<ChatGPT/>} />
      

    {/* Settings */}
    <Route path="settings" element={<Settings />} />
  </Route>

  {/* Fallback */}
  <Route path="*" element={<Navigate to="/login" replace />} />
</Routes>  
      </Router>
    </ToastProvider>
  );
}
