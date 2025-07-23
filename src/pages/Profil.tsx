import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/masuk");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("name, email")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Gagal ambil profil:", error.message);
      } else {
        setEmail(data?.email || user.email || "");
        setName(data?.name || "");
      }

      setLoading(false);
    };

    getProfile();
  }, [navigate]);

  const handleSave = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      name,
      email,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      alert("Gagal update profil: " + error.message);
    } else {
      alert("Profil berhasil diperbarui!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-white px-4 py-12">
      <div className="max-w-xl mx-auto bg-black/30 backdrop-blur-md p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Profil Saya</h2>

        {loading ? (
          <p className="text-center">Memuat data...</p>
        ) : (
          <>
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full p-3 rounded-md bg-slate-800 text-gray-400 border border-gray-700"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-md bg-slate-800 text-white border border-gray-700"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 px-4 py-3 rounded-lg transition-all"
            >
              Simpan Perubahan
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profil;
