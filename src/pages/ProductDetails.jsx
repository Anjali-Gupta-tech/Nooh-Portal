import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { productService } from "../services/productService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { Breadcrumb } from "../components/Breadcrumb";
import { useToast } from "../context/ToastContext";
import { ArrowLeft, Tag, DollarSign, BookOpen, Layers, ShieldCheck, Download } from "lucide-react";

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        addToast("Product spec not found", "error");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id, navigate]);

  if (loading) {
    return <Loader label="Securing technical specifications..." />;
  }

  const breadcrumbs = [
    { label: "Products Catalog", path: "/app/products" },
    { label: product.name }
  ];

  return (
    <div className="space-y-6" id="product-details-root">
      {/* Navigation & Breadcrumbs */}
      <div className="flex flex-col gap-2 shrink-0">
        <Link
          to="/products"
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors width-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </Link>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-slate-100 rounded-xl p-6 md:p-8 shadow-xs">
        {/* Left Side: Large Product Zoom View */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-50 border border-slate-100/55">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-[#C9A227] border border-[#C9A227]/20 shadow-xs">
            {product.category}
          </div>
        </div>

        {/* Right Side: Specification Details */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                Item Code: {product.id}
              </span>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 mt-1 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Pricing Card Section */}
            <div className="p-4 bg-slate-50/75 border border-slate-100 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                  Catalog Pricing
                </span>
                <span className="text-lg font-black text-[#C9A227] mt-0.5 block">
                  {product.price}
                </span>
              </div>
              <div className="px-3 py-1 bg-green-50 border border-green-150 rounded-lg text-green-700 text-xs font-bold uppercase tracking-wider">
                Active SKU
              </div>
            </div>

            {/* Spec Sheet Table */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Technical Blueprint
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-lg space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Classification</span>
                  <p className="font-semibold text-slate-700">{product.category}</p>
                </div>

                <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-lg space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Compliance Certs</span>
                  <p className="font-semibold text-slate-700">ISO 9001, B-s1-d0</p>
                </div>
              </div>
            </div>

            {/* Long Spec description */}
            <div className="space-y-1.5 text-slate-600 leading-relaxed text-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Specifier Notes
              </h3>
              <p className="text-slate-500 font-medium">
                {product.description}
              </p>
            </div>
          </div>

          {/* Trigger Spec download links */}
          <div className="pt-4 border-t border-slate-50">
            <button
              onClick={() => {
                addToast(`Spec manual "${product.catalogUrl}" opened in workspace`, "success");
                navigate("/documents");
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#C9A227] hover:bg-[#b08d20] text-white font-bold text-sm rounded-xl shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Open Catalog Attachment (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
