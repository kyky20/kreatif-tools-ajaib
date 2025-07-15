export default function Daftar() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-semibold mb-6">Daftar Gratis</h1>
      <form className="bg-white/10 p-6 rounded-lg backdrop-blur-md space-y-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Nama Lengkap"
          className="w-full p-2 rounded bg-white/5 text-white border border-white/20"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-white/5 text-white border border-white/20"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-white/5 text-white border border-white/20"
        />
        <button type="submit" className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white p-2 rounded">
          Daftar
        </button>
      </form>
    </div>
  );
}