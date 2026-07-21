import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { documentService } from "../services/documentService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { PDFCard } from "../components/PDFCard";
import { useToast } from "../context/ToastContext";
import { Folder, ChevronRight, FileText, ArrowLeft, Search } from "lucide-react";

export function Documents() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadFolders = async () => {
    try {
      setLoading(true);
      const list = await documentService.getFolders();
      setFolders(list);
    } catch (err) {
      addToast("Failed to fetch documents directory", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFolders();
  }, []);

  const handleFolderClick = async (folderId) => {
    try {
      const folderData = await documentService.getFolderById(folderId);
      setSelectedFolder(folderData);
    } catch (err) {
      addToast("Failed to fetch folder contents", "error");
    }
  };

  const handleDownload = (filename) => {
    addToast(`File "${filename}" successfully synchronized to local storage!`, "success");
  };

  const handlePreview = (fileId) => {
    navigate(`/documents/preview/${fileId}`);
  };

  if (loading) {
    return <Loader label="Cataloging document registry..." />;
  }

  // Filter folders or files by query if typed
  const filteredFolders = folders.filter((folder) => {
    return (
      folder.folderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      folder.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6" id="documents-page-root">
      
      {/* Dynamic Header based on active state */}
      {!selectedFolder ? (
        <PageHeader
          title="Company Documents Library"
          description="Internal library of government registrations, compliance certificates, and supplier spec catalogs."
          action={
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <Search className="w-4.5 h-4.5" />
              </span>
              <input
                type="text"
                placeholder="Search libraries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-xl text-xs font-bold focus:border-[#C9A227] focus:outline-none transition-all placeholder-slate-400"
                id="docs-search-input"
              />
            </div>
          }
        />
      ) : (
        <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-6" id="docs-sub-header">
          <button
            onClick={() => setSelectedFolder(null)}
            className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-xl transition-all shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              {selectedFolder.folderName}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedFolder.description}
            </p>
          </div>
        </div>
      )}

      {/* Main Content Pane */}
      {!selectedFolder ? (
        // Folders view list
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="documents-folders-grid">
          {filteredFolders.map((folder) => (
            <div
              key={folder.folderId}
              onClick={() => handleFolderClick(folder.folderId)}
              className="bg-white border border-slate-100 rounded-xl p-5 shadow-xs hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col justify-between h-40 group hover:border-[#C9A227]/30"
            >
              <div className="space-y-2">
                <div className="p-2.5 bg-amber-50 text-amber-500 rounded-lg w-fit border border-amber-100/40">
                  <Folder className="w-5 h-5 shrink-0" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm group-hover:text-[#C9A227] transition-colors truncate">
                  {folder.folderName}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {folder.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-[#C9A227] transition-colors">
                <span>{folder.fileCount} PDF document(s)</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Files view list in active folder
        <div className="space-y-4 max-w-4xl" id="documents-files-list">
          {selectedFolder.files.length > 0 ? (
            selectedFolder.files.map((file) => (
              <PDFCard
                key={file.id}
                name={file.name}
                size={file.size}
                uploadDate={file.uploadDate}
                onView={() => handlePreview(file.id)}
                onDownload={() => handleDownload(file.name)}
              />
            ))
          ) : (
            <p className="text-sm font-medium text-slate-400 italic">No files in folder.</p>
          )}
        </div>
      )}
    </div>
  );
}
