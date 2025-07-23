import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LupaPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:8080/reset-password",
    });

    if (error) {
      toast.error("Gagal mengirim email reset password.");
    } else {
      toast.success("Link reset berhasil dikirim ke email.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 text-white">
      <motion.form
        onSubmit={handleResetPassword}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg space-y-6"
      >
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
          Reset Password
        </h1>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Email</label>
          <Input
            type="email"
            placeholder="Email kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Mengirim...</span>
            </div>
          ) : (
            "Kirim Link Reset"
          )}
        </Button>

        <div className="text-sm text-center mt-4">
          <Link to="/" className="text-purple-400 hover:underline">
            Kembali
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default LupaPassword;
