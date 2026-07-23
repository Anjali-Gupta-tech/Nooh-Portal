import { useEffect } from "react";

export default function ChatGPT() {
  useEffect(() => {
    window.open("https://chat.openai.com", "_blank");

    // Agar same tab me open karna ho to niche wala use karo
    // window.location.href = "https://chat.openai.com";
  }, []);

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-800">
          Opening ChatGPT...
        </h2>
        <p className="mt-2 text-gray-500">
          If it doesn't open automatically,
        </p>

        <a
          href="https://chat.openai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-5 py-3 rounded-xl bg-black text-white hover:bg-slate-800"
        >
          Open ChatGPT
        </a>
      </div>
    </div>
  );
}