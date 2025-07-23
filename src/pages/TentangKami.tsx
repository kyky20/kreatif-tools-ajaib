import React from "react";
import Navbar from "@/components/ui/navbar";
import { motion } from "framer-motion";

const TentangKami = () => {
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
            <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent leading-normal">
              Tentang Kami
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 space-y-6 text-gray-300 leading-relaxed text-base"
            >
              <p>
                <strong>KreasIA</strong> adalah sebuah platform digital yang
                lahir dari semangat kolaborasi antara kreativitas dan teknologi.
                Kami percaya bahwa kecerdasan buatan bukanlah pengganti manusia,
                melainkan alat untuk memperluas batas imajinasi dan
                produktivitas.
              </p>

              <p>
                Misi kami adalah menyediakan akses ke berbagai tools berbasis
                AI, panduan, dan sumber daya edukatif bagi para kreator,
                pelajar, dan profesional di Indonesia agar bisa berkarya lebih
                cepat, lebih cerdas, dan lebih berdampak.
              </p>

              <p>
                KreasIA dibangun dengan visi: <em>"Teknologi untuk Semua."</em>{" "}
                Kami ingin membuktikan bahwa AI bisa menjadi sahabat sehari-hari
                siapa pun - bukan hanya milik perusahaan besar atau ahli
                teknologi.
              </p>

              <p>
                Kami juga berkomitmen untuk terus mengembangkan fitur baru,
                menghadirkan konten yang bermanfaat, dan menciptakan ruang
                digital yang inklusif dan inspiratif.
              </p>

              <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-500">
                Versi 1.0 • Terakhir diperbarui: 15 Juli 2025
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

export default TentangKami;
