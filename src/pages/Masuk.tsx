import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Masuk = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Gagal login: " + error.message);
    } else {
      toast.success("Berhasil login!");
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg"
        >
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
            Masuk ke KreasIA
          </h1>

          <motion.form
            onSubmit={handleLogin}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm text-gray-300">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              <div className="text-right mt-2 text-sm">
                <Link
                  to="/lupa-password"
                  className="text-pink-400 hover:underline"
                >
                  Lupa password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Masuk...</span>
                </div>
              ) : (
                "Masuk"
              )}
            </Button>
          </motion.form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Belum punya akun?{" "}
            <Link to="/daftar" className="text-pink-400 hover:underline">
              Daftar di sini
            </Link>
          </p>
        </motion.div>
      </main>

      <footer className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">© 2025 KreasIA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Masuk;
