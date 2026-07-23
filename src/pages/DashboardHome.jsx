import React from "react";
import { useNavigate } from "react-router-dom";
import { StatsCard } from "../components/StatsCard";

import {
  Briefcase,
  Users,
  ShoppingBag,
  FolderOpen,
  Image,
  Contact,
  Building2,
   MessageCircle,
  Bot,
  FileText,
  Quote,
  MessagesSquare,

  
} from "lucide-react";

export function DashboardHome() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Projects",
      icon: Briefcase,
      to: "/app/projects",
    },
    {
      title: "Clients",
      icon: Users,
      to: "/app/clients",
    },
    {
      title: "Products",
      icon: ShoppingBag,
      to: "/app/products",
    },
    {
      title: "Documents",
      icon: FolderOpen,
      to: "/app/documents",
    },
   
   {
      title: "Contact",
      icon: Contact,
      to: "/app/contact",
    },
   {
    title:"Franchise",
    icon:Building2,
    to:"/app/franchise"
   },
   {
  title: "WhatsApp",
  icon: MessageCircle,
  to: "/app/whatsapp",
},
  {
  title: "ChatGPT",
  icon: Bot,
  to: "/app/chatgpt",
},
   {
  title: "Quotation",
  icon: Quote,
  to: "/app/quotation",
}
   

  
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold text-slate-800">
          NOOH Internal Portal
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome to the company dashboard.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <StatsCard
            key={index}
            title={card.title}
            value=""
            icon={card.icon}
            onClick={() => navigate(card.to)}
          />
        ))}
      </div>
    </div>
  );
}