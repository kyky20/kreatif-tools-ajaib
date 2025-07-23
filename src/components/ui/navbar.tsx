import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const kategoriList = [
  { name: "AI Marketing" },
  { name: "AI Tulisan" },
  { name: "AI Gambar" },
  { name: "AI Video" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [kategoriOpen, setKategoriOpen] = useState(false);
  const [desktopKategoriOpen, setDesktopKategoriOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const kategoriRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const { user, loading } = useAuth();

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      const key = e.key?.toLowerCase?.() || "";
      if (key === "t") {
        const section = document.getElementById("tools-section");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        kategoriRef.current &&
        !kategoriRef.current.contains(e.target as Node)
      ) {
        setDesktopKategoriOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Gagal logout.");
    } else {
      toast.success("Berhasil Logout.");
      navigate("/");
    }
  };

  const avatar = user?.user_metadata?.avatar_url;
  const email = user?.email || "";
  const fullName = user?.user_metadata?.full_name || "";
  const initials = email.charAt(0).toUpperCase();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="bg-black/20 backdrop-blur-lg rounded-xl shadow-lg ring-1 ring-white/10">
          <div className="flex items-center justify-between px-4 py-2">
            <Link to="/" className="flex items-center gap-3 cursor-pointer">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                KreasIA
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/telusuri"
                className="text-gray-200 hover:text-white transition"
              >
                Telusuri Tools
              </Link>
              <div className="relative" ref={kategoriRef}>
                <button
                  onClick={() => setDesktopKategoriOpen(!desktopKategoriOpen)}
                  className="flex items-center text-gray-200 hover:text-white transition"
                >
                  Kategori
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transform transition-transform duration-300 ${
                      desktopKategoriOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {desktopKategoriOpen && (
                  <div className="absolute bg-black/50 backdrop-blur-md rounded-lg mt-2 py-2 w-48 ring-1 ring-white/10 z-50">
                    {kategoriList.map((item) => (
                      <Link
                        key={item.name}
                        to="/kategori"
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-fuchsia-500/50"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                to="/blog"
                className="text-gray-200 hover:text-white transition"
              >
                Blog
              </Link>
              <Link
                to="/tentang"
                className="text-gray-200 hover:text-white transition"
              >
                Tentang Kami
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {!loading && user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition"
                  >
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="w-8 h-8 flex items-center justify-center bg-fuchsia-600 text-white rounded-full">
                        {initials}
                      </span>
                    )}
                    <ChevronDown className="w-4 h-4 text-white" />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-black/70 backdrop-blur-lg rounded-lg shadow-md ring-1 ring-white/10 z-50">
                      <div className="px-4 py-3 border-b border-white/10 text-white text-sm">
                        <div className="font-semibold">{fullName}</div>
                        <div className="text-xs text-white/60 mt-1.5">
                          {email}
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-pink-400 hover:bg-white/10 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" /> Keluar
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/masuk"
                    className="text-gray-200 hover:text-white px-4 py-2 rounded-md"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/daftar"
                    className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-700 transition-all duration-300 shadow-lg shadow-fuchsia-600/30"
                  >
                    Daftar Gratis
                  </Link>
                </>
              )}
            </div>

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

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden px-4 pb-4 animate-slide-in-right">
              <div className="space-y-2">
                <Link to="/telusuri" className="block text-white">
                  Telusuri Tools
                </Link>
                <div>
                  <button
                    onClick={() => setKategoriOpen(!kategoriOpen)}
                    className="flex items-center text-white font-medium"
                  >
                    Kategori
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transform transition-transform duration-300 ${
                        kategoriOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {kategoriOpen && (
                    <div className="ml-2 mt-1 space-y-1">
                      {kategoriList.map((item) => (
                        <Link
                          key={item.name}
                          to="/kategori"
                          className="block text-gray-300 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <Link to="/blog" className="block text-white">
                  Blog
                </Link>
                <Link to="/tentang" className="block text-white">
                  Tentang Kami
                </Link>
                <div className="flex flex-col gap-2 pt-2">
                  {!loading && user ? (
                    <>
                      <div className="px-4 py-3 border-b border-white/10 text-white text-sm text-center sm:text-left">
                        <div className="font-semibold">{fullName}</div>
                        <div className="text-xs text-white/60 mt-1.5">
                          {email}
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="text-pink-400 hover:text-pink-300 text-sm"
                      >
                        Keluar
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/masuk"
                        className="text-gray-200 hover:text-white px-4 py-2 rounded-md border border-white/20 text-center"
                      >
                        Masuk
                      </Link>
                      <Link
                        to="/daftar"
                        className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-700 text-center"
                      >
                        Daftar Gratis
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
