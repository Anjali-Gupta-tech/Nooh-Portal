import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";
import { vendorService } from "../services/vendorService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { DataTable } from "../components/DataTable";
import { Modal } from "../components/Modal";
import { Truck, Plus, Eye, Phone, Mail, MapPin } from "lucide-react";

export function Vendors() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const loadVendors = async () => {
    try {
      setLoading(true);
      const data = await vendorService.getVendors();
      setVendors(data);
    } catch (err) {
      addToast("Failed to fetch vendors directory", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const handleCreateVendor = async (data) => {
    try {
      await vendorService.createVendor(data);
      addToast(`Vendor "${data.name}" added successfully!`, "success");
      setIsAddModalOpen(false);
      reset();
      loadVendors();
    } catch (err) {
      addToast("Failed to create vendor entry.", "error");
    }
  };

  if (loading) {
    return <Loader label="Retrieving sourcing indexes..." />;
  }

  const columns = [
    {
      header: "Vendor Name",
      accessor: "name",
      render: (val, row) => (
        <div className="font-bold text-slate-800 flex flex-col">
          <span>{val}</span>
          <span className="text-[10px] text-slate-400 font-mono font-medium">{row.id}</span>
        </div>
      )
    },
    {
      header: "Products Supplied",
      accessor: "productsSupplied",
      render: (val) => (
        <span className="inline-flex items-center px-2 py-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 text-xs font-semibold max-w-xs truncate" title={val}>
          {val}
        </span>
      )
    },
    {
      header: "Contact Channels",
      accessor: "phone",
      render: (val, row) => (
        <div className="space-y-1 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{val}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{row.email}</span>
          </div>
        </div>
      )
    },
    {
      header: "Factory / Depot Location",
      accessor: "address",
      render: (val) => (
        <div className="flex items-start gap-1 max-w-xs text-xs font-medium text-slate-500 leading-normal">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span className="line-clamp-2">{val}</span>
        </div>
      )
    },
    {
      header: "Terms & Notes",
      accessor: "notes",
      render: (val) => (
        <p className="text-xs text-slate-400 max-w-xs line-clamp-2 leading-relaxed">
          {val}
        </p>
      )
    },
    {
      header: "Actions",
      accessor: "id",
      render: (val) => (
        <button
          onClick={() => navigate(`/vendors/${val}`)}
          className="p-1.5 hover:bg-slate-50 text-[#C9A227] hover:text-[#b08d20] rounded-lg border border-slate-100 transition-colors"
          title="Inspect Vendor Specs"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6" id="vendors-page-root">
      <PageHeader
        title="Verified Manufacturing Partners"
        description="Verify supplier contacts, delivery lead-times, and product supply terms."
        action={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] hover:bg-[#b08d20] text-white text-sm font-semibold rounded-lg shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard Supplier Partner</span>
          </button>
        }
      />

      {/* Reusable table displays active vendors */}
      <DataTable
        columns={columns}
        data={vendors}
        searchPlaceholder="Search suppliers, materials supplied or cities..."
        searchKeys={["name", "productsSupplied", "address", "notes"]}
      />

      {/* Add Vendor Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Onboard Sourcing Supplier"
        size="md"
      >
        <form onSubmit={handleSubmit(handleCreateVendor)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Supplier Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Vendor name is required" })}
              placeholder="e.g., Century Wood & Panel Co."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Materials Supplied
            </label>
            <input
              type="text"
              {...register("productsSupplied", { required: "Supply list is required" })}
              placeholder="e.g., MDF Boards, Fluted Claddings, Glue"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
            />
            {errors.productsSupplied && <p className="text-xs text-rose-500 mt-1">{errors.productsSupplied.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Office Telephone
              </label>
              <input
                type="text"
                {...register("phone", { required: "Telephone contact required" })}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-semibold"
              />
              {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Orders Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Orders email required" })}
                placeholder="sales@supplier.com"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-semibold"
              />
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Physical Depot Address
            </label>
            <input
              type="text"
              {...register("address", { required: "Depot address is required" })}
              placeholder="Full factory or warehouse location details"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
            />
            {errors.address && <p className="text-xs text-rose-500 mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Purchase Terms & notes
            </label>
            <textarea
              {...register("notes")}
              rows={3}
              placeholder="e.g. 50% advance, 12 days lead-time, 2-year warranty..."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all resize-none animate-fadeIn"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#C9A227] hover:bg-[#b08d20] text-white text-sm font-semibold rounded-lg shadow-xs"
            >
              Add Supplier
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
