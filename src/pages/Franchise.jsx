import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { franchiseService } from "../services/franchiseService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { StatusBadge } from "../components/StatusBadge";
import { MapPin, Phone, Mail, User, ShieldCheck, ChevronRight, Store } from "lucide-react";

export function Franchise() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [franchises, setFranchises] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [list, metrics] = await Promise.all([
          franchiseService.getFranchises(),
          franchiseService.getFranchiseStats()
        ]);
        setFranchises(list);
        setStats(metrics);
      } catch (err) {
        console.error("Failed to fetch franchise database:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <Loader label="Retrieving franchise registries..." />;
  }

  return (
    <div className="space-y-6" id="franchise-page-root">
      <PageHeader
        title="Franchise Network"
        description="Verify state contracts, local active projects, and franchise managers."
      />

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="franchise-metrics-cards">
        <div className="p-5 bg-white border border-slate-100 rounded-xl flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Total Franchises</span>
            <span className="text-xl font-bold text-slate-800 block">{stats.totalFranchises}</span>
          </div>
          <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-600">
            <Store className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-100 rounded-xl flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Active Outlets</span>
            <span className="text-xl font-bold text-slate-800 block">{stats.activeLocations}</span>
          </div>
          <div className="p-2 bg-green-50/50 border border-green-100 rounded-lg text-green-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-100 rounded-xl flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Pending Approvals</span>
            <span className="text-xl font-bold text-slate-800 block">{stats.pendingLocations}</span>
          </div>
          <div className="p-2 bg-amber-50/50 border border-amber-100 rounded-lg text-amber-600">
            <Store className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-100 rounded-xl flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Combined Revenue</span>
            <span className="text-xl font-bold text-[#C9A227] block">{stats.totalRevenue}</span>
          </div>
          <div className="p-2 bg-[#C9A227]/5 border border-[#C9A227]/10 rounded-lg text-[#C9A227]">
            <Store className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="franchise-list-grid">
        {franchises.map((fran) => (
          <div
            key={fran.id}
            onClick={() => navigate(`/franchise/${fran.id}`)}
            className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3.5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider">{fran.id}</span>
                  <h3 className="font-bold text-slate-800 text-base leading-snug group-hover:text-[#C9A227] transition-colors">
                    {fran.name}
                  </h3>
                </div>
                <StatusBadge status={fran.status} />
              </div>

              {/* Physical details and contacts */}
              <div className="space-y-2.5 pt-3.5 border-t border-slate-50 text-xs text-slate-500 font-semibold">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{fran.city}, {fran.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">Contact: {fran.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{fran.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-[#C9A227] group-hover:underline">
              <span>Inspect Performance Logs</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
