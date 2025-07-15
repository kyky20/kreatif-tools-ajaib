// src/data/tools.ts

import {
  Instagram,
  FileText,
  Mail,
  ShoppingBag,
  Video,
  MousePointer,
  Smartphone,
  TrendingUp,
} from "lucide-react";

export const tools = [
 {
    id: "instagram-caption",
    title: "Caption Instagram Generator",
    description: "Buat caption menarik untuk postingan Instagram",
    icon: <Instagram className="h-6 w-6" />,
    emoji: "📝",
    prompt:
      'Buat satu caption Instagram yang menarik, kreatif, dan singkat untuk topik: "{input}". Gunakan gaya bahasa santai dan sisipkan emoji agar lebih menarik.',
    placeholder: "Masukkan topik untuk caption Instagram...",
    inputLabel: "Topik",
    color: "from-pink-500 to-purple-600",
  },
  {
    id: "article-summary",
    title: "Ringkasan Artikel Otomatis",
    description: "Ringkas artikel panjang menjadi poin-poin penting",
    icon: <FileText className="h-6 w-6" />,
    emoji: "📚",
    prompt:
      'Ringkas isi teks berikut menjadi poin-poin penting yang mudah dibaca dan dipahami. Teks: "{input}"',
    placeholder: "Paste artikel yang ingin diringkas...",
    inputLabel: "Artikel",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "product-description",
    title: "Deskripsi Produk Jualan",
    description: "Buat deskripsi produk yang menarik dan menjual",
    icon: <ShoppingBag className="h-6 w-6" />,
    emoji: "🛍️",
    prompt:
      'Buat deskripsi produk singkat dan menarik untuk: "{input}". Fokus pada manfaat utama dan gunakan kalimat persuasif.',
    placeholder: "Masukkan nama produk...",
    inputLabel: "Nama Produk",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "youtube-script",
    title: "Skrip Pembuka Video YouTube",
    description: "Buat pembuka video yang memikat penonton",
    icon: <Video className="h-6 w-6" />,
    emoji: "🎥",
    prompt:
      'Tulis skrip pembuka berdurasi 30 detik untuk video YouTube dengan topik: "{input}". Buat kalimat pembuka yang langsung menarik perhatian.',
    placeholder: "Masukkan topik video YouTube...",
    inputLabel: "Topik Video",
    color: "from-red-500 to-pink-600",
  },
  {
    id: "clickbait-title",
    title: "Judul Clickbait Menarik",
    description: "Generate judul yang menarik perhatian dan berpotensi viral",
    icon: <MousePointer className="h-6 w-6" />,
    emoji: "🧲",
    prompt:
      'Buat satu judul clickbait yang menarik dan relevan untuk topik: "{input}". Judul harus membuat orang ingin tahu lebih lanjut.',
    placeholder: "Masukkan topik untuk judul clickbait...",
    inputLabel: "Topik",
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "tiktok-ideas",
    title: "Ide Konten TikTok Viral",
    description: "Dapatkan ide konten TikTok yang berpotensi viral",
    icon: <Smartphone className="h-6 w-6" />,
    emoji: "📲",
    prompt:
      'Buat satu ide konten TikTok yang berpotensi viral untuk topik: "{input}". Sertakan hook pembuka dan deskripsi singkat.',
    placeholder: "Masukkan niche konten TikTok...",
    inputLabel: "Niche",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "social-ads",
    title: "Judul Iklan Sosial Media",
    description: "Buat judul iklan yang efektif untuk social media",
    icon: <TrendingUp className="h-6 w-6" />,
    emoji: "📈",
    prompt:
      'Buat satu judul iklan yang efektif dan menarik untuk produk atau layanan: "{input}". Gunakan kalimat pendek dan ada call-to-action.',
    placeholder: "Masukkan produk/layanan untuk iklan...",
    inputLabel: "Produk/Layanan",
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "email-improvement",
    title: "Perbaikan Email Bahasa Inggris",
    description: "Perbaiki email agar lebih formal dan profesional",
    icon: <Mail className="h-6 w-6" />,
    emoji: "📧",
    prompt:
      'Perbaiki email berikut agar terdengar lebih profesional dan formal dalam Bahasa Inggris: "{input}".',
    placeholder: "Masukkan draft email dalam bahasa Inggris...",
    inputLabel: "Email Draft",
    color: "from-green-500 to-teal-600",
  },
];
