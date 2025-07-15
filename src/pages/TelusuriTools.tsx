import React, { useState } from "react";
import Navbar from "@/components/ui/navbar";
import { tools } from "@/data/tools";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Telusuri = () => {
  const [selectedTool, setSelectedTool] = useState(null);
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
      const result =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "Tidak ada hasil dari Gemini.";
      setOutput(result);

      toast({
        title: "Sukses!",
        description: "Konten berhasil dihasilkan oleh AI.",
      });
    } catch (error) {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto px-4 pb-10">
          {!selectedTool ? (
            <>
              <h1 className="text-center mb-12 text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-900 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                Tools AI
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tools.map((tool) => (
                  <Card
                    key={tool.id}
                    className="group cursor-pointer bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 hover:shadow-lg transition"
                    onClick={() => setSelectedTool(tool)}
                  >
                    <CardHeader className="text-center">
                      <div
                        className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4`}
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
                        className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 text-white border-0`}
                      >
                        Mulai Gunakan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${selectedTool.color} flex items-center justify-center`}
                      >
                        <span className="text-xl">{selectedTool.emoji}</span>
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
                {/* Input Card */}
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
                      className={`w-full bg-gradient-to-r ${selectedTool.color} hover:opacity-90 text-white border-0 disabled:opacity-50`}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>Generate Konten</>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Output Card */}
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
                      {loading ? (
                        <div className="text-gray-400">Sedang memproses...</div>
                      ) : !output ? (
                        <div className="text-gray-400">
                          Hasil akan muncul di sini..
                        </div>
                      ) : (
                        <pre className="text-gray-300 whitespace-pre-wrap text-sm">
                          {output}
                        </pre>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
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

export default Telusuri;
