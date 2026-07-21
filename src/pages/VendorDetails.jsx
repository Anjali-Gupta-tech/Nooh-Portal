import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { vendorService } from "../services/vendorService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { Breadcrumb } from "../components/Breadcrumb";
import { useToast } from "../context/ToastContext";
import { ArrowLeft, Phone, Mail, MapPin, Truck, AlertCircle, FileText } from "lucide-react";

export function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await vendorService.getVendorById(id);
        setVendor(data);
      } catch (err) {
        addToast("Vendor spec not found", "error");
        navigate("/vendors");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, navigate]);

  if (loading) {
    return <Loader label="Retrieving vendor logistics..." />;
  }

  const breadcrumbs = [
    { label: "Vendors & Sourcing", path: "/vendors" },
    { label: vendor.name }
  ];

  return (
    <div className="space-y-6" id="vendor-details-root">
      {/* Navigation and Breadcrumbs */}
      <div className="flex flex-col gap-2 shrink-0">
        <Link
          to="/vendors"
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors width-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Partners List</span>
        </Link>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns: Profile details and supplied items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-6">
            <div className="flex items-start gap-4 border-b border-slate-50 pb-4">
              <div className="p-3 bg-[#C9A227]/5 border border-[#C9A227]/10 text-[#C9A227] rounded-xl">
                <Truck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold font-mono uppercase">Ref: {vendor.id}</span>
                <h1 className="text-xl font-bold tracking-tight text-slate-800">
                  {vendor.name}
                </h1>
              </div>
            </div>

            {/* Sourced components list */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Supply Classification
              </h3>
              <div className="p-4 bg-slate-50/60 border border-slate-100 rounded-lg flex items-center justify-between text-xs font-semibold">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[9px] block">Materials Cataloged</span>
                  <p className="text-slate-700 font-bold mt-1 leading-normal">{vendor.productsSupplied}</p>
                </div>
                <div className="px-2.5 py-1 bg-green-50 border border-green-150 rounded text-green-700 text-[10px] font-black uppercase">
                  ACTIVE PARTNER
                </div>
              </div>
            </div>

            {/* Note details */}
            <div className="space-y-2 pt-4 border-t border-slate-50 text-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Contractual Terms & Delivery Logs
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {vendor.notes}
              </p>
            </div>
          </div>

          {/* Sourcing guidelines info card */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs flex items-start gap-3.5 text-xs text-slate-500 leading-relaxed font-semibold">
            <AlertCircle className="w-5 h-5 text-[#C9A227] shrink-0" />
            <div>
              <p className="text-slate-800 font-bold">Standard Payment Clause</p>
              <p className="mt-1">All purchasing contracts are governed under the company documents library terms. Minimum delivery schedules must be verified with senior site engineers prior to issuing material gatepasses.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Address panel */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-800 text-sm border-b border-slate-50 pb-2">
              Sourcing Contact Card
            </h3>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">
                    {vendor.phone}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Orders Telephone Line
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-700">
                    {vendor.email}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Supplier Inquiry Mail
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-50">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-700 leading-normal">
                    {vendor.address}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Physical Depot Location
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
