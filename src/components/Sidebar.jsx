import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  ShoppingBag,
  Package,
  MapPin,
  Image,
  FolderOpen,
  Truck,
  UserCheck,
  ExternalLink,
  Settings,
  X
} from "lucide-react";

export function Sidebar({ isOpen, onClose, onLogout }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { label: "Dashboard ", path: "/home", icon: LayoutDashboard },
    { label: "Projects", path: "/projects", icon: Briefcase },
    { label: "Clients", path: "/clients", icon: Users },
    { label: "Products Catalog", path: "/products", icon: ShoppingBag },
   { label: "Company Documents", path: "/documents", icon: FolderOpen },
     { label: "Media Gallery", path: "/gallery", icon: Image },
     { label: "Franchise Network", path: "/franchise", icon: MapPin },
  
     { label: "Stock & Inventory", path: "/stock", icon: Package },
    { label: "Settings", path: "/settings", icon: Settings }
  ];

  const isActive = (path) => {
    if (path === "/home") {
      return currentPath === "/home" || currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs lg:hidden transition-opacity"
          id="sidebar-backdrop"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col justify-between transform ${
          isOpen ? "translate-x-0" : "-translate-x-0 lg:translate-x-0"
        } lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out shrink-0`}
        id="sidebar-aside"
      >
        {/* Upper Sidebar Brand */}
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
           <Link to="/home">
  <img
    src="/images/logo.svg"
    alt="NOOH Logo"
    className="h-12 w-auto"
  />
</Link>
            
            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-gray-50 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
 
          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto" id="sidebar-nav">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => onClose()} // Close mobile drawer on link click
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-gray-100 text-[#C9A227] font-semibold"
                      : "text-slate-600 hover:bg-gray-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[#C9A227]" : "text-slate-400 group-hover:text-slate-500"}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
 
        {/* User Workspace Profile bottom panel */}
        <div className="p-4 border-t border-gray-100 bg-white shrink-0" id="sidebar-bottom">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden shrink-0">
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs font-bold text-slate-500">
                  NO
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate leading-none">
                  Admin
                </p>
                <p className="text-[10px] text-slate-500 font-medium truncate mt-1 leading-none">
                  Owner / Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
