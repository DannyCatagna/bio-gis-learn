import { useState } from "react";
import {
  BookOpen,
  Check,
  Circle,
  ClipboardList,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import fondoEcuador from "@/assets/fondo-ecuador.jpg";
import unidadDosImg from "@/assets/unidad-2-ecuador.jpg";
import unidadTresImg from "@/assets/unidad-3-ecuador.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Tema {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  puntos: string[];
  datoClave: string;
}

const temasUnidadDos: Tema[] = [
  {
    titulo: "Tema 2.1: Diversidad de las Especies",
    subtitulo: "(Características ambientales y generales del Ecuador)",
    descripcion:
      "El Ecuador figura entre los 17 países megadiversos del planeta: concentra un porcentaje desproporcionado de la biodiversidad mundial en apenas 283.561 km². Esta riqueza responde a su posición equinoccial, a la presencia de la cordillera de los Andes —que divide al país en vertientes con climas radicalmente distintos— y a la influencia simultánea de las corrientes marinas fría de Humboldt y cálida de El Niño sobre la costa pacífica.",
    puntos: [
      "Cuatro regiones naturales con características propias: Costa, Sierra, Amazonía y Región Insular (Galápagos).",
      "Los Andes generan pisos térmicos y pisos ecológicos que multiplican los ambientes en distancias muy cortas.",
      "El país alberga alrededor del 8 % de las especies de fauna del mundo y cerca del 18 % de las aves conocidas.",
      "Cerca de 25.000 especies de plantas vasculares han sido registradas, muchas de ellas aún sin describir científicamente.",
      "Los ecosistemas clave son: selva amazónica, bosque nublado andino, bosque seco tropical, manglares, páramos y bosques del Chocó biogeográfico.",
    ],
    datoClave:
      "Ecuador posee una de las mayores densidades de especies por km² del mundo: más biodiversidad que países cien veces más extensos.",
  },
  {
    titulo: "Tema 2.2: Flora y Fauna del Ecuador",
    subtitulo: "(Fauna y sus ecosistemas, Áreas protegidas)",
    descripcion:
      "La fauna ecuatoriana incluye alrededor de 1.700 especies de aves, más de 430 mamíferos, 470 anfibios y 380 reptiles, junto con una fauna invertebrada gigantesca (más de 4.500 especies de mariposas). Cada ecosistema mantiene ensamblajes únicos: el oso de anteojos y el cóndor andino habitan los páramos y bosques andinos; el jaguar, el tapir y el guacamayo rojo la Amazonía; las tortugas gigantes y las iguanas marinas son exclusivas de Galápagos; y los manglares sostienen aves acuáticas y crustáceos de enorme valor económico.",
    puntos: [
      "Yasuní, en la Amazonía, es uno de los lugares más biodiversos del planeta: se registran cientos de especies de aves, mamíferos y árboles por hectárea.",
      "El Chocó andino (noroeste de Pichincha e Imbabura) es punto caliente (hotspot) de aves endémicas como el colibrí bicolor y el pavón colombiano.",
      "Los páramos albergan especies adaptadas al frío y al fuego, como el venado de cola blanca y el zorro andino.",
      "El bosque seco del suroeste conserva poblaciones de mono aullador, guacamayo verde y cocodrilos en los manglares del Golfo de Guayaquil.",
      "El 19 % aproximado del territorio nacional está bajo protección dentro de áreas protegidas, donde la fauna encuentra refugio frente a la presión humana.",
    ],
    datoClave:
      "Una sola hectárea de Yasuní puede contener más especies de árboles que todos los bosques nativos de Norteamérica juntos.",
  },
  {
    titulo: "Tema 2.3: Especies Endémicas",
    subtitulo: "(Flora ecosistémica y Manejo de cuencas hídricas)",
    descripcion:
      "Una especie endémica existe únicamente en un lugar del planeta. El endemismo ecuatoriano es altísimo gracias al aislamiento histórico de Galápagos, los valles interandinos y la fragmentación natural de los bosques del Chocó. Se estima que alrededor del 15–20 % de la flora nativa es endémica, con ejemplos como el árbol de cinchona, miles de orquídeas únicas de un solo valle andino, y la palma de ramos (Ceroxylon) de los bosques nublados. Esta riqueza está íntimamente ligada al agua: los páramos y bosques nublados actúan como esponjas que capturan niebla y alimentan los ríos.",
    puntos: [
      "Galápagos concentra el mayor endemismo del país: iguana marina, pinzones de Darwin y tortugas gigantes de cada volcán.",
      "El manejo de cuencas hídricas protege nacimientos, acuíferos y caudales: la calidad del agua depende del estado de la vegetación nativa que la rodea.",
      "Las principales cuencas del país son Guayas, Esmeraldas, Napo, Pastaza, Jubones y Catamayo–Chira, con vertientes al Pacífico y al Amazonas.",
      "La deforestación en la parte alta de una cuenca provoca inundaciones abajo y sequía en época seca: el agua es una consecuencia directa del bosque.",
      "Los programas de conservación de cuencas (pago por servicios ambientales, reforestación con especies nativas) protegen simultáneamente el endemismo y el agua que consumen las ciudades.",
    ],
    datoClave:
      "Muchas orquídeas ecuatorianas están endémicas de una sola montaña: si se pierde ese bosque, se extingue la especie en el planeta.",
  },
  {
    titulo: "Tema 2.4: Extinción de las Especies",
    subtitulo: "(Principales amenazas para la pérdida de la biodiversidad)",
    descripcion:
      "La extinción es la desaparición permanente de una especie: se pierde su información genética y su rol dentro del ecosistema para siempre. El Ecuador enfrenta una de las tasas de deforestación más altas de Sudamérica, y las Listas Rojas de la UICN registran cientos de especies amenazadas. El cóndor andino sobrevive con menos de 100 individuos en el país, las ranas doradas han desaparecido de muchos de sus bosques por el hongo quitridio, y el manglar ha perdido gran parte de su superficie histórica frente al camaronerismo.",
    puntos: [
      "Deforestación y cambio de uso de suelo para ganadería, palma y agroindustria: la principal causa de pérdida de hábitat.",
      "Minería legal e ilegal que contamina ríos y fragmenta territorios en la cordillera del Cóndor y la Amazonía.",
      "Tráfico ilegal de especies (loros, guacamayos, primates y orquídeas) que vacía poblaciones silvestres.",
      "Especies introducidas e invasoras (cabras, ratas, plantas ornamentales) que desplazan a la fauna nativa, especialmente en Galápagos.",
      "Cambio climático: el derretimiento de glaciares andinos, los incendios y las sequías alteran los páramos y fuerzan migraciones de especies.",
      "Contaminación por plásticos, agroquímicos e hidrocarburos que degrada manglares, ríos y arrecifes.",
    ],
    datoClave:
      "El cóndor andino está en peligro crítico de extinción en el Ecuador: quedan menos de 100 individuos en vida silvestre.",
  },
];

const temasUnidadTres: Tema[] = [
  {
    titulo: "Tema 3.1: Ámbito legal y normativa ecuatoriana",
    subtitulo: "(Tratamiento constitucional y desarrollo normativo)",
    descripcion:
      "La Constitución de 2008 fue la primera del mundo en reconocer derechos a la propia Naturaleza o Pacha Mama (arts. 71–74): el derecho a que se respete integralmente su existencia y al mantenimiento y regeneración de sus ciclos vitales. La Constitución establece el Buen Vivir (sumak kawsay) como paradigma, declara de interés público la conservación del ambiente y prohíbe en zonas protegidas la actividad extractiva no sostenible. Sobre esta base se ha construido un cuerpo normativo que ordena la gestión ambiental y traduce los compromisos internacionales a leyes nacionales.",
    puntos: [
      "Constitución de la República del Ecuador (2008): derechos de la Naturaleza, régimen del Buen Vivir y del Patrimonio Natural.",
      "Código Orgánico del Ambiente (COA, 2017) y su Reglamento (2019): marco general de la gestión ambiental y de la autoridad ambiental única (MAATE).",
      "Ley Forestal y de Conservación de Áreas Naturales y Vida Silvestre (1981), todavía vigente en materias no sustituidas por el COA.",
      "Estrategia Nacional de Biodiversidad y Plan de Acción Nacional de Biodiversidad, alineados con las Metas Globales del Convenio sobre Diversidad Biológica.",
      "Compromisos internacionales ratificados por Ecuador: CDB, CITES (tráfico de especies), Convenio Ramsar (humedales) y Patrimonio Mundial (Galápagos).",
    ],
    datoClave:
      "En 2021 la Corte Constitucional confirmó los derechos de la Naturaleza del bosque Los Cedros, deteniendo la minería dentro de un bosque nublado andino.",
  },
  {
    titulo: "Tema 3.2: Sistema Nacional de Áreas Protegidas - SNAP",
    subtitulo: "(Ordenamiento territorial y estrategias de manejo)",
    descripcion:
      "El SNAP agrupa todas las áreas protegidas del territorio continental e insular bajo criterios comunes de ordenamiento y manejo. Su núcleo es el Patrimonio de Áreas Naturales del Estado (PANE), integrado por cerca de 81 áreas oficiales que protegen muestras representativas de la biodiversidad nacional: Galápagos y Yasuní (Patrimonio Mundial de la UNESCO), Cotopaxi, Cajas, Sumaco, Podocarpus y decenas de parques y reservas más. Cada área se administra mediante un plan de manejo que define objetivos de conservación, zonificación, usos permitidos y programas de investigación y turismo controlado.",
    puntos: [
      "El SNAP se gestiona desde el Ministerio del Ambiente, Agua y Transición Ecológica (MAATE) con participación de gobiernos autónomos y comunidades.",
      "Categorías de manejo: parques nacionales, reservas ecológicas, reservas biológicas, reservas geobotánicas, refugios de vida silvestre y áreas nacionales de recreación.",
      "La zonificación interna separa zonas intangibles (sin intervención), de uso científico, de uso turístico y de amortiguamiento.",
      "El ordenamiento territorial conecta las áreas protegidas con la planificación de gobiernos locales y con corredores ecológicos entre áreas.",
      "Más allá del PANE, el SNAP reconoce áreas protegidas privadas, comunitarias y municipales que suman superficie de conservación.",
    ],
    datoClave:
      "El Parque Nacional Galápagos y la Reserva Marina homónima protegen alrededor de 180.000 km², una de las mayores áreas marinas protegidas del mundo.",
  },
  {
    titulo: "Tema 3.3: Extinción de especies",
    subtitulo: "(Estrategias de conservación in situ y ex situ)",
    descripcion:
      "La conservación in situ protege a las especies dentro de su hábitat natural: es la estrategia prioritaria porque mantiene procesos ecológicos completos (polinización, depredación, dispersión de semillas). La conservación ex situ interviene cuando la población silvestre está demasiado reducida: traslada individuos o material genético fuera del hábitat para resguardarlo y, eventualmente, reintroducirlo. Ambas estrategias se complementan y deben planificarse con ciencia, financiamiento sostenible y participación social.",
    puntos: [
      "In situ: áreas protegidas del SNAP, corredores ecológicos, reservas privadas y comunitarias, y protección de hábitats críticos fuera de áreas protegidas.",
      "Ex situ: zoológicos y centros de rescate, bancos de semillas y herbarios, viveros de plantas nativas, criopreservación de material genético.",
      "Ejemplo emblemático in situ + ex situ: el programa de reproducción de tortugas gigantes en Galápagos ha devuelto miles de juveniles a sus islas de origen.",
      "Los programas de reintroducción del cóndor andino liberan ejemplares criados en cautiverio y los monitorean con GPS para reforzar la población silvestre.",
      "La Lista Roja de la UICN y las listas rojas nacionales guían qué especies y qué poblaciones requieren acción urgente.",
    ],
    datoClave:
      "Sin hábitat protegido (in situ), las estrategias ex situ solo congelan la extinción: el objetivo final siempre es la recuperación en vida silvestre.",
  },
  {
    titulo: "Tema 3.4: Estrategias y manejo de conservación",
    subtitulo: "(Clasificación, estructura del SNAP y el rol de las comunidades)",
    descripcion:
      "La conservación moderna ya no consiste solo en cercar territorios: es una estrategia social y territorial. El manejo del SNAP combina la clasificación científica de áreas, planes de manejo con zonificación, financiamiento sostenible y, sobre todo, el rol activo de las comunidades y nacionalidades indígenas que han habitado y protegido estos territorios durante milenios. Los pueblos amazónicos, los comunes de agua y bosque y las comunidades pesqueras demuestran que el conocimiento ancestral y la gobernanza local son los mejores guardianes de la biodiversidad.",
    puntos: [
      "Manejo participativo: comunidades y gobiernos locales co-gestionan áreas protegidas y definen reglas de uso con el MAATE.",
      "Territorios indígenas como Sarayaku, Cofán Dureno y comunidades del Chocó funcionan como barreras reales contra la deforestación.",
      "Turismo comunitario y pago por servicios ambientales generan ingresos locales ligados a mantener el bosque en pie.",
      "Corredores biológicos y zonas de amortiguamiento conectan áreas protegidas y permiten el movimiento de fauna entre fragmentos.",
      "La estructura del SNAP (clasificación, zonificación, plan de manejo, autoridad ambiental, guardaparques) se sostiene con vigilancia comunitaria y control conjunto.",
      "Restauración ecológica con especies nativas y control de invasoras completan las estrategias activas de manejo.",
    ],
    datoClave:
      "Los territorios gestionados por pueblos indígenas amazónicos presentan tasas de deforestación hasta dos veces menores que áreas vecinas bajo otro régimen de tenencia.",
  },
];

const guias = [
  "Guía 1: Modelamiento de Nichos y Distribución Espacial de Especies Endémicas en el Ecuador.",
  "Guía 2: Análisis Temporal (Timelapse) de las Amenazas a la Biodiversidad y Deforestación.",
  "Guía 3: Análisis Cartográfico de los Límites y Cobertura del Sistema Nacional de Áreas Protegidas.",
  "Guía 4: Análisis de Superposición Espacial: Conflictos Territoriales y Zonas de Amortiguamiento Community-Led.",
];

interface TopicGridProps {
  topics: Tema[];
  accent: "jungle" | "ocean";
}

const TopicGrid = ({ topics, accent }: TopicGridProps) => (
  <div className="grid gap-8 lg:grid-cols-2">
    {topics.map((topic, index) => (
      <Card
        key={topic.titulo}
        className={cn(
          "overflow-hidden border bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md",
          accent === "jungle" ? "border-jungle/25" : "border-ocean/25",
        )}
      >
        <div className={cn("h-1.5", accent === "jungle" ? "bg-jungle" : "bg-ocean")} />
        <CardHeader className="gap-6 p-7 sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div
              className={cn(
                "grid h-12 w-12 shrink-0 place-items-center rounded-md text-sm font-bold",
                accent === "jungle"
                  ? "bg-jungle/10 text-jungle"
                  : "bg-ocean/10 text-ocean",
              )}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl leading-relaxed sm:text-2xl">{topic.titulo}</CardTitle>
            <p
              className={cn(
                "text-sm font-semibold",
                accent === "jungle" ? "text-jungle/80" : "text-ocean/80",
              )}
            >
              {topic.subtitulo}
            </p>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">{topic.descripcion}</p>
        </CardHeader>
        <CardContent className="space-y-6 p-7 pt-0 sm:p-9 sm:pt-0">
          <ul className="space-y-3">
            {topic.puntos.map((punto) => (
              <li key={punto} className="flex items-start gap-3">
                <Leaf
                  className={cn(
                    "mt-1 h-4 w-4 shrink-0",
                    accent === "jungle" ? "text-jungle" : "text-ocean",
                  )}
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-foreground/90">{punto}</span>
              </li>
            ))}
          </ul>
          <div
            className={cn(
              "flex items-start gap-3 rounded-md p-4",
              accent === "jungle" ? "bg-jungle/10" : "bg-ocean/10",
            )}
          >
            <Sparkles
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                accent === "jungle" ? "text-jungle" : "text-ocean",
              )}
              aria-hidden="true"
            />
            <p
              className={cn(
                "text-sm font-medium leading-relaxed",
                accent === "jungle" ? "text-jungle" : "text-ocean",
              )}
            >
              <span className="font-bold uppercase tracking-wide">Dato clave: </span>
              {topic.datoClave}
            </p>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const Index = () => {
  const [completedGuides, setCompletedGuides] = useState<number[]>([]);

  const toggleGuide = (guideIndex: number) => {
    setCompletedGuides((current) =>
      current.includes(guideIndex)
        ? current.filter((index) => index !== guideIndex)
        : [...current, guideIndex],
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <main>
        <header className="relative overflow-hidden border-b bg-card px-5 py-10 sm:px-8 md:px-12 md:py-14">
          <img
            src={fondoEcuador}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="relative mx-auto max-w-6xl">
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
