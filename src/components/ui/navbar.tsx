"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="bg-black/20 backdrop-blur-lg rounded-xl shadow-lg ring-1 ring-white/10">
            <div className="flex items-center justify-between px-4 py-2">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <img src="/icon.png" alt="Icon" className="h-8 w-8" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  KreasIA
                </span>
              </div>

              {/* Menu Desktop */}
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition"
                >
                  Telusuri Tools
                </a>

                <div className="relative group">
                  <button className="flex items-center text-gray-200 hover:text-white">
                    Kategori
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute hidden group-hover:block bg-black/50 backdrop-blur-md rounded-lg mt-2 py-2 w-48 ring-1 ring-white/10">
                    {[
                      "AI Gambar",
                      "AI Tulisan",
                      "AI Video",
                      "AI Marketing",
                    ].map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-fuchsia-500/50"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition"
                >
                  Tentang Kami
                </a>
              </div>

              {/* Aksi Desktop */}
              <div className="hidden md:flex items-center space-x-2">
                <a
                  href="#"
                  className="text-gray-200 hover:text-white px-4 py-2 rounded-md"
                >
                  Masuk
                </a>
                <a
                  href="#"
                  className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-700 transition-all duration-300 shadow-lg shadow-fuchsia-600/30"
                >
                  Daftar Gratis
                </a>
              </div>

              {/* Hamburger */}
              <div className="md:hidden">
                <button
                  className="text-white focus:outline-none"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Menu Mobile */}
            {menuOpen && (
              <div className="md:hidden px-4 pb-4 animate-slide-in-right">
                <div className="space-y-2">
                  <a href="#" className="block text-white">
                    Telusuri Tools
                  </a>
                  <div>
                    <span className="block text-white font-medium">
                      Kategori
                    </span>
                    <div className="ml-2 mt-1 space-y-1">
                      {[
                        "AI Gambar",
                        "AI Tulisan",
                        "AI Video",
                        "AI Marketing",
                      ].map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block text-gray-300 hover:text-white"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                  <a href="#" className="block text-white">
                    Blog
                  </a>
                  <a href="#" className="block text-white">
                    Tentang Kami
                  </a>
                  <div className="flex flex-col gap-2 pt-2">
                    <a
                      href="#"
                      className="text-gray-200 hover:text-white px-4 py-2 rounded-md border border-white/20 text-center"
                    >
                      Masuk
                    </a>
                    <a
                      href="#"
                      className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-700 text-center"
                    >
                      Daftar Gratis
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
