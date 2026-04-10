import { Link } from "react-router-dom";
import { MapPin, Satellite, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: MapPin,
    title: "Análisis Espacial",
    description: "Aprende a identificar patrones de distribución de especies endémicas usando herramientas SIG.",
  },
  {
    icon: Satellite,
    title: "Datos Satelitales",
    description: "Interpreta imágenes satelitales y datos de cobertura vegetal para evaluar ecosistemas.",
  },
  {
    icon: FileSearch,
    title: "Resolución de Casos",
    description: "Aplica tus conocimientos en escenarios reales de conservación en áreas protegidas del Ecuador.",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-gradient py-24 md:py-32">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground max-w-3xl mx-auto leading-tight animate-fade-in">
            Plataforma Didáctica SIG — Conservación de la Biodiversidad
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Guías interactivas para el análisis espacial de áreas protegidas en Ecuador.
          </p>
          <Link to="/guias" className="inline-block mt-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" variant="secondary" className="text-base font-semibold px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              Explorar Guías
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-16">
            ¿Qué aprenderás?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-card rounded-xl p-8 card-shadow hover:card-shadow-hover transition-shadow duration-300 text-center animate-fade-in"
                style={{ animationDelay: `${0.1 * (i + 1)}s` }}
              >
                <div className="w-14 h-14 rounded-full bg-secondary/30 flex items-center justify-center mx-auto mb-5">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
