import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { projectService } from "../services/projectService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { StatusBadge } from "../components/StatusBadge";
import { Breadcrumb } from "../components/Breadcrumb";
import { useToast } from "../context/ToastContext";
import {
  ArrowLeft,
  Calendar,
  User,
  MapPin,
  ClipboardList,
  FileText,
  MessageSquare,
  Plus,
  Compass,
  ArrowRight
} from "lucide-react";

export function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [progressVal, setProgressVal] = useState(0);
  const [savingProgress, setSavingProgress] = useState(false);

  const loadProject = async () => {
    try {
      setLoading(true);
      const data = await projectService.getProjectById(id);
      setProject(data);
      setProgressVal(data.progress);
    } catch (err) {
      addToast("Project record not found", "error");
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProject();
  }, [id]);

  const handleUpdateProgress = async (val) => {
    try {
      setSavingProgress(true);
      const numVal = Number(val);
      await projectService.updateProject(id, { progress: numVal });
      setProject((prev) => ({ ...prev, progress: numVal }));
      addToast(`Execution stage updated to ${numVal}%`, "info");
    } catch (err) {
      addToast("Failed to update execution progress", "error");
    } finally {
      setSavingProgress(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const updated = await projectService.addNote(id, newNote);
      setProject(updated);
      setNewNote("");
      addToast("Site note logged successfully", "success");
    } catch (err) {
      addToast("Failed to log site note", "error");
    }
  };

  if (loading) {
    return <Loader label="Securing project blueprints..." />;
  }

  const breadcrumbs = [
    { label: "Projects Portfolio", path: "/projects" },
    { label: project.name }
  ];

  return (
    <div className="space-y-6" id="project-details-root">
      {/* Back & Breadcrumbs Panel */}
      <div className="flex flex-col gap-2 shrink-0">
        <Link
          to="/projects"
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors width-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* Main Core Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Image Toggles, Description, Documents, Notes */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Cover & Before-After Split Card */}
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Project Renovation States
                </h2>
                <p className="text-xs text-slate-500">
                  Before and After design transitions.
                </p>
              </div>
              <StatusBadge status={project.category} />
            </div>

            {/* Side by side state images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                  Original Site State (Before)
                </span>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-150">
                  <img
                    src={project.beforeImage}
                    alt="Before State"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 rounded text-[10px] font-bold text-white">
                    Before
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A227] block">
                  Envisioned / Executed State (After)
                </span>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 border border-[#C9A227]/20">
                  <img
                    src={project.afterImage}
                    alt="After State"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#C9A227] rounded text-[10px] font-bold text-white">
                    After
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Description */}
            <div className="space-y-2 pt-4 border-t border-slate-50 text-slate-700">
              <h3 className="text-sm font-bold text-slate-800">
                Operational Outline & Scope
              </h3>
              <p className="text-xs leading-relaxed text-slate-500">
                {project.description}
              </p>
            </div>
          </div>

          {/* Documents Attachment Module */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Associated Design files & Contracts
              </h2>
              <p className="text-xs text-slate-500">
                Authorized CAD files, structural layouts, and invoice forms.
              </p>
            </div>

            {project.documents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="project-docs">
                {project.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigate(`/documents`)} // Link to document portal
                    className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:border-[#C9A227]/40 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 bg-rose-50 text-rose-500 rounded-lg shrink-0 border border-rose-100/30">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">
                          {doc.name}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {doc.size} • PDF Doc
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-medium italic">
                No legal files attached to this dossier.
              </p>
            )}
          </div>

          {/* Notes logging timeline */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Site Diaries & Logs
              </h2>
              <p className="text-xs text-slate-500">
                Timeline logs written by the assigned site engineers.
              </p>
            </div>

            {/* Note stream */}
            <div className="space-y-3.5" id="project-notes-timeline">
              {project.notes.map((note, index) => {
                const parts = note.split(":");
                const dateStr = parts[0];
                const textStr = parts.slice(1).join(":");

                return (
                  <div key={index} className="flex gap-3 text-xs leading-relaxed items-start">
                    <div className="px-2.5 py-1 bg-slate-100 text-slate-500 font-bold rounded-lg shrink-0">
                      {dateStr}
                    </div>
                    <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl flex-1 text-slate-600 font-medium">
                      {textStr}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note add Form */}
            <form onSubmit={handleAddNote} className="pt-4 border-t border-slate-50 flex gap-3">
              <input
                type="text"
                placeholder="Log a site update (e.g. electrical ceiling test cleared)..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
                id="new-note-input"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#C9A227] hover:bg-[#b08d20] text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-xs shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Diary</span>
              </button>
            </form>
          </div>

        </div>

        {/* Right 1 Column: Summary, Manager, Progress Slider, Quick Tasks */}
        <div className="space-y-6">
          
          {/* Progress Editor Card */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-5">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">
                Execution Progress
              </h3>
              <p className="text-[11px] text-slate-400">
                Adjust execution metrics in real-time.
              </p>
            </div>

            {/* Dynamic visual wheel or bar */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A227]">
                  Completion Status
                </span>
                <span className="text-2xl font-black text-[#C9A227]">
                  {progressVal}%
                </span>
              </div>

              {/* Input slider */}
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progressVal}
                onChange={(e) => setProgressVal(Number(e.target.value))}
                onMouseUp={(e) => handleUpdateProgress(e.target.value)}
                onTouchEnd={(e) => handleUpdateProgress(e.target.value)}
                className="w-full accent-[#C9A227] cursor-pointer"
                id="progress-range-slider"
              />
              
              <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1">
                <span>0% (Sourced)</span>
                <span>50% (Framed)</span>
                <span>100% (Signed)</span>
              </div>
            </div>
          </div>

          {/* Allocation & Logistics Card */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-800 text-sm border-b border-slate-50 pb-2">
              Logistics & Allocation
            </h3>
            
            <div className="space-y-3.5 text-xs">
              {/* Manager info */}
              <div className="flex items-start gap-2.5">
                <User className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">
                    {project.projectManager}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Assigned Project Manager
                  </p>
                </div>
              </div>

              {/* Client info */}
              <div className="flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">
                    {project.clientName}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Client Dossier Owner
                  </p>
                </div>
              </div>

              {/* Site address info */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-700 leading-normal">
                    {project.siteAddress}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Physical Site Location
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
