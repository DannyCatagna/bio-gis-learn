import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import { GuiasProvider } from "@/context/GuiasContext";
import Index from "./pages/Index";
import Introduccion from "./pages/Introduccion";
import Guias from "./pages/Guias";
import GuiaDetalle from "./pages/GuiaDetalle";
import Evaluacion from "./pages/Evaluacion";
import MapaInteractivo from "./pages/MapaInteractivo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GuiasProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/introduccion" element={<Introduccion />} />
                <Route path="/guias" element={<Guias />} />
                <Route path="/guias/:id" element={<GuiaDetalle />} />
                <Route path="/mapa" element={<MapaInteractivo />} />
                <Route path="/areas-protegidas" element={<Navigate to="/mapa" replace />} />
                <Route path="/evaluacion" element={<Evaluacion />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </GuiasProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
