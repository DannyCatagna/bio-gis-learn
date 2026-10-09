import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Circle,
  ClipboardList,
  Compass,
  ExternalLink,
  Globe2,
  Satellite,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import fondoEcuador from "@/assets/fondo-ecuador.jpg";
import unidadDosImg from "@/assets/unidad-2-ecuador.jpg";
import unidadTresImg from "@/assets/unidad-3-ecuador.jpg";
import tema21Img from "@/assets/tema-21.jpg";
import tema22Img from "@/assets/tema-22.jpg";
import tema23Img from "@/assets/tema-23.jpg";
import tema24Img from "@/assets/tema-24.jpg";
import tema31Img from "@/assets/tema-31.jpg";
import tema32Img from "@/assets/tema-32.jpg";
import tema33Img from "@/assets/tema-33.jpg";
import tema34Img from "@/assets/tema-34.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import MapaSatelital from "@/components/dashboard/MapaSatelital";

interface Tema {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  puntos: string[];
  datoClave: string;
  imagen: string;
}

const temasUnidadDos: Tema[] = [
  {
    titulo: "Tema 2.1: Diversidad de las Especies",
    imagen: tema21Img,
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
    imagen: tema22Img,
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
    imagen: tema23Img,
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
    imagen: tema24Img,
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
    imagen: tema31Img,
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
    imagen: tema32Img,
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
    imagen: tema33Img,
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
    imagen: tema34Img,
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

const hechoUnidadDos =
  "El Ecuador alberga el 16 % de las especies de aves del mundo, el 8 % de los anfibios y más de 25.000 especies de plantas descritas, distribuidas en 91 ecosistemas distintos.";
const hechoUnidadTres =
  "El SNAP es la estrategia de conservación in situ más efectiva del país: cubre el 20,3 % del territorio continental y el 12,07 % del área marina, con 60 áreas protegidas.";

interface Recurso {
  label: string;
  url: string;
}

const linksUnidadDos: Recurso[] = [
  { label: "BioWeb Geografía y Clima", url: "https://bioweb.bio/faunaweb/amphibiaweb/GeografiaClima/" },
  {
    label: "Zonas Climáticas EC",
    url: "http://www.forosecuador.ec/forum/ecuador/educaci%C3%B3n-y-ciencia/12571-zonas-clim%C3%A1ticas-del-ecuador",
  },
];
const linksUnidadTres: Recurso[] = [
  { label: "Sistema Nacional de Áreas Protegidas (MAATE)", url: "http://areasprotegidas.ambiente.gob.ec/es/info-snap" },
  {
    label: "Ley Forestal y Conservación",
    url: "http://www.prolipa.com.ec/blog/wp-content/uploads/2017/08/Leyparalaconservacion.pdf",
  },
];

const guias = [
  {
    titulo: "Guía 1: Modelamiento de Nichos y Distribución Espacial de Especies Endémicas en el Ecuador.",
    url: "https://earth.google.com/web/",
    instruccion:
      "Usa la vista satelital de Google Earth para geolocalizar los pisos climáticos. IMPORTANTE: Enfócate solo en la especie endémica asignada. No satures el mapa visualmente.",
  },
  {
    titulo: "Guía 2: Análisis Temporal (Timelapse) de las Amenazas a la Biodiversidad y Deforestación.",
    url: "https://worldview.earthdata.nasa.gov/",
    instruccion:
      "Activa las capas temporales de NASA Worldview (Timelapse). Analiza las zonas de deforestación enfocándote en un solo cuadrante a la vez para reducir la carga cognitiva.",
  },
  {
    titulo: "Guía 3: Análisis Cartográfico de los Límites y Cobertura del Sistema Nacional de Áreas Protegidas.",
    url: "http://ide.ambiente.gob.ec/mapainteractivo/",
    instruccion:
      "Usa el visor oficial del MAATE. Activa únicamente la capa de la zona de estudio para evitar aglomeración visual de los 60 puntos del SNAP.",
  },
  {
    titulo: "Guía 4: Análisis de Superposición Espacial: Conflictos Territoriales y Zonas de Amortiguamiento Community-Led.",
    url: "https://www.openstreetmap.org/",
    instruccion:
      "Utiliza el mapa colaborativo de OpenStreetMap para identificar las presiones antrópicas cercanas a la zona de amortiguamiento seleccionada.",
  },
];

interface TopicGridProps {
  topics: Tema[];
  accent: "jungle" | "ocean";
  hecho: string;
  links: Recurso[];
}

const TopicGrid = ({ topics, accent, hecho, links }: TopicGridProps) => (
  <div className="grid gap-8 lg:grid-cols-2">
    {topics.map((topic, index) => (
      <Card
        key={topic.titulo}
        className={cn(
          "relative flex flex-col overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-md",
          accent === "jungle" ? "border-jungle/25" : "border-ocean/25",
        )}
      >
        <div className={cn("h-1.5", accent === "jungle" ? "bg-jungle" : "bg-ocean")} />
        <div className="relative h-48 overflow-hidden sm:h-56">
          <img
            src={topic.imagen}
            alt={`Ilustración de ${topic.titulo}`}
            loading="lazy"
            width={1024}
            height={768}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
        </div>
        <CardHeader className="relative gap-6 p-7 sm:p-9">
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
          <p
            className={cn(
              "border-l-4 pl-4 text-sm font-medium leading-relaxed text-foreground",
              accent === "jungle" ? "border-jungle" : "border-ocean",
            )}
          >
            {hecho}
          </p>
        </CardHeader>
        <CardContent className="relative space-y-6 p-7 pt-0 sm:p-9 sm:pt-0">
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
          <div className="space-y-3 border-t pt-5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Recursos Externos</p>
            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors",
                    accent === "jungle"
                      ? "border-jungle/40 text-jungle hover:bg-jungle hover:text-card"
                      : "border-ocean/40 text-ocean hover:bg-ocean hover:text-card",
                  )}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const glass = "rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]";

const plataformas = [
  {
    nombre: "Google Earth",
    url: "https://earth.google.com/web/",
    uso: "Globo virtual con imágenes satelitales en 3D. Permite buscar lugares, trazar rutas y polígonos, medir distancias y explorar el relieve sin instalar nada.",
  },
  {
    nombre: "NASA Worldview",
    url: "https://worldview.earthdata.nasa.gov/",
    uso: "Imágenes satelitales diarias de la NASA. Su línea de tiempo permite comparar fechas y observar cambios como incendios, nubosidad o pérdida de cobertura vegetal.",
  },
  {
    nombre: "Visor interactivo del MAATE",
    url: "http://ide.ambiente.gob.ec/mapainteractivo/",
    uso: "Visor oficial del Ministerio de Ambiente, Agua y Transición Ecológica. Muestra capas del SNAP, bosques protectores y cobertura vegetal; se activan una a una desde el panel de capas.",
  },
];

const bibliografia = [
  "Alcántara Manzanares, J., & Medina Quintana, S. (2019). Google Earth como herramienta para formadores en la preparación de itinerarios didácticos orientados a la educación ambiental. Enseñanza de las Ciencias, 37(2), 173-188.",
  "Fast, V., & Hossain, F. (2020). An Alternative to Desktop GIS? Evaluating the Cartographic and Analytical Capabilities of WebGIS Platforms for Teaching. The Cartographic Journal, 57(2), 175-186.",
  "Mestanza-Ramón, C., et al. (2020). In-Situ and Ex-Situ Biodiversity Conservation in Ecuador: A Review of Policies, Actions and Challenges. Diversity, 12(8), 315.",
  "Schulze, U. (2020). GIS works—But why, how, and for whom? Findings from a systematic review. Transactions in GIS, 24(3), 515–546.",
];

interface GuideCardsProps {
  indices: number[];
  completed: number[];
  onToggle: (i: number) => void;
}

const GuideCards = ({ indices, completed, onToggle }: GuideCardsProps) => (
  <div className="grid gap-6 lg:grid-cols-2">
    {indices.map((index) => {
      const guia = guias[index];
      const done = completed.includes(index);
      return (
        <Card key={guia.titulo} className={cn(glass, "flex flex-col overflow-hidden border-paramo/40", done && "border-paramo")}>
          <div className="h-1.5 bg-paramo" />
          <CardHeader className="flex-1 gap-5 p-7">
            <div className="grid h-12 w-12 place-items-center rounded-md bg-paramo/10 text-paramo">
              <ClipboardList className="h-6 w-6" aria-hidden="true" />
            </div>
            <CardTitle className="text-lg leading-relaxed">{guia.titulo}</CardTitle>
            <div className="rounded-md border border-paramo/25 bg-paramo/5 p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-paramo">Instrucciones</p>
              <p className="text-sm leading-relaxed">{guia.instruccion}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 p-7 pt-0">
            <Button asChild className="h-12 w-full bg-paramo font-bold text-paramo-foreground hover:bg-paramo/90">
              <a href={guia.url} target="_blank" rel="noopener noreferrer">
                <Satellite className="h-5 w-5" aria-hidden="true" />
                🚀 Abrir Visor Satelital
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onToggle(index)}
              aria-pressed={done}
              className="w-full border-paramo text-paramo hover:bg-paramo/10 hover:text-paramo"
            >
              {done ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              {done ? "Completada" : "Marcar como completada"}
            </Button>
          </CardContent>
        </Card>
      );
    })}
  </div>
);

const SectionTitle = ({ kicker, title, color }: { kicker: string; title: string; color: string }) => (
  <div className={cn("mb-10 border-l-4 pl-5", color)}>
    <p className="text-sm font-semibold uppercase tracking-wide">{kicker}</p>
    <h2 className="mt-2 text-3xl font-bold leading-tight text-foreground md:text-4xl">{title}</h2>
  </div>
);

const Index = () => {
  const [completedGuides, setCompletedGuides] = useState<number[]>([]);
  const toggleGuide = (i: number) =>
    setCompletedGuides((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));

  const tabs = [
    { value: "inicio", label: "🏠 Inicio" },
    { value: "panel", label: "📖 Panel Pedagógico" },
    { value: "mapa", label: "🗺️ Mapa Interactivo" },
    { value: "evaluacion", label: "📝 Evaluación" },
    { value: "bibliografia", label: "📚 Bibliografía" },
  ];

  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img src={fondoEcuador} alt="" className="h-full w-full object-cover opacity-25" />
        <div className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-jungle/70 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[32rem] w-[32rem] rounded-full bg-ocean/70 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-paramo/60 blur-3xl" />
      </div>

      <Tabs defaultValue="inicio" className="w-full">
        <div className="sticky top-0 z-20 px-4 py-4 sm:px-8">
          <TabsList className={cn(glass, "mx-auto flex h-auto max-w-6xl flex-wrap justify-center gap-2 p-2")}>
            {tabs.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="min-h-11 px-4 text-sm font-semibold data-[state=active]:bg-jungle data-[state=active]:text-jungle-foreground"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8">
          <TabsContent value="inicio" className="m-0 space-y-10">
            <div className={cn(glass, "p-8 md:p-12")}>
              <p className="text-sm font-semibold uppercase tracking-wide text-jungle">BIOSIG</p>
              <h1 className="mt-2 text-3xl font-bold md:text-5xl">Sistemas de Información Geográfica para la educación</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Un SIG es un potente conjunto de herramientas para recolectar, almacenar, transformar y desplegar datos
                geoespaciales del mundo real. Permite relacionar la información con su ubicación y analizar patrones en
                el territorio.
              </p>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Tradicionalmente, el SIG de escritorio requería instalar programas especializados y equipos potentes. Las
                plataformas WebGIS trasladan esas capacidades al navegador: son gratuitas, no requieren instalación y
                facilitan su uso en el aula.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {plataformas.map((p) => (
                <div key={p.nombre} className={cn(glass, "flex flex-col p-7")}>
                  <Globe2 className="h-8 w-8 text-ocean" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-bold">{p.nombre}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.uso}</p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ocean hover:underline"
                  >
                    Abrir plataforma <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
            <div>
              <SectionTitle
                kicker="Accesos rápidos"
                title="Sigue con la introducción o con las hojas de trabajo"
                color="border-jungle text-jungle"
              />
              <div className="grid gap-6 md:grid-cols-2">
                <Link
                  to="/introduccion"
                  className={cn(glass, "flex items-start gap-5 p-7 transition-transform duration-300 hover:-translate-y-1")}
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-jungle/15 text-jungle">
                    <Compass className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Introducción SIG</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      ¿Qué es un SIG?, las capas y datos espaciales, y su aplicación en la conservación.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-jungle">
                      Entrar <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
                <Link
                  to="/guias"
                  className={cn(glass, "flex items-start gap-5 p-7 transition-transform duration-300 hover:-translate-y-1")}
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-paramo/15 text-paramo">
                    <ClipboardList className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Guías Didácticas</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Las cuatro hojas de trabajo SIG con su fundamento, procedimiento, recursos y evaluación.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-paramo">
                      Abrir guías <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="panel" className="m-0 space-y-8">
            <div className={cn(glass, "flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between")}>
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Antes de empezar</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/introduccion"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-jungle/40 px-4 py-2 text-sm font-semibold text-jungle transition-colors hover:bg-jungle hover:text-card"
                >
                  <Compass className="h-4 w-4" aria-hidden="true" /> Introducción SIG
                </Link>
                <Link
                  to="/guias"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-paramo/40 px-4 py-2 text-sm font-semibold text-paramo transition-colors hover:bg-paramo hover:text-card"
                >
                  <ClipboardList className="h-4 w-4" aria-hidden="true" /> Guías Didácticas
                </Link>
              </div>
            </div>
            <Tabs defaultValue="u2">
              <TabsList className={cn(glass, "mb-10 grid h-auto grid-cols-1 gap-2 p-2 md:grid-cols-2")}>
                <TabsTrigger value="u2" className="min-h-12 whitespace-normal data-[state=active]:bg-jungle data-[state=active]:text-jungle-foreground">
                  <BookOpen className="h-4 w-4" /> Unidad 2: Ecuador, País Megadiverso
                </TabsTrigger>
                <TabsTrigger value="u3" className="min-h-12 whitespace-normal data-[state=active]:bg-ocean data-[state=active]:text-ocean-foreground">
                  <ShieldCheck className="h-4 w-4" /> Unidad 3: Conservación de la Biodiversidad
                </TabsTrigger>
              </TabsList>
              <TabsContent value="u2" className="m-0 space-y-14">
                <div className="relative overflow-hidden rounded-2xl shadow-md">
                  <img src={unidadDosImg} alt="Flora y fauna del Ecuador" className="h-56 w-full object-cover md:h-64" />
                  <div className="absolute inset-0 flex items-center bg-gradient-to-r from-jungle/90 via-jungle/60 to-transparent px-8">
                    <h2 className="max-w-xl text-3xl font-bold text-card md:text-4xl">Ecuador, País Megadiverso</h2>
                  </div>
                </div>
                <TopicGrid topics={temasUnidadDos} accent="jungle" hecho={hechoUnidadDos} links={linksUnidadDos} />
                <div>
                  <SectionTitle kicker="Guías de la Unidad 2" title="Hojas de Trabajo SIG" color="border-paramo text-paramo" />
                  <GuideCards indices={[0, 1]} completed={completedGuides} onToggle={toggleGuide} />
                  <Link
                    to="/guias"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-paramo hover:underline"
                  >
                    Ver las cuatro guías con su procedimiento completo <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </TabsContent>
              <TabsContent value="u3" className="m-0 space-y-14">
                <div className="relative overflow-hidden rounded-2xl shadow-md">
                  <img src={unidadTresImg} alt="Comunidades y guardaparques conservando" className="h-56 w-full object-cover md:h-64" />
                  <div className="absolute inset-0 flex items-center bg-gradient-to-r from-ocean/90 via-ocean/60 to-transparent px-8">
                    <h2 className="max-w-xl text-3xl font-bold text-card md:text-4xl">Conservación de la Biodiversidad en el Ecuador</h2>
                  </div>
                </div>
                <TopicGrid topics={temasUnidadTres} accent="ocean" hecho={hechoUnidadTres} links={linksUnidadTres} />
                <div>
                  <SectionTitle kicker="Guías de la Unidad 3" title="Hojas de Trabajo SIG" color="border-paramo text-paramo" />
                  <GuideCards indices={[2, 3]} completed={completedGuides} onToggle={toggleGuide} />
                  <Link
                    to="/guias"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-paramo hover:underline"
                  >
                    Ver las cuatro guías con su procedimiento completo <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="mapa" className="m-0">
            <div className={cn(glass, "p-6 md:p-10")}>
              <SectionTitle kicker="Vista satelital" title="Mapa Interactivo" color="border-ocean text-ocean" />
              <MapaSatelital />
            </div>
          </TabsContent>

          <TabsContent value="evaluacion" className="m-0">
            <div className={cn(glass, "p-8 md:p-12")}>
              <SectionTitle kicker="Evaluación" title="Progreso de las Hojas de Trabajo SIG" color="border-paramo text-paramo" />
              <p className="text-lg font-semibold text-paramo">
                {completedGuides.length} de {guias.length} guías completadas
              </p>
              <ul className="mt-6 space-y-3">
                {guias.map((g, i) => (
                  <li key={g.titulo} className="flex items-start gap-3 text-sm">
                    {completedGuides.includes(i) ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-jungle" />
                    ) : (
                      <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    {g.titulo}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-ocean text-ocean-foreground hover:bg-ocean/90">
                  <Link to="/evaluacion">Ir a la evaluación</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-paramo text-paramo hover:bg-paramo/10 hover:text-paramo"
                >
                  <Link to="/guias">Abrir Guías Didácticas</Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bibliografia" className="m-0">
            <div className={cn(glass, "p-8 md:p-12")}>
              <SectionTitle kicker="Referencias" title="Bibliografía" color="border-jungle text-jungle" />
              <ol className="space-y-5">
                {bibliografia.map((ref) => (
                  <li key={ref} className="pl-8 -indent-8 text-sm leading-relaxed">
                    {ref}
                  </li>
                ))}
              </ol>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Index;
