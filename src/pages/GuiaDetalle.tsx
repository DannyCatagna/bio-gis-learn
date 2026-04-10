import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Target, Route, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

const workshopData: Record<string, { title: string; description: string; ficha: string; reto: string; pasos: string[]; cierre: string }> = {
  "1": {
    title: "Taller 1: Distribución Endémica",
    description: "Mapeo de especies endémicas del Ecuador",
    ficha: "Objetivo: Localizar y representar geográficamente la distribución de especies endémicas en las regiones biogeográficas del Ecuador usando capas vectoriales y bases de datos de biodiversidad.",
    reto: "¿Cuáles regiones del Ecuador concentran la mayor cantidad de especies endémicas y cómo se relacionan con las áreas protegidas existentes?",
    pasos: [
      "Cargar la capa de regiones biogeográficas del Ecuador en el visor SIG.",
      "Importar la base de datos de especies endémicas y vincularla con las coordenadas geográficas.",
      "Generar un mapa de densidad de especies endémicas por región.",
    ],
    cierre: "Analiza críticamente si las áreas protegidas actuales cubren las zonas de mayor endemismo. Identifica vacíos de conservación.",
  },
  "2": {
    title: "Taller 2: Amenazas y Deforestación",
    description: "Análisis multitemporal de cobertura vegetal",
    ficha: "Objetivo: Evaluar las tasas de deforestación entre 2000 y 2020 en zonas de amortiguamiento de áreas protegidas mediante el análisis de imágenes satelitales.",
    reto: "¿Cómo ha cambiado la cobertura vegetal en las zonas de amortiguamiento del Parque Nacional Yasuní en las últimas dos décadas?",
    pasos: [
      "Descargar imágenes de cobertura vegetal de Global Forest Watch para los años 2000 y 2020.",
      "Delimitar las zonas de amortiguamiento del área protegida seleccionada.",
      "Calcular la diferencia de cobertura vegetal y generar un mapa de cambio.",
    ],
    cierre: "Elabora conclusiones sobre los principales factores de deforestación y propón estrategias de mitigación basadas en evidencia espacial.",
  },
  "3": {
    title: "Taller 3: Límites del SNAP",
    description: "Evaluación del Sistema Nacional de Áreas Protegidas",
    ficha: "Objetivo: Evaluar la representatividad ecosistémica del SNAP mediante análisis de cobertura y vacíos de conservación.",
    reto: "¿Qué ecosistemas del Ecuador continental se encuentran subrepresentados dentro del Sistema Nacional de Áreas Protegidas?",
    pasos: [
      "Cargar los límites oficiales de las áreas protegidas del SNAP.",
      "Superponer la capa de ecosistemas del Ecuador para identificar intersecciones.",
      "Calcular el porcentaje de cada ecosistema dentro de áreas protegidas.",
    ],
    cierre: "Determina qué ecosistemas requieren mayor protección y propón posibles ampliaciones o nuevas áreas protegidas.",
  },
  "4": {
    title: "Taller 4: Análisis de Superposición",
    description: "Superposición espacial de variables de conservación",
    ficha: "Objetivo: Realizar un análisis de superposición espacial entre áreas protegidas, zonas de deforestación y distribución de especies prioritarias.",
    reto: "¿Dónde se concentran las mayores presiones sobre la biodiversidad dentro del territorio ecuatoriano?",
    pasos: [
      "Integrar capas de áreas protegidas, deforestación y distribución de especies prioritarias.",
      "Ejecutar un análisis de superposición (overlay) para identificar zonas de conflicto.",
      "Clasificar las zonas resultantes según nivel de prioridad de conservación.",
    ],
    cierre: "Elabora un mapa final de prioridades de conservación y argumenta las decisiones tomadas con base en los datos espaciales.",
  },
};

const sidebarSections = [
  { icon: BookOpen, label: "Ficha Técnica", key: "ficha" as const },
  { icon: Target, label: "Reto Geoespacial", key: "reto" as const },
  { icon: Route, label: "Ruta de Navegación", key: "pasos" as const },
  { icon: PenLine, label: "Cierre Analítico", key: "cierre" as const },
];

const GuiaDetalle = () => {
  const { id } = useParams();
  const data = workshopData[id || "1"];

  if (!data) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Taller no encontrado.</p>
        <Link to="/guias" className="mt-4 inline-block">
          <Button variant="outline">Volver a Guías</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="lg:w-[30%] border-b lg:border-b-0 lg:border-r bg-card overflow-y-auto">
        <div className="p-6 lg:p-8 space-y-6">
          <Link to="/guias" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver a Guías
          </Link>

          <h1 className="text-xl font-bold">{data.title}</h1>
          <p className="text-sm text-muted-foreground">{data.description}</p>

          <div className="space-y-6 pt-2">
            {sidebarSections.map((section) => (
              <div key={section.key}>
                <div className="flex items-center gap-2 mb-2">
                  <section.icon className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold">{section.label}</h3>
                </div>
                {section.key === "pasos" ? (
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground leading-relaxed pl-1">
                    {data.pasos.map((paso, i) => (
                      <li key={i}>{paso}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {data[section.key]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main viewer */}
      <main className="flex-1 p-6 lg:p-10 flex items-center justify-center bg-muted/30">
        <div className="w-full max-w-4xl aspect-video rounded-xl border-2 border-dashed border-border bg-card flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Visor SIG Interactivo</h2>
            <p className="text-muted-foreground text-sm">(Google Earth / MAATE)</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuiaDetalle;
