import React, { useState } from "react";
import { franchiseData } from "../data/franchise";
import {
  Search,
  Eye,
  Download,
  Share2,
  FileText,
} from "lucide-react";

export function Franchise() {
  const [search, setSearch] = useState("");

  const filtered = franchiseData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const sharePDF = async (pdf, title) => {
    const url = window.location.origin + pdf;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (e) {}
    } else {
      navigator.clipboard.writeText(url);
      alert("PDF link copied successfully.");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Franchise Documents
      </h1>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search documents..."
          className="w-full border rounded-lg pl-12 pr-4 py-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filtered.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-5"
          >

            <div className="flex justify-center mb-4">

              <FileText className="w-16 h-16 text-red-600" />

            </div>

            <h2 className="font-bold text-lg">
              {item.title}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              {item.description}
            </p>

            <div className="flex gap-2 mt-6">

              <button
                onClick={() => window.open(item.pdf, "_blank")}
                className="flex-1 bg-blue-600 text-white rounded-lg py-2 flex justify-center items-center gap-2"
              >
                <Eye size={18} />
                View
              </button>

              <a
                href={item.pdf}
                download
                className="flex-1 bg-green-600 text-white rounded-lg py-2 flex justify-center items-center gap-2"
              >
                <Download size={18} />
                Download
              </a>

            </div>

            <button
              onClick={() => sharePDF(item.pdf, item.title)}
              className="mt-3 w-full bg-gray-900 text-white rounded-lg py-2 flex justify-center items-center gap-2"
            >
              <Share2 size={18} />
              Share
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}