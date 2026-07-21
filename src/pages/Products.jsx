import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";
import { productService } from "../services/productService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { Modal } from "../components/Modal";
import { EmptyState } from "../components/EmptyState";
import { ShoppingBag, Plus, FileDown, Eye, ArrowRight } from "lucide-react";

export function Products() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const loadData = async () => {
    try {
      setLoading(true);
      const [allProds, allCats] = await Promise.all([
        productService.getProducts(),
        productService.getCategories()
      ]);
      setProducts(allProds);
      setCategories(allCats);
    } catch (err) {
      addToast("Failed to fetch product catalog", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateProduct = async (data) => {
    try {
      await productService.createProduct(data);
      addToast(`Product "${data.name}" added to catalogue!`, "success");
      setIsAddModalOpen(false);
      reset();
      loadData();
    } catch (err) {
      addToast("Error creating product.", "error");
    }
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  if (loading) {
    return <Loader label="Retrieving catalog registry..." />;
  }

  return (
    <div className="space-y-6" id="products-page-root">
      <PageHeader
        title="Products & Materials Catalog"
        description="Browse material references, pricing tariffs, and technical specifications."
        action={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] hover:bg-[#b08d20] text-white text-sm font-semibold rounded-lg shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Catalog Entry</span>
          </button>
        }
      />

      {/* Category filters layout */}
      <div className="flex gap-2 overflow-x-auto pb-2 shrink-0 border-b border-slate-100" id="products-category-bar">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
            selectedCategory === "All"
              ? "bg-[#C9A227] text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-600"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
              selectedCategory === cat
                ? "bg-[#C9A227] text-white"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn" id="products-grid">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => navigate(`/products/${prod.id}`)}
              className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col justify-between h-full group"
            >
              <div>
                {/* Visual Image */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 border border-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-700">
                    {prod.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-[#C9A227] transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Row */}
              <div className="p-5 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block">
                    Catalog Price
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {prod.price}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  {/* View Details */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${prod.id}`);
                    }}
                    className="p-1.5 bg-slate-50 hover:bg-[#C9A227]/10 text-slate-500 hover:text-[#C9A227] border border-slate-100 rounded-lg transition-colors"
                    title="View Technical Specs"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Catalog button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToast(`Downloading specs sheet: ${prod.catalogUrl}`, "info");
                      navigate(`/documents`); // Redirect to files list
                    }}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-100 rounded-lg transition-colors"
                    title="View Catalog Folder"
                  >
                    <FileDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Empty Category"
          description={`There are no products listed in category "${selectedCategory}" yet.`}
          icon={ShoppingBag}
        />
      )}

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="New Catalog Arrival"
        size="md"
      >
        <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Product Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Product name is required" })}
              placeholder="e.g., LED Suspended Circle Light"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Category
              </label>
              <select
                {...register("category")}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Catalog Tariff / Price
              </label>
              <input
                type="text"
                {...register("price", { required: "Pricing unit details required" })}
                placeholder="e.g., ₹450 / sqft or ₹12,000 / roll"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-semibold"
              />
              {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Image URL (Unsplash)
              </label>
              <input
                type="text"
                {...register("image")}
                defaultValue="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                PDF Spec File Link
              </label>
              <input
                type="text"
                {...register("catalogUrl")}
                defaultValue="nooh_product_spec_draft.pdf"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Technical Description
            </label>
            <textarea
              {...register("description", { required: "Technical description is required" })}
              rows={3}
              placeholder="Material density, compositions, thermal insulation or fire certificate categories..."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all resize-none animate-fadeIn"
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
              Add Product
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
