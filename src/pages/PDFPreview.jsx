import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { documentService } from "../services/documentService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { Breadcrumb } from "../components/Breadcrumb";
import { useToast } from "../context/ToastContext";
import {
  ArrowLeft,
  Printer,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileCheck,
  Building,
  Calendar,
  Layers
} from "lucide-react";

export function PDFPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await documentService.getFileById(id);
        setFile(data);
      } catch (err) {
        addToast("Document not found", "error");
        navigate("/documents");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, navigate]);

  const handlePrint = () => {
    addToast("Print job dispatched to primary floor printer (Kyocera-3020)", "success");
  };

  const handleDownload = () => {
    addToast(`Saving offline copy: ${file.name}`, "info");
  };

  if (loading) {
    return <Loader label="Decrypting secure document contents..." />;
  }

  const breadcrumbs = [
    { label: "Company Documents", path: "/app/documents" },
    { label: file.folderName, path: `/documents` },
    { label: file.name }
  ];

  return (
    <div className="space-y-6" id="pdf-preview-root">
      
      {/* Navigation Toggles */}
      <div className="flex flex-col gap-2 shrink-0">
        <Link
          to="/documents"
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors width-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Library</span>
        </Link>
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* Reader Controls Toolbar */}
      <div className="bg-slate-800 text-white rounded-xl px-4 py-3 shadow-md flex flex-wrap items-center justify-between gap-4 shrink-0" id="pdf-toolbar">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 bg-rose-500 rounded text-white shrink-0">
            <FileCheck className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold truncate max-w-[200px] sm:max-w-none" title={file.name}>
            {file.name}
          </span>
        </div>

        {/* Action button triggers */}
        <div className="flex items-center gap-3">
          {/* Zoom buttons */}
          <div className="flex items-center bg-slate-700 rounded-lg p-0.5 text-xs font-bold border border-slate-600">
            <button
              onClick={() => setZoom(Math.max(zoom - 10, 80))}
              className="p-1.5 hover:bg-slate-600 rounded text-slate-300 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono w-12 text-center text-slate-200">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(zoom + 10, 130))}
              className="p-1.5 hover:bg-slate-600 rounded text-slate-300 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-slate-700" />

          {/* Print trigger */}
          <button
            onClick={handlePrint}
            className="p-2 bg-slate-700 hover:bg-[#C9A227] hover:text-slate-900 border border-slate-650 rounded-lg text-slate-200 transition-colors"
            title="Print File"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Download trigger */}
          <button
            onClick={handleDownload}
            className="p-2 bg-slate-700 hover:bg-[#C9A227] hover:text-slate-900 border border-slate-650 rounded-lg text-slate-200 transition-colors"
            title="Download offline copy"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sheet Simulation Page */}
      <div className="bg-slate-200 rounded-xl p-6 md:p-12 flex justify-center overflow-auto min-h-[70vh]" id="pdf-viewer-canvas">
        
        {/* Simulating a 4A sized white lined official sheet */}
        <div
          className="bg-white border-t-4 border-[#C9A227] shadow-xl p-8 md:p-12 text-slate-800 flex flex-col justify-between max-w-2xl w-full min-h-[29.7cm] transition-all"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          id="mock-pdf-paper"
        >
          {/* Paper Header */}
          <div className="space-y-4 border-b border-slate-100 pb-6 text-center shrink-0">
            <h2 className="text-base font-black tracking-tight uppercase text-slate-800">
              {file.title}
            </h2>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              {file.subtitle}
            </p>
          </div>

          {/* Paper Body Text */}
          <div className="flex-1 py-8 font-serif text-sm leading-relaxed whitespace-pre-line text-slate-700">
            {file.content}
          </div>

          {/* Paper Footer */}
          <div className="border-t border-slate-100 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 font-bold shrink-0">
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-300" />
              <span>NOOH Living Pvt Ltd • Corporate Office Copy</span>
            </div>
            
            <div className="flex items-center gap-1.5 mt-2 sm:mt-0">
              <Calendar className="w-3.5 h-3.5 text-slate-300" />
              <span>Verified Date: {file.uploadDate}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
