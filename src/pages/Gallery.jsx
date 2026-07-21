import React, { useState, useEffect } from "react";
import { galleryService } from "../services/galleryService";
import { projectService } from "../services/projectService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { ImageCard } from "../components/ImageCard";
import { Modal } from "../components/Modal";
import { EmptyState } from "../components/EmptyState";
import { Image, Video, Compass, Sparkles } from "lucide-react";

export function Gallery() {
  const [loading, setLoading] = useState(true);
  const [galleryItems, setGalleryItems] = useState([]);
  const [activeType, setActiveType] = useState("All");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("All");
  const [previewItem, setPreviewItem] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [items, projectList] = await Promise.all([
          galleryService.getGallery(),
          projectService.getProjects()
        ]);
        setGalleryItems(items);
        setProjects(projectList);
      } catch (err) {
        console.error("Error loading gallery resources:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const types = ["All", "Project Images", "Before Images", "After Images", "Videos"];

  // Filtered list
  const filteredItems = galleryItems.filter((item) => {
    const typeMatch = activeType === "All" || item.type === activeType;
    const projectMatch = selectedProject === "All" || item.project === selectedProject;
    return typeMatch && projectMatch;
  });

  if (loading) {
    return <Loader label="Compiling media gallery archive..." />;
  }

  return (
    <div className="space-y-6" id="gallery-page-root">
      <PageHeader
        title="Media Gallery Archive"
        description="Verify spatial outputs, texture finishes, stretching progressions, and site videos."
      />

      {/* Filter Row: Type Tabs & Project Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 shrink-0">
        {/* Type Toggles */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 shrink-0">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeType === type
                  ? "bg-[#C9A227] text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Project Selector dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Filter Site:</span>
          </span>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl focus:border-[#C9A227] focus:outline-none transition-all cursor-pointer"
            id="gallery-project-filter"
          >
            <option value="All">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid List */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-grid">
          {filteredItems.map((item) => (
            <ImageCard
              key={item.id}
              title={item.title}
              subtitle={item.project}
              image={item.url}
              isVideo={item.type === "Videos"}
              onClick={() => setPreviewItem(item)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Empty Media Collection"
          description="We couldn't locate any media items matching your active combination."
          icon={Image}
        />
      )}

      {/* Image / Video Lightbox Modal */}
      <Modal
        isOpen={!!previewItem}
        onClose={() => setPreviewItem(null)}
        title={previewItem ? previewItem.title : "Preview Image"}
        size="lg"
      >
        {previewItem && (
          <div className="flex flex-col space-y-4" id="gallery-lightbox">
            {/* Visual Screen */}
            <div className="relative rounded-lg overflow-hidden bg-slate-900 border border-slate-950 flex items-center justify-center aspect-video shadow-inner">
              {previewItem.type === "Videos" && previewItem.videoUrl ? (
                <video
                  src={previewItem.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full rounded-lg"
                  id="lightbox-video-player"
                />
              ) : (
                <img
                  src={previewItem.url}
                  alt={previewItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] object-contain rounded-lg"
                  id="lightbox-image"
                />
              )}
            </div>

            {/* Meta details */}
            <div className="flex items-start justify-between gap-4 p-2">
              <div className="space-y-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#C9A227]/10 text-[#C9A227] text-[10px] font-black uppercase">
                  {previewItem.type}
                </span>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Site Reference: <span className="text-slate-700 font-bold">{previewItem.project}</span>
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 p-2 rounded-xl text-[10px] font-bold text-slate-500">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Verified Asset</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
