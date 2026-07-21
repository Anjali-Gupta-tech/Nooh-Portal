import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";
import { projectService } from "../services/projectService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { StatusBadge } from "../components/StatusBadge";
import { Modal } from "../components/Modal";
import { EmptyState } from "../components/EmptyState";
import { Briefcase, Plus, MapPin, User, ChevronRight, Check } from "lucide-react";

export function Projects() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (err) {
      addToast("Failed to fetch projects database", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateProject = async (data) => {
    try {
      await projectService.createProject(data);
      addToast(`Project for ${data.clientName} created successfully!`, "success");
      setIsAddModalOpen(false);
      reset();
      loadProjects();
    } catch (err) {
      addToast("Error creating project.", "error");
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "All") return true;
    return p.category.toLowerCase() === activeTab.toLowerCase();
  });

  if (loading) {
    return <Loader label="Retrieving project dossiers..." />;
  }

  const tabs = ["All", "Ongoing", "Completed", "Upcoming"];

  return (
    <div className="space-y-6" id="projects-page-root">
      <PageHeader
        title="Projects Portfolio"
        description="Review structural stages, manager allocations, client dossiers, and notes."
        action={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] hover:bg-[#b08d20] text-white text-sm font-semibold rounded-lg shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Project Record</span>
          </button>
        }
      />

      {/* Tabs Row */}
      <div className="flex border-b border-slate-100 pb-px gap-2 overflow-x-auto shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold transition-all relative shrink-0 ${
              activeTab === tab
                ? "text-[#C9A227]"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A227]" />
            )}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col h-full group"
            >
              {/* Cover Image */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <StatusBadge status={project.category} />
                </div>
              </div>

              {/* Contents */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-800 text-base leading-snug group-hover:text-[#C9A227] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3.5 pt-2 border-t border-slate-50">
                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-500">
                      <span>Execution Stage</span>
                      <span className="text-[#C9A227]">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#C9A227] h-full rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-500">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <User className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate" title={project.clientName}>
                        {project.clientName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate" title={project.siteAddress}>
                        {project.siteAddress}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#C9A227] group-hover:underline">
                  <span>View Full Logs</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No ${activeTab !== "All" ? activeTab : ""} Projects`}
          description="We couldn't find any projects matching this status filter."
          icon={Briefcase}
        />
      )}

      {/* Add Project Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Project Record"
        size="md"
      >
        <form onSubmit={handleSubmit(handleCreateProject)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Project Name / Title
            </label>
            <input
              type="text"
              {...register("name", { required: "Project name is required" })}
              placeholder="e.g., Sector-15 Translucent Ceiling"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Client Name
              </label>
              <input
                type="text"
                {...register("clientName", { required: "Client name is required" })}
                placeholder="e.g., Rajesh Sharma"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
              />
              {errors.clientName && <p className="text-xs text-rose-500 mt-1">{errors.clientName.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Project Stage / Status
              </label>
              <select
                {...register("category")}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Site Address
            </label>
            <input
              type="text"
              {...register("siteAddress", { required: "Site address is required" })}
              placeholder="Full site location details"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
            />
            {errors.siteAddress && <p className="text-xs text-rose-500 mt-1">{errors.siteAddress.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Project Manager
              </label>
              <input
                type="text"
                {...register("projectManager", { required: "Manager allocation is required" })}
                placeholder="e.g., Amit Verma"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
              />
              {errors.projectManager && <p className="text-xs text-rose-500 mt-1">{errors.projectManager.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Cover Photo URL (Unsplash)
              </label>
              <input
                type="text"
                {...register("image")}
                defaultValue="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Project Description
            </label>
            <textarea
              {...register("description", { required: "Description is required" })}
              rows={3}
              placeholder="Specify structural details and key materials..."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all resize-none"
            />
            {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>}
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
              Create Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
