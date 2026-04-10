import { Globe, Layers, Database } from "lucide-react";

const topics = [
  {
    icon: Globe,
    title: "¿Qué es un SIG?",
    body: "Un Sistema de Información Geográfica (SIG) es una herramienta que permite capturar, almacenar, analizar y visualizar datos vinculados a una ubicación geográfica. Los SIG combinan mapas con bases de datos para resolver problemas espaciales complejos.",
  },
  {
    icon: Layers,
    title: "Capas y Datos Espaciales",
    body: "Los SIG trabajan con capas de información superpuestas: cobertura vegetal, límites políticos, áreas protegidas, distribución de especies, entre otros. Cada capa aporta una dimensión adicional al análisis.",
  },
  {
    icon: Database,
    title: "Aplicación en Conservación",
    body: "En el ámbito de la conservación biológica, los SIG permiten identificar zonas de alta biodiversidad, detectar amenazas como la deforestación, y planificar estrategias de manejo de áreas protegidas.",
  },
];

const Introduccion = () => {
  return (
    <div className="container py-16 md:py-24 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
        Introducción a los Sistemas de Información Geográfica
      </h1>
      <p className="text-muted-foreground text-lg mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        Fundamentos teóricos para comprender el análisis espacial aplicado a la biodiversidad.
      </p>

      <div className="space-y-8">
        {topics.map((t, i) => (
          <div
            key={t.title}
            className="bg-card rounded-xl p-8 card-shadow animate-fade-in"
            style={{ animationDelay: `${0.15 * (i + 1)}s` }}
          >
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-lg bg-secondary/30 flex items-center justify-center shrink-0">
                <t.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">{t.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{t.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Introduccion;
