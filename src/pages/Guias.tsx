import { Link } from "react-router-dom";
import { Map, TreePine, Shield, Combine } from "lucide-react";
import { Button } from "@/components/ui/button";

const workshops = [
  {
    id: 1,
    icon: Map,
    title: "Taller 1: Distribución Endémica",
    description: "Identifica y mapea la distribución de especies endémicas en las regiones biogeográficas del Ecuador.",
  },
  {
    id: 2,
    icon: TreePine,
    title: "Taller 2: Amenazas y Deforestación",
    description: "Analiza las tasas de deforestación y su impacto en los hábitats de especies amenazadas.",
  },
  {
    id: 3,
    icon: Shield,
    title: "Taller 3: Límites del SNAP",
    description: "Evalúa la cobertura del Sistema Nacional de Áreas Protegidas y sus vacíos de conservación.",
  },
  {
    id: 4,
    icon: Combine,
    title: "Taller 4: Análisis de Superposición",
    description: "Realiza análisis de superposición espacial entre áreas protegidas, amenazas y biodiversidad.",
  },
];

const Guias = () => {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Guías Didácticas</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Cuatro talleres prácticos diseñados para desarrollar competencias en análisis geoespacial.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {workshops.map((w, i) => (
          <div
            key={w.id}
            className="bg-card rounded-xl p-8 card-shadow hover:card-shadow-hover transition-all duration-300 flex flex-col animate-fade-in"
            style={{ animationDelay: `${0.1 * (i + 1)}s` }}
          >
            <div className="w-12 h-12 rounded-lg bg-secondary/30 flex items-center justify-center mb-5">
              <w.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-3">{w.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{w.description}</p>
            <Link to={`/guias/${w.id}`}>
              <Button className="w-full">Comenzar Taller</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guias;
