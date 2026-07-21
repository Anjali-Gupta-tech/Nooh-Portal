import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";
import { clientService } from "../services/clientService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { DataTable } from "../components/DataTable";
import { Modal } from "../components/Modal";
import { Plus, Edit2, Phone, Mail, MapPin, Clipboard } from "lucide-react";

export function Clients() {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd }
  } = useForm();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue: setEditValue,
    formState: { errors: errorsEdit }
  } = useForm();

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getClients();
      setClients(data);
    } catch (err) {
      addToast("Failed to fetch client database", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleCreateClient = async (data) => {
    try {
      const newClient = await clientService.createClient(data);
      addToast(`Client record for ${data.name} added!`, "success");
      setIsAddModalOpen(false);
      resetAdd();
      loadClients();
    } catch (err) {
      addToast("Error creating client.", "error");
    }
  };

  const handleOpenEdit = (client) => {
    setSelectedClient(client);
    setEditValue("name", client.name);
    setEditValue("phone", client.phone);
    setEditValue("email", client.email);
    setEditValue("address", client.address);
    setEditValue("assignedProject", client.assignedProject);
    setEditValue("notes", client.notes);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (data) => {
    try {
      await clientService.updateClient(selectedClient.id, data);
      addToast(`Client file for ${data.name} saved!`, "success");
      setIsEditModalOpen(false);
      resetEdit();
      loadClients();
    } catch (err) {
      addToast("Error saving client records.", "error");
    }
  };

  if (loading) {
    return <Loader label="Retrieving client registers..." />;
  }

  const columns = [
    {
      header: "Client Name",
      accessor: "name",
      render: (val, row) => (
        <div className="font-bold text-slate-800 flex flex-col">
          <span>{val}</span>
          <span className="text-[10px] text-slate-400 font-mono font-medium">{row.id}</span>
        </div>
      )
    },
    {
      header: "Contact Channels",
      accessor: "phone",
      render: (val, row) => (
        <div className="space-y-1.5 text-xs font-semibold text-slate-500">
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
      header: "Site Location",
      accessor: "address",
      render: (val) => (
        <div className="flex items-start gap-1.5 max-w-xs text-xs font-medium text-slate-500 leading-normal">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span className="line-clamp-2">{val}</span>
        </div>
      )
    },
    {
      header: "Assigned Project",
      accessor: "assignedProject",
      render: (val, row) => (
        <span className="inline-flex items-center px-2 py-1 rounded-lg bg-[#C9A227]/5 border border-[#C9A227]/10 text-[#C9A227] text-xs font-bold">
          {val}
        </span>
      )
    },
    {
      header: "Office Dossier Notes",
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
      render: (val, row) => (
        <button
          onClick={() => handleOpenEdit(row)}
          className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-[#C9A227] rounded-lg border border-slate-100 transition-colors"
          title="Edit profile"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6" id="clients-page-root">
      <PageHeader
        title="Client Database"
        description="Verify architectural contacts, assigned contracts, and location registries."
        action={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] hover:bg-[#b08d20] text-white text-sm font-semibold rounded-lg shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Client Entry</span>
          </button>
        }
      />

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={clients}
        searchPlaceholder="Search by client name, email, or project..."
        searchKeys={["name", "email", "phone", "assignedProject"]}
      />

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="New Client Dossier"
        size="md"
      >
        <form onSubmit={handleSubmitAdd(handleCreateClient)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Client Legal Name
            </label>
            <input
              type="text"
              {...registerAdd("name", { required: "Name is required" })}
              placeholder="e.g., Harish Goel"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
            />
            {errorsAdd.name && <p className="text-xs text-rose-500 mt-1">{errorsAdd.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Phone Contact
              </label>
              <input
                type="text"
                {...registerAdd("phone", { required: "Phone contact is required" })}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-semibold"
              />
              {errorsAdd.phone && <p className="text-xs text-rose-500 mt-1">{errorsAdd.phone.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...registerAdd("email", { required: "Email address is required" })}
                placeholder="e.g., client@domain.com"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-semibold"
              />
              {errorsAdd.email && <p className="text-xs text-rose-500 mt-1">{errorsAdd.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Project Assigned Location
            </label>
            <input
              type="text"
              {...registerAdd("assignedProject", { required: "Assigned project is required" })}
              placeholder="e.g., Gurgaon Translucent Box"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
            />
            {errorsAdd.assignedProject && <p className="text-xs text-rose-500 mt-1">{errorsAdd.assignedProject.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Physical Site Address
            </label>
            <input
              type="text"
              {...registerAdd("address", { required: "Site address is required" })}
              placeholder="e.g., Plot 29, DLF Phase 1, Gurgaon"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
            />
            {errorsAdd.address && <p className="text-xs text-rose-500 mt-1">{errorsAdd.address.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Dossier Notes / Custom Requests
            </label>
            <textarea
              {...registerAdd("notes")}
              rows={3}
              placeholder="Specify custom design textures, preferred colors, or contact instructions..."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all resize-none"
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
              Add Client
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Client Dossier"
        size="md"
      >
        <form onSubmit={handleSubmitEdit(handleSaveEdit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Client Legal Name
            </label>
            <input
              type="text"
              {...registerEdit("name", { required: "Name is required" })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-bold"
            />
            {errorsEdit.name && <p className="text-xs text-rose-500 mt-1">{errorsEdit.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Phone Contact
              </label>
              <input
                type="text"
                {...registerEdit("phone", { required: "Phone contact is required" })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-semibold"
              />
              {errorsEdit.phone && <p className="text-xs text-rose-500 mt-1">{errorsEdit.phone.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...registerEdit("email", { required: "Email address is required" })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-semibold"
              />
              {errorsEdit.email && <p className="text-xs text-rose-500 mt-1">{errorsEdit.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Project Assigned Location
            </label>
            <input
              type="text"
              {...registerEdit("assignedProject", { required: "Assigned project is required" })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
            />
            {errorsEdit.assignedProject && <p className="text-xs text-rose-500 mt-1">{errorsEdit.assignedProject.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Physical Site Address
            </label>
            <input
              type="text"
              {...registerEdit("address", { required: "Site address is required" })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
            />
            {errorsEdit.address && <p className="text-xs text-rose-500 mt-1">{errorsEdit.address.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Dossier Notes / Custom Requests
            </label>
            <textarea
              {...registerEdit("notes")}
              rows={3}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#C9A227] hover:bg-[#b08d20] text-white text-sm font-semibold rounded-lg shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
