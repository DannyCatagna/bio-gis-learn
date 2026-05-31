import { Link } from "react-router-dom";
import { Map, TreePine, Shield, Combine } from "lucide-react";
import { Button } from "@/components/ui/button";

const workshops = [
  {
    id: 1,
    icon: Map,
    unidad: "Unidad 2 · Ecuador Megadiverso",
    title: "Guía 1: Modelamiento de Nichos y Distribución de Especies Endémicas",
    description: "Tipifica la distribución de la flora y fauna endémica correlacionándola con variables ambientales.",
  },
  {
    id: 2,
    icon: TreePine,
    unidad: "Unidad 2 · Ecuador Megadiverso",
    title: "Guía 2: Análisis Temporal de Amenazas y Deforestación",
    description: "Investiga espaciotemporalmente la pérdida de biodiversidad mediante imágenes de satélite.",
  },
  {
    id: 3,
    icon: Shield,
    unidad: "Unidad 3 · Conservación en el Ecuador",
    title: "Guía 3: Cartografía y Límites del SNAP",
    description: "Categoriza las estrategias de manejo de las áreas protegidas del Ecuador.",
  },
  {
    id: 4,
    icon: Combine,
    unidad: "Unidad 3 · Conservación en el Ecuador",
    title: "Guía 4: Superposición Espacial y Conservación Comunitaria",
    description: "Evalúa la interacción entre conservación in situ y presiones antrópicas locales.",
  },
];

const Guias = () => {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Guías de Práctica</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Hojas de trabajo digitales alineadas al sílabo de Biodiversidad del Ecuador (UNACH).
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
            <p className="text-xs font-medium text-primary uppercase tracking-wider mb-2">{w.unidad}</p>
            <h3 className="text-lg font-semibold mb-3 leading-snug">{w.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{w.description}</p>
            <Link to={`/guias/${w.id}`}>
              <Button className="w-full">Abrir Guía</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guias;
