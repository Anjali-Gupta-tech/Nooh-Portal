import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { franchiseService } from "../services/franchiseService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { Breadcrumb } from "../components/Breadcrumb";
import { StatusBadge } from "../components/StatusBadge";
import { useToast } from "../context/ToastContext";
import { ArrowLeft, MapPin, Phone, Mail, User, Calendar, DollarSign, Briefcase, Users } from "lucide-react";

export function FranchiseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [franchise, setFranchise] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await franchiseService.getFranchiseById(id);
        setFranchise(data);
      } catch (err) {
        addToast("Franchise record not found", "error");
        navigate("/franchise");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, navigate]);

  if (loading) {
    return <Loader label="Securing franchise performance..." />;
  }

  const breadcrumbs = [
    { label: "Franchise Network", path: "/franchise" },
    { label: franchise.name }
  ];

  return (
    <div className="space-y-6" id="franchise-details-root">
      {/* Navigation */}
      <div className="flex flex-col gap-2 shrink-0">
        <Link
          to="/franchise"
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors width-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Franchise List</span>
        </Link>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Metrics and Overview */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-50 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold font-mono uppercase">Reference: {franchise.id}</span>
                <h1 className="text-xl font-bold tracking-tight text-slate-800">
                  {franchise.name}
                </h1>
              </div>
              <StatusBadge status={franchise.status} />
            </div>

            {/* Performance KPIs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-lg space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Est. Revenue</span>
                <p className="text-base font-black text-[#C9A227]">{franchise.monthlyRevenue}</p>
              </div>

              <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-lg space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Projects</span>
                <p className="text-base font-bold text-slate-700">{franchise.activeProjects} Live</p>
              </div>

              <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-lg space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Allocated Staff</span>
                <p className="text-base font-bold text-slate-700">{franchise.staffCount} Members</p>
              </div>
            </div>

            {/* Office description mock */}
            <div className="space-y-2 pt-4 border-t border-slate-50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Operating Profile
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                The {franchise.name} outlet manages luxury residential accounts and boutique corporate spacing designs across the regional area. It matches local material requests, coordinates local contractors, and conducts site audits following the master firm's principles.
              </p>
            </div>
          </div>

          {/* Quick timeline tracking */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Audit Milestones
            </h3>
            
            <div className="space-y-4 text-xs font-semibold">
              <div className="flex gap-3">
                <div className="p-1 bg-green-100 text-green-700 rounded h-fit text-[9px] uppercase font-bold tracking-wide">COMPLETED</div>
                <div className="space-y-0.5">
                  <p className="text-slate-800">Operational Onboarding Complete</p>
                  <p className="text-[11px] text-slate-400 font-medium">Agreement executed and showroom launched on {franchise.established}.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-1 bg-[#C9A227]/10 text-[#C9A227] rounded h-fit text-[9px] uppercase font-bold tracking-wide">IN PROGRESS</div>
                <div className="space-y-0.5">
                  <p className="text-slate-800">Quarterly Site Quality Audit</p>
                  <p className="text-[11px] text-slate-400 font-medium">Reviewing layout compliance logs and local supply chain operations.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Contact info */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-800 text-sm border-b border-slate-50 pb-2">
              Management Contact
            </h3>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <User className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">
                    {franchise.contactPerson}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Authorized Franchise Manager
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-700">
                    {franchise.phone}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Corporate Phone Line
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-700">
                    {franchise.email}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Assigned Portal Webmail
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-50">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-700 leading-normal">
                    {franchise.address}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Physical Showroom Address
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
