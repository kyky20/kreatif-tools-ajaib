import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Telusuri from "./pages/TelusuriTools";
import Kategori from "./pages/Kategori";
import Blog from "./pages/Blog";
import Tentang from "./pages/TentangKami";
import Masuk from "./pages/Masuk";
import Daftar from "./pages/Daftar";
import Profil from "./pages/Profil";
import ResetPassword from "./pages/ResetPassword";
import LupaPassword from "./pages/LupaPassword";


// Wrapper untuk halaman yang hanya bisa diakses jika login
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Masuk />;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" richColors />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/telusuri" element={<Telusuri />} />
            <Route path="/kategori" element={<Kategori />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/tentang" element={<Tentang />} />
            <Route path="/masuk" element={<Masuk />} />
            <Route path="/daftar" element={<Daftar />} />
            <Route path="/lupa-password" element={<LupaPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Hanya bisa diakses jika user login */}
            <Route
              path="/profil"
              element={
                <PrivateRoute>
                  <Profil />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
