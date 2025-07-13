import React, { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Lottie from "lottie-react";
import aiAnimation from "@/assets/animations/ai.json";
import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Instagram,
  FileText,
  Mail,
  ShoppingBag,
  Video,
  MousePointer,
  Smartphone,
  TrendingUp,
  Copy,
  Wand2,
  ArrowLeft,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  emoji: string;
  prompt: string;
  placeholder: string;
  inputLabel: string;
  color: string;
}

const tools: Tool[] = [
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

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!selectedTool || !input.trim()) {
      toast({
        title: "Error",
        description: "Pilih tool dan masukkan input terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const finalPrompt = selectedTool.prompt.replace("{input}", input);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: finalPrompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (!data || !Array.isArray(data.candidates)) {
        throw new Error("Format respons Gemini tidak sesuai.");
      }
      const result =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "Tidak ada hasil dari Gemini.";

      setOutput(result);

      toast({
        title: "Sukses!",
        description: "Konten berhasil dihasilkan oleh AI.",
      });
    } catch (error) {
      console.error("API Error:", error);
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat koneksi ke API Gemini.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: "Tersalin!",
      description: "Hasil telah disalin ke clipboard.",
    });
  };

  const handleReset = () => {
    setSelectedTool(null);
    setInput("");
    setOutput("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>
          <div className="relative container mx-auto px-4 pt-24 pb-16 text-center">
            <AnimatePresence>
              {!selectedTool && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 mb-4 justify-center flex-wrap">
                    <img
                      src="/icon.png"
                      alt="Icon"
                      className="h-12 w-12 text-purple-400"
                    />
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      KreasIA
                    </h1>
                  </div>
                  <div className="flex justify-center mt-4 mb-6">
                    <Lottie
                      animationData={aiAnimation}
                      loop={true}
                      className="w-40 h-40 md:w-48 md:h-48"
                    />
                  </div>
                  <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                    Kumpulan tools AI untuk membantu content creator, marketer,
                    dan entrepreneur Indonesia
                  </p>
                  <Badge
                    variant="secondary"
                    className="text-sm px-4 py-2 bg-white/10 text-white border-white/20"
                  >
                    8 Tools Powerful • 100% Gratis
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-24">
          <AnimatePresence mode="wait">
            {!selectedTool ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    <Card
                      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10"
                      onClick={() => setSelectedTool(tool)}
                    >
                      <CardHeader className="text-center">
                        <div
                          className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <span className="text-2xl">{tool.emoji}</span>
                        </div>
                        <CardTitle className="text-white text-lg">
                          {tool.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 text-white border-0 flex items-center justify-center gap-2`}
                        >
                          <Lottie
                            animationData={aiAnimation}
                            loop
                            autoplay
                            className="w-6 h-6"
                          />
                          Mulai Generate
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                key="input-output"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto"
              >
                <div className="max-w-4xl mx-auto">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full bg-gradient-to-r ${selectedTool.color} flex items-center justify-center`}
                          >
                            <span className="text-xl">
                              {selectedTool.emoji}
                            </span>
                          </div>
                          <div>
                            <CardTitle className="text-white text-2xl">
                              {selectedTool.title}
                            </CardTitle>
                            <CardDescription className="text-gray-300">
                              {selectedTool.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          onClick={handleReset}
                          className="border-white/20 bg-transparent text-white hover:bg-white/10 flex items-center gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" /> Kembali
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white">Input</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-300 mb-2 block">
                            {selectedTool.inputLabel}
                          </label>
                          <Textarea
                            placeholder={selectedTool.placeholder}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="min-h-[200px] bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <Button
                          onClick={handleGenerate}
                          disabled={loading || !input.trim()}
                          className={`w-full bg-gradient-to-r ${selectedTool.color} hover:opacity-90 text-white border-0 disabled:opacity-50 flex items-center justify-center gap-2`}
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Lottie
                                animationData={aiAnimation}
                                loop
                                autoplay
                                className="w-6 h-6"
                              />
                              Generate Konten
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white">Output</CardTitle>
                          {output && !loading && (
                            <Button
                              onClick={handleCopy}
                              variant="outline"
                              size="sm"
                              className="border-white/20 bg-transparent text-white hover:bg-white/10"
                            >
                              <Copy className="h-4 w-4 mr-2" /> Copy
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-black/20 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                          {loading && (
                            <div className="text-gray-400">
                              Sedang memproses...
                            </div>
                          )}
                          {!loading && !output && (
                            <div className="text-gray-400">
                              Hasil akan muncul di sini..
                            </div>
                          )}
                          {output && (
                            <pre className="text-gray-300 whitespace-pre-wrap text-sm">
                              {output}
                            </pre>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

export default Index;
