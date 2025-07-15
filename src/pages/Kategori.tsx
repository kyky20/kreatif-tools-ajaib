import React from "react";
import Navbar from "@/components/ui/navbar";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import toolsAnimation from "@/assets/animations/tools.json";

const kategoriList = [
  { name: "AI Marketing" },
  { name: "AI Tulisan" },
  { name: "AI Gambar" },
  { name: "AI Video" },
];

const Kategori = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <h1 className="text-4xl font-bold mb-2 pt-2 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent leading-normal">
              Kategori Tools AI
            </h1>
            <div className="w-full max-w-xs mx-auto mt-8 mb-10">
              <Lottie
                animationData={toolsAnimation}
                loop
                className="w-full h-auto"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {kategoriList.map((kategori, index) => (
                <Link
                  to={`/kategori/${kategori.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition duration-200"
                >
                  <h2 className="text-xl font-semibold text-white">
                    {kategori.name}
                  </h2>
                </Link>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-500 mt-10">
              Pilih kategori untuk melihat tools yang tersedia
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">© 2025 KreasIA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Kategori;
