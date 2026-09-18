import { useState } from "react";
import {
  BookOpen,
  Check,
  Circle,
  ClipboardList,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const temasUnidadDos = [
  "Tema 2.1: Diversidad de las Especies (Características ambientales y generales del Ecuador).",
  "Tema 2.2: Flora y Fauna del Ecuador (Fauna y sus ecosistemas, Áreas protegidas).",
  "Tema 2.3: Especies Endémicas (Flora ecosistémica y Manejo de cuencas hídricas).",
  "Tema 2.4: Extinción de las Especies (Principales amenazas para la pérdida de la biodiversidad).",
];

const temasUnidadTres = [
  "Tema 3.1: Ámbito legal y normativa ecuatoriana (Tratamiento constitucional y desarrollo normativo).",
  "Tema 3.2: Sistema Nacional de Áreas Protegidas - SNAP (Ordenamiento territorial y estrategias de manejo).",
  "Tema 3.3: Extinción de especies (Estrategias de conservación in situ y ex situ).",
  "Tema 3.4: Estrategias y manejo de conservación (Clasificación, estructura del SNAP y el rol de las comunidades).",
];

const guias = [
  "Guía 1: Modelamiento de Nichos y Distribución Espacial de Especies Endémicas en el Ecuador.",
  "Guía 2: Análisis Temporal (Timelapse) de las Amenazas a la Biodiversidad y Deforestación.",
  "Guía 3: Análisis Cartográfico de los Límites y Cobertura del Sistema Nacional de Áreas Protegidas.",
  "Guía 4: Análisis de Superposición Espacial: Conflictos Territoriales y Zonas de Amortiguamiento Community-Led.",
];

interface TopicGridProps {
  topics: string[];
  accent: "jungle" | "ocean";
}

const TopicGrid = ({ topics, accent }: TopicGridProps) => (
  <div className="grid gap-6 lg:grid-cols-2">
    {topics.map((topic, index) => (
      <Card
        key={topic}
        className={cn(
          "min-h-52 overflow-hidden border bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md",
          accent === "jungle" ? "border-jungle/25" : "border-ocean/25",
        )}
      >
        <div className={cn("h-1.5", accent === "jungle" ? "bg-jungle" : "bg-ocean")} />
        <CardHeader className="gap-6 p-7 sm:p-8">
          <div
            className={cn(
              "grid h-12 w-12 place-items-center rounded-md text-sm font-bold",
              accent === "jungle"
                ? "bg-jungle/10 text-jungle"
                : "bg-ocean/10 text-ocean",
            )}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <CardTitle className="text-lg leading-relaxed sm:text-xl">{topic}</CardTitle>
        </CardHeader>
      </Card>
    ))}
  </div>
);

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [completedGuides, setCompletedGuides] = useState<number[]>([]);

  const toggleGuide = (guideIndex: number) => {
    setCompletedGuides((current) =>
      current.includes(guideIndex)
        ? current.filter((index) => index !== guideIndex)
        : [...current, guideIndex],
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background">
      <DashboardSidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />

      <main className="min-w-0 flex-1">
        <header className="border-b bg-card px-5 py-10 sm:px-8 md:px-12 md:py-14">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-jungle text-jungle-foreground">
                <Leaf className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase text-jungle">BIOSIG</p>
                <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Panel pedagógico</h1>
              </div>
            </div>
          </div>
        </header>

        <Tabs defaultValue="unidad-2" className="w-full">
          <div className="sticky top-16 z-20 border-b bg-card/95 px-4 py-4 backdrop-blur sm:px-8 md:px-12">
            <TabsList className="mx-auto grid h-auto max-w-6xl grid-cols-1 gap-2 bg-muted p-2 md:grid-cols-3">
              <TabsTrigger
                value="unidad-2"
                className="min-h-14 whitespace-normal px-4 py-3 text-left leading-snug data-[state=active]:bg-jungle data-[state=active]:text-jungle-foreground"
              >
                <BookOpen className="h-5 w-5 shrink-0" aria-hidden="true" />
                Unidad 2: Ecuador, País Megadiverso
              </TabsTrigger>
              <TabsTrigger
                value="unidad-3"
                className="min-h-14 whitespace-normal px-4 py-3 text-left leading-snug data-[state=active]:bg-ocean data-[state=active]:text-ocean-foreground"
              >
                <ShieldCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
                Unidad 3: Conservación de la Biodiversidad en el Ecuador
              </TabsTrigger>
              <TabsTrigger
                value="guias"
                className="min-h-14 whitespace-normal px-4 py-3 text-left leading-snug data-[state=active]:bg-paramo data-[state=active]:text-paramo-foreground"
              >
                <ClipboardList className="h-5 w-5 shrink-0" aria-hidden="true" />
                Guías Didácticas (Hojas de Trabajo SIG)
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="unidad-2" className="m-0 bg-background focus-visible:ring-jungle">
            <section className="px-5 py-14 sm:px-8 md:px-12 md:py-20" aria-labelledby="unidad-dos-title">
              <div className="mx-auto max-w-6xl">
                <div className="mb-10 max-w-4xl border-l-4 border-jungle pl-5 md:mb-14 md:pl-7">
                  <p className="text-sm font-semibold uppercase text-jungle">Unidad 2</p>
                  <h2 id="unidad-dos-title" className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
                    Ecuador, País Megadiverso
                  </h2>
                </div>
                <TopicGrid topics={temasUnidadDos} accent="jungle" />
              </div>
            </section>
          </TabsContent>

          <TabsContent value="unidad-3" className="m-0 bg-muted/60 focus-visible:ring-ocean">
            <section className="px-5 py-14 sm:px-8 md:px-12 md:py-20" aria-labelledby="unidad-tres-title">
              <div className="mx-auto max-w-6xl">
                <div className="mb-10 max-w-4xl border-l-4 border-ocean pl-5 md:mb-14 md:pl-7">
                  <p className="text-sm font-semibold uppercase text-ocean">Unidad 3</p>
                  <h2 id="unidad-tres-title" className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
                    Conservación de la Biodiversidad en el Ecuador
                  </h2>
                </div>
                <TopicGrid topics={temasUnidadTres} accent="ocean" />
              </div>
            </section>
          </TabsContent>

          <TabsContent value="guias" className="m-0 bg-background focus-visible:ring-paramo">
            <section className="px-5 py-14 sm:px-8 md:px-12 md:py-20" aria-labelledby="guias-title">
              <div className="mx-auto max-w-6xl">
                <div className="mb-10 flex flex-col gap-5 border-l-4 border-paramo pl-5 sm:flex-row sm:items-end sm:justify-between md:mb-14 md:pl-7">
                  <div>
                    <p className="text-sm font-semibold uppercase text-paramo">Retos constructivistas</p>
                    <h2 id="guias-title" className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
                      Guías Didácticas (Hojas de Trabajo SIG)
                    </h2>
                  </div>
                  <p className="text-sm font-semibold text-paramo" aria-live="polite">
                    {completedGuides.length} de {guias.length} completadas
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {guias.map((guia, index) => {
                    const completed = completedGuides.includes(index);

                    return (
                      <Card
                        key={guia}
                        className={cn(
                          "flex min-h-64 flex-col overflow-hidden border-paramo/30 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                          completed && "border-paramo bg-paramo/5",
                        )}
                      >
                        <div className="h-1.5 bg-paramo" />
                        <CardHeader className="flex-1 gap-6 p-7 sm:p-8">
                          <div className="flex items-center justify-between gap-4">
                            <div className="grid h-12 w-12 place-items-center rounded-md bg-paramo/10 text-paramo">
                              <ClipboardList className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <span className="text-sm font-bold text-paramo">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <CardTitle className="text-lg leading-relaxed sm:text-xl">{guia}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-7 pt-0 sm:p-8 sm:pt-0">
                          <Button
                            type="button"
                            variant={completed ? "outline" : "default"}
                            onClick={() => toggleGuide(index)}
                            aria-pressed={completed}
                            className={cn(
                              "w-full border-paramo",
                              completed
                                ? "text-paramo hover:bg-paramo/10 hover:text-paramo"
                                : "bg-paramo text-paramo-foreground hover:bg-paramo/90",
                            )}
                          >
                            {completed ? (
                              <Check className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <Circle className="h-4 w-4" aria-hidden="true" />
                            )}
                            {completed ? "Completada" : "Marcar como completada"}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;