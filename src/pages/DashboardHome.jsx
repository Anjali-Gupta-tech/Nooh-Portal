import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { StatsCard } from "../components/StatsCard";
import { DashboardCard } from "../components/DashboardCard";
import { Loader } from "../components/Loader";
import { projectService } from "../services/projectService";
import { clientService } from "../services/clientService";
import { productService } from "../services/productService";
import { employeeService } from "../services/employeeService";
import { vendorService } from "../services/vendorService";
import { franchiseService } from "../services/franchiseService";
import { stockService } from "../services/stockService";

import {
  Briefcase,
  Users,
  ShoppingBag,
  Package,
  MapPin,
  Image,
  FolderOpen,
  Truck,
  UserCheck,
  Settings,
  Sparkles,
  Link as LinkIcon
} from "lucide-react";

export function DashboardHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalClients: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    totalEmployees: 0,
    totalVendors: 0,
    totalFranchises: 0
  });

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const [
          projects,
          clients,
          products,
          employees,
          vendors,
          franchises,
          stock
        ] = await Promise.all([
          projectService.getProjects(),
          clientService.getClients(),
          productService.getProducts(),
          employeeService.getEmployees(),
          vendorService.getVendors(),
          franchiseService.getFranchises(),
          stockService.getStock()
        ]);

        const activeCount = projects.filter((p) => p.category === "Ongoing").length;
        const completedCount = projects.filter((p) => p.category === "Completed").length;
        const lowStockCount = stock.filter((s) => s.status === "Low Stock").length;

        setStats({
          totalProjects: projects.length,
          activeProjects: activeCount,
          completedProjects: completedCount,
          totalClients: clients.length,
          totalProducts: products.length,
          lowStockProducts: lowStockCount,
          totalEmployees: employees.length,
          totalVendors: vendors.length,
          totalFranchises: franchises.length
        });
      } catch (err) {
        console.error("Error calculating dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return <Loader label="Compiling office metrics..." />;
  }

  const kpis = [
    { title: "Total Projects", value: stats.totalProjects, icon: Briefcase, to: "/projects" },
    { title: "Active Projects", value: stats.activeProjects, icon: Sparkles, to: "/projects", badge: { label: "Live Execution", type: "success" } },
    { title: "Completed Projects", value: stats.completedProjects, icon: Briefcase, to: "/projects" },
    { title: "Total Clients", value: stats.totalClients, icon: Users, to: "/clients" },
    { title: "Total Products", value: stats.totalProducts, icon: ShoppingBag, to: "/products" },
    { title: "Low Stock Products", value: stats.lowStockProducts, icon: Package, to: "/stock", badge: stats.lowStockProducts > 0 ? { label: "Reorder", type: "danger" } : null },
    { title: "Total Employees", value: stats.totalEmployees, icon: UserCheck, to: "/employees" },
    { title: "Total Vendors", value: stats.totalVendors, icon: Truck, to: "/vendors" },
    { title: "Total Franchises", value: stats.totalFranchises, icon: MapPin, to: "/franchise" }
  ];

  const modules = [
    {
      title: "Projects Dossier",
      description: "Oversee site status, before/after images, project managers, and logs for active/upcoming interior renovations.",
      icon: Briefcase,
      to: "/projects",
      color: "border-l-[#C9A227]"
    },
    {
      title: "Client Roster",
      description: "Manage client profile cards, assigned design plans, phone contacts, email accounts, and customized requests.",
      icon: Users,
      to: "/clients",
      color: "border-l-indigo-500"
    },
    {
      title: "Materials Catalogue",
      description: "Browse stretch ceilings, charcoal claddings, magnetic tracks, and landscape turf with direct PDF spec download access.",
      icon: ShoppingBag,
      to: "/products",
      color: "border-l-emerald-500"
    },
    {
      title: "Stock & Storage",
      description: "Check material inventory volumes, warehouse zones, supply sources, and adjust stock quantities seamlessly.",
      icon: Package,
      to: "/stock",
      color: "border-l-rose-500"
    },
    {
      title: "Franchise Locations",
      description: "Track performance metrics, contact personnel, and local design timelines for regional franchise partners.",
      icon: MapPin,
      to: "/franchise",
      color: "border-l-amber-500"
    },
    {
      title: "Media Archive",
      description: "View comprehensive images of ongoing progress, before states, finalized spaces, and site walk-through clips.",
      icon: Image,
      to: "/gallery",
      color: "border-l-sky-500"
    },
    {
      title: "Office Library",
      description: "Access official firm registrations, corporate PAN documents, employee NDA models, and materials certifications.",
      icon: FolderOpen,
      to: "/documents",
      color: "border-l-purple-500"
    },
    {
      title: "Sourcing & Vendors",
      description: "Check address catalogs, product lists supplied, and delivery logs for verified manufacturing vendors.",
      icon: Truck,
      to: "/vendors",
      color: "border-l-teal-500"
    },
    {
      title: "Staff Directory",
      description: "View department listings, design skills, contact emails, and onboarding dates for firm employees.",
      icon: UserCheck,
      to: "/employees",
      color: "border-l-blue-500"
    }
  ];

  return (
    <div className="space-y-8" id="dashboard-home-root">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Internal Portal Headquarters
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-slate-700">Nandini Oberoi</span>. Here is the operational status for today.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#C9A227]/5 border border-[#C9A227]/10 px-3 py-1.5 rounded-xl text-xs font-bold text-[#C9A227]">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>FY 2026 Operational Period</span>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="dashboard-kpis">
        {kpis.map((kpi, idx) => (
          <StatsCard
            key={idx}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            badge={kpi.badge}
            onClick={() => navigate(kpi.to)}
          />
        ))}
      </div>

      {/* Clickable Modules Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <h2 className="text-base font-bold text-slate-800">
            Office Modules
          </h2>
          <span className="text-xs text-slate-400 font-medium">(Click to access and edit records)</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="dashboard-modules-grid">
          {modules.map((mod, idx) => (
            <DashboardCard
              key={idx}
              title={mod.title}
              description={mod.description}
              icon={mod.icon}
              to={mod.to}
              color={mod.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
