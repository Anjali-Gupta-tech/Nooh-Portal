import {
  Phone,
  MessageCircle,
  Mail,
  Instagram,
  Globe,
} from "lucide-react";

const contacts = [
  {
    name: "Call",
    icon: Phone,
    href: "tel:+919876543210",
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/919876543210",
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:info@noohliving.com",
    bg: "bg-red-100",
    color: "text-red-600",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/noohliving",
    bg: "bg-pink-100",
    color: "text-pink-600",
  },
  {
    name: "Website",
    icon: Globe,
    href: "https://noohliving.com",
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
];

export default function ContactCards() {
  return (
    <div className="grid grid-cols-5 gap-3">
      {contacts.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.name}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : "_self"}
            rel="noreferrer"
            className="flex flex-col items-center justify-center rounded-xl border bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className={`rounded-lg p-3 ${item.bg}`}>
              <Icon size={22} className={item.color} />
            </div>

            <span className="mt-2 text-xs font-medium text-gray-700">
              {item.name}
            </span>
          </a>
        );
      })}
    </div>
  );
}

