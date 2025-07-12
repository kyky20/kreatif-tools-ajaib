
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Instagram, 
  FileText, 
  Mail, 
  ShoppingBag, 
  Video, 
  MousePointer, 
  Smartphone, 
  TrendingUp,
  Sparkles,
  Copy,
  Download,
  Wand2
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
    id: 'instagram-caption',
    title: 'Caption Instagram Generator',
    description: 'Buat caption menarik untuk postingan Instagram',
    icon: <Instagram className="h-6 w-6" />,
    emoji: '📝',
    prompt: 'Buatkan tiga caption Instagram yang singkat, menarik, dan kreatif berdasarkan topik berikut: "{input}". Gunakan gaya bahasa yang santai, ringan, dan mudah dipahami. Sertakan emoji untuk menambah daya tarik, dan pastikan setiap caption tidak lebih dari dua kalimat. Tujuannya adalah agar caption tersebut menarik perhatian audiens dan mendorong mereka untuk menyukai atau membagikannya.',
    placeholder: 'Masukkan topik untuk caption Instagram...',
    inputLabel: 'Topik',
    color: 'from-pink-500 to-purple-600'
  },
  {
    id: 'article-summary',
    title: 'Ringkasan Artikel Otomatis',
    description: 'Ringkas artikel panjang menjadi poin-poin penting',
    icon: <FileText className="h-6 w-6" />,
    emoji: '📚',
    prompt: 'Tolong ringkas teks berikut menjadi poin-poin penting yang mudah dibaca dan dipahami: "{input}". Gunakan bullet point untuk setiap ide utama. Jangan mengulang isi secara mentah, tapi olah agar lebih ringkas dan jelas. Pastikan ringkasan tetap akurat, efisien, dan cocok untuk dibaca cepat oleh orang sibuk.',
    placeholder: 'Paste artikel yang ingin diringkas...',
    inputLabel: 'Artikel',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'email-improvement',
    title: 'Perbaikan Email Bahasa Inggris',
    description: 'Perbaiki email agar lebih profesional',
    icon: <Mail className="h-6 w-6" />,
    emoji: '📧',
    prompt: 'Perbaiki email berikut agar terdengar lebih profesional, sopan, dan sesuai dengan standar bahasa Inggris formal: "{input}". Pastikan tidak ada kesalahan tata bahasa, susunan kalimat dibuat lebih rapi, dan keseluruhan isi tetap mempertahankan maksud aslinya. Hasil akhir harus cocok untuk digunakan dalam konteks pekerjaan atau komunikasi resmi.',
    placeholder: 'Masukkan draft email dalam bahasa Inggris...',
    inputLabel: 'Email Draft',
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 'product-description',
    title: 'Deskripsi Produk Jualan',
    description: 'Buat deskripsi produk yang menarik dan menjual',
    icon: <ShoppingBag className="h-6 w-6" />,
    emoji: '🛍️',
    prompt: 'Tolong buat deskripsi produk yang menarik dan menjual untuk produk berikut: "{input}". Gunakan gaya bahasa promosi yang singkat, jelas, dan persuasif. Sertakan manfaat utama dari produk dan tutup dengan kalimat ajakan (call-to-action) seperti "Beli sekarang" atau "Coba hari ini". Pastikan pembaca langsung tertarik.',
    placeholder: 'Masukkan nama produk...',
    inputLabel: 'Nama Produk',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'youtube-script',
    title: 'Skrip Pembuka Video YouTube',
    description: 'Buat pembuka video yang memikat penonton',
    icon: <Video className="h-6 w-6" />,
    emoji: '🎥',
    prompt: 'Buatkan skrip pembuka video YouTube dengan durasi sekitar 30 detik untuk topik: "{input}". Gunakan gaya bahasa santai, berenergi, dan langsung memikat penonton sejak kalimat pertama. Tujuannya adalah membuat penonton tertarik dan mau menonton video sampai habis.',
    placeholder: 'Masukkan topik video YouTube...',
    inputLabel: 'Topik Video',
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'clickbait-title',
    title: 'Judul Clickbait Menarik',
    description: 'Generate judul yang menarik perhatian',
    icon: <MousePointer className="h-6 w-6" />,
    emoji: '🧲',
    prompt: 'Berikan lima ide judul yang menarik, clickbait namun tetap relevan untuk topik: "{input}". Setiap judul harus membuat orang penasaran untuk mengklik, tanpa terlalu berlebihan atau menyesatkan. Gunakan gaya yang cocok untuk konten YouTube atau blog viral.',
    placeholder: 'Masukkan topik untuk judul clickbait...',
    inputLabel: 'Topik',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'tiktok-ideas',
    title: 'Ide Konten TikTok Viral',
    description: 'Dapatkan ide konten TikTok yang berpotensi viral',
    icon: <Smartphone className="h-6 w-6" />,
    emoji: '📲',
    prompt: 'Buatkan lima ide konten TikTok yang berpotensi viral untuk niche: "{input}". Sertakan deskripsi singkat untuk masing-masing ide, dan tambahkan contoh hook (kalimat pembuka) yang bisa langsung menarik perhatian dalam 3 detik pertama. Gaya bahasa harus santai dan sesuai dengan target Gen Z.',
    placeholder: 'Masukkan niche konten TikTok...',
    inputLabel: 'Niche',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'social-ads',
    title: 'Judul Iklan Sosial Media',
    description: 'Buat judul iklan yang efektif untuk social media',
    icon: <TrendingUp className="h-6 w-6" />,
    emoji: '📈',
    prompt: 'Buat tiga judul iklan yang menarik dan efektif untuk media sosial (Facebook atau Instagram) dengan topik atau produk: "{input}". Gunakan kalimat pendek dan mengandung ajakan bertindak (call-to-action) seperti "Coba Sekarang" atau "Dapatkan Gratis". Judul harus mampu menghentikan scroll dan menarik perhatian pengguna.',
    placeholder: 'Masukkan produk/layanan untuk iklan...',
    inputLabel: 'Produk/Layanan',
    color: 'from-indigo-500 to-purple-600'
  }
];

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!selectedTool || !input.trim()) {
      toast({
        title: "Error",
        description: "Pilih tool dan masukkan input terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const prompt = selectedTool.prompt.replace('{input}', input);
      setOutput(`Generated content for: ${selectedTool.title}\n\nPrompt yang digunakan:\n${prompt}\n\n[Dalam implementasi nyata, ini akan terhubung dengan AI API untuk menghasilkan konten sesuai prompt]`);
      setLoading(false);
      toast({
        title: "Berhasil!",
        description: "Konten telah di-generate",
      });
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Hasil telah disalin ke clipboard",
    });
  };

  const handleReset = () => {
    setSelectedTool(null);
    setInput('');
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Tools Indonesia
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Kumpulan tools AI untuk membantu content creator, marketer, dan entrepreneur Indonesia
          </p>
          <Badge variant="secondary" className="text-sm px-4 py-2 bg-white/10 text-white border-white/20">
            8 Tools Powerful • 100% Gratis
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {!selectedTool ? (
          // Tools Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Card 
                key={tool.id}
                className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10"
                onClick={() => setSelectedTool(tool)}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{tool.emoji}</span>
                  </div>
                  <CardTitle className="text-white text-lg">{tool.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 text-white border-0`}
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    Mulai Generate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Selected Tool Interface
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${selectedTool.color} flex items-center justify-center`}>
                      <span className="text-xl">{selectedTool.emoji}</span>
                    </div>
                    <div>
                      <CardTitle className="text-white text-2xl">{selectedTool.title}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {selectedTool.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleReset} className="border-white/20 text-white hover:bg-white/10">
                    Kembali
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
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
                    className={`w-full bg-gradient-to-r ${selectedTool.color} hover:opacity-90 text-white border-0`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Konten
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Output Section */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Output</CardTitle>
                    {output && (
                      <Button
                        onClick={handleCopy}
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {output ? (
                    <div className="bg-black/20 rounded-lg p-4 min-h-[200px]">
                      <pre className="text-gray-300 whitespace-pre-wrap text-sm">
                        {output}
                      </pre>
                    </div>
                  ) : (
                    <div className="min-h-[200px] flex items-center justify-center text-gray-400">
                      Hasil akan muncul di sini setelah generate
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">
            © 2024 AI Tools Indonesia. Dibuat dengan ❤️ untuk komunitas creator Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
