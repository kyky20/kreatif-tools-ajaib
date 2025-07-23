import React from "react";
import Navbar from "@/components/ui/navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg"
          >
            <h1 className="text-4xl font-bold mb-8 pt-2 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent leading-normal">
              Tentang Blog KreasIA
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-gray-300 leading-relaxed text-base"
            >
              <p>
                Selamat datang di <strong>KreasIA Blog</strong> — tempat di mana
                ide kreatif, teknologi, dan kecerdasan buatan bertemu. Kami
                percaya bahwa siapa pun bisa berkarya dengan bantuan teknologi,
                dan blog ini adalah bagian dari misi tersebut.
              </p>

              <p>
                Di sini, kamu akan menemukan berbagai artikel menarik seputar:
                <ul className="list-disc list-inside mt-2 space-y-1 text-purple-300">
                  <li>Tips dan trik memaksimalkan AI untuk konten</li>
                  <li>Panduan belajar teknologi modern dengan cara praktis</li>
                  <li>Rekomendasi tools kreatif gratis</li>
                  <li>Studi kasus penggunaan AI oleh kreator lokal</li>
                </ul>
              </p>

              <p>
                Setiap minggu, kami akan menambahkan konten baru yang bisa
                menginspirasi dan membantu kamu untuk berkembang — baik sebagai
                kreator, developer, maupun pelajar.
              </p>

              <p>
                Jangan lupa eksplorasi juga berbagai{" "}
                <Link to="/telusuri" className="text-purple-400 underline">
                  tools AI
                </Link>{" "}
                yang kami sediakan, dirancang untuk membuat proses kreatifmu
                jadi lebih cepat dan menyenangkan.
              </p>

              <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-500">
                Terakhir diperbarui: 15 Juli 2025
              </div>
            </motion.div>
          </motion.div>
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

export default Blog;
