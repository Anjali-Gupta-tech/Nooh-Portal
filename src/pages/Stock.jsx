import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";
import { stockService } from "../services/stockService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { DataTable } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Modal } from "../components/Modal";
import { RefreshCw, Edit2, AlertTriangle, HelpCircle } from "lucide-react";

export function Stock() {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stockItems, setStockItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const loadStock = async () => {
    try {
      setLoading(true);
      const data = await stockService.getStock();
      setStockItems(data);
    } catch (err) {
      addToast("Failed to fetch stock directory", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStock();
  }, []);

  const handleOpenAdjust = (item) => {
    setSelectedItem(item);
    setValue("quantity", item.quantity);
    setIsAdjustModalOpen(true);
  };

  const handleAdjustQuantity = async (data) => {
    try {
      const updated = await stockService.updateStockQuantity(selectedItem.id, data.quantity);
      addToast(`Updated ${updated.productName} quantity to ${updated.quantity} ${updated.unit}.`, "success");
      setIsAdjustModalOpen(false);
      loadStock();
    } catch (err) {
      addToast("Failed to adjust inventory.", "error");
    }
  };

  if (loading) {
    return <Loader label="Auditing physical inventory..." />;
  }

  const columns = [
    {
      header: "Product / Material Name",
      accessor: "productName",
      render: (val, row) => (
        <div className="font-bold text-slate-800 flex flex-col">
          <span>{val}</span>
          <span className="text-[10px] text-slate-400 font-mono font-medium">{row.id}</span>
        </div>
      )
    },
    {
      header: "Category",
      accessor: "category",
      render: (val) => <span className="text-xs text-slate-500 font-semibold">{val}</span>
    },
    {
      header: "Quantity on Hand",
      accessor: "quantity",
      render: (val, row) => (
        <span className="font-mono font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-100">
          {val} <span className="text-[10px] text-slate-400 font-sans font-semibold">{row.unit}</span>
        </span>
      )
    },
    {
      header: "Sourcing Partner",
      accessor: "supplier",
      render: (val) => <span className="text-xs text-slate-500 font-medium">{val}</span>
    },
    {
      header: "Storage Zone / Warehouse",
      accessor: "warehouse",
      render: (val) => (
        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0" />
          {val}
        </span>
      )
    },
    {
      header: "Last Audited",
      accessor: "lastUpdated",
      render: (val) => <span className="text-[11px] text-slate-400 font-bold font-mono">{val}</span>
    },
    {
      header: "Status",
      accessor: "status",
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: "Ledger Actions",
      accessor: "id",
      render: (val, row) => (
        <button
          onClick={() => handleOpenAdjust(row)}
          className="px-2.5 py-1.5 hover:bg-slate-50 text-[#C9A227] font-semibold text-xs rounded-lg border border-slate-100 transition-colors flex items-center gap-1"
          title="Adjust count"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Adjust</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6" id="stock-page-root">
      <PageHeader
        title="Stock & Inventory Audit"
        description="Verify material stock quantities, supplier allocations, and storage zones."
        action={
          <button
            onClick={() => {
              loadStock();
              addToast("Stock ledger synchronized with physical hubs", "success");
            }}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-semibold rounded-lg shadow-xs transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-slate-400" />
            <span>Synchronize</span>
          </button>
        }
      />

      {/* Threshold Information banner */}
      <div className="p-4 bg-[#C9A227]/5 border border-[#C9A227]/10 rounded-xl flex items-start gap-3 text-xs leading-relaxed text-slate-600">
        <AlertTriangle className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#C9A227]">Trigger Levels:</span>
          <br />
          Low Stock badges are automatically allocated to materials that fall below 10 count units (or 100 sqft area sheets) and should trigger sourcing reorders immediately.
        </div>
      </div>

      {/* Table displaying stock items */}
      <DataTable
        columns={columns}
        data={stockItems}
        searchPlaceholder="Search materials, categories or warehouses..."
        searchKeys={["productName", "category", "supplier", "warehouse"]}
      />

      {/* Adjust count Modal */}
      <Modal
        isOpen={isAdjustModalOpen}
        onClose={() => setIsAdjustModalOpen(false)}
        title={selectedItem ? `Adjust Ledger: ${selectedItem.productName}` : "Adjust Quantity"}
        size="sm"
      >
        {selectedItem && (
          <form onSubmit={handleSubmit(handleAdjustQuantity)} className="space-y-4">
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg text-xs space-y-1">
              <p className="text-slate-400 font-bold uppercase tracking-wider">Storage Details</p>
              <p className="font-bold text-slate-700">Hub: {selectedItem.warehouse}</p>
              <p className="font-medium text-slate-500">Supplier: {selectedItem.supplier}</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                New Stock Quantity ({selectedItem.unit})
              </label>
              <input
                type="number"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 0, message: "Quantity cannot be less than 0" }
                })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-mono font-bold"
              />
              {errors.quantity && <p className="text-xs text-rose-500 mt-1">{errors.quantity.message}</p>}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAdjustModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#C9A227] hover:bg-[#b08d20] text-white text-sm font-semibold rounded-lg shadow-xs"
              >
                Apply Count
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
