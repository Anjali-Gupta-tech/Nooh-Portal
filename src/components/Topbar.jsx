import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Bell, Search, LogOut, Settings, User, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";

export function Topbar({ onMenuToggle, breadcrumbItems = [], onLogout }) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Hardcoded recent office logs for notifications
  const notificationItems = [
    {
      id: 1,
      title: "Low Stock Alert",
      desc: "3D Charcoal Wall Panel is down to 18 pieces.",
      time: "10m ago",
      type: "warning",
      link: "/stock"
    },
    {
      id: 2,
      title: "New Site Note Added",
      desc: "Amit Verma uploaded the ceiling gloss check report.",
      time: "2h ago",
      type: "info",
      link: "/projects/proj-101"
    },
    {
      id: 3,
      title: "Franchise Update",
      desc: "Chandigarh branch documentation is under review.",
      time: "1d ago",
      type: "success",
      link: "/franchise"
    }
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0 sticky top-0 z-30" id="topbar-root">
      
      {/* Left Area: Burger Menu & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-1.5 hover:bg-gray-50 text-slate-500 hover:text-slate-700 rounded-lg lg:hidden"
          id="burger-btn"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Dynamic Breadcrumbs displayed in topbar if items are passed */}
        <div className="hidden md:block pt-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Middle Area: Global Search Box (UI Only) */}
      <div className="hidden sm:block flex-1 max-w-xs md:max-w-md mx-6 relative">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Global search (projects, clients, product codes)..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-9 pr-4 text-xs font-medium placeholder-slate-400 focus:bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none transition-all"
            id="global-search-input"
          />
        </div>

        {/* Real-time search UI mockup results */}
        {searchFocused && (
          <div className="absolute top-11 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50 text-xs">
            {searchVal.trim() ? (
              <div className="space-y-1">
                <p className="px-2.5 py-1.5 font-bold text-slate-400 uppercase tracking-widest text-[9px]">
                  Matching records
                </p>
                <div
                  onClick={() => navigate(`/projects`)}
                  className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-700">"{searchVal}" in Projects</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </div>
                <div
                  onClick={() => navigate(`/products`)}
                  className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-700">"{searchVal}" in Catalog Products</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </div>
              </div>
            ) : (
              <div className="p-3 text-center text-slate-400">
                Type to query stretch ceilings, client dossiers, or stock lists...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Area: Actions, Notification, User Profile */}
      <div className="flex items-center gap-3.5">
        
        {/* Notification Icon & Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 bg-gray-50 border border-gray-200/60 hover:bg-gray-100/80 text-slate-500 hover:text-slate-800 rounded-full transition-all relative"
            id="notif-bell"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2.5 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 overflow-hidden" id="notif-dropdown">
              <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-xs">Office Stream</h4>
                <span className="text-[10px] text-green-600 font-semibold px-1.5 py-0.5 bg-green-50 rounded">3 unread</span>
              </div>
              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {notificationItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setNotificationsOpen(false);
                      navigate(item.link);
                    }}
                    className="p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3"
                  >
                    <div className="mt-0.5 shrink-0">
                      {item.type === "warning" ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                        {item.desc}
                      </p>
                      <span className="text-[9px] text-slate-400 block mt-1">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-gray-100 text-center bg-gray-50/50">
                <Link
                  to="/home"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[11px] font-bold text-[#C9A227] hover:underline"
                >
                  Dismiss all alerts
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Action Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-all cursor-pointer"
            id="profile-dropdown-btn"
          >
            <div className="w-7 h-7 rounded-lg bg-[#C9A227] text-white flex items-center justify-center font-bold text-xs">
              NO
            </div>
            <span className="hidden sm:inline text-xs font-bold text-slate-700">
              Nandini
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2.5 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-50 overflow-hidden" id="profile-dropdown">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-xs font-bold text-slate-900">Nandini Oberoi</p>
                <p className="text-[10px] text-slate-500 truncate">nandini@noohliving.com</p>
              </div>
              
              <Link
                to="/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-gray-50 hover:text-slate-900"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Office Settings</span>
              </Link>
              
              <button
                onClick={() => {
                  setProfileOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50/50 hover:text-rose-700 text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out Portal</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
