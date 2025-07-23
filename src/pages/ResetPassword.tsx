import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [sessionValid, setSessionValid] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      supabase.auth
        .getSessionFromUrl({ storeSession: true })
        .then(() => {
          toast.success("Token valid, silakan atur password baru.");
          setSessionValid(true);
        })
        .catch(() => {
          toast.error("Token tidak valid atau sudah kadaluarsa.");
          setSessionValid(false);
        })
        .finally(() => {
          setIsLoadingSession(false);
        });
    } else {
      setIsLoadingSession(false);
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Password tidak sama");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast.error("Gagal mengatur password baru");
    } else {
      toast.success("Password berhasil diubah. Silakan login kembali.");
      navigate("/masuk");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 text-white">
      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-16">
        <form
          onSubmit={handleResetPassword}
          className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg space-y-6"
        >
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
            Atur Password Baru
          </h1>

          {/* Input Password Baru */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Password Baru
            </label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                placeholder="Password baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowNew((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Input Konfirmasi Password */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Ulangi Password
            </label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Ulangi password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
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
                <span>Menyimpan...</span>
              </div>
            ) : (
              "Simpan Password Baru"
            )}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default ResetPassword;
