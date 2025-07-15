import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Lottie from "lottie-react";
import NotFoundAnim from "@/assets/animations/404.json";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4">
      <div className="text-center max-w-lg">
        <div className="w-72 mx-auto mb-6">
          <Lottie animationData={NotFoundAnim} loop={true} />
        </div>
        {/* <h1 className="text-5xl font-bold mb-4">404</h1> */}
        <p className="text-lg text-gray-300 mb-6">
          Oops! Halaman yang kamu cari tidak ditemukan.
        </p>
        <a
          href="/"
          className="inline-block bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-2 rounded-full font-medium"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
};

export default NotFound;
