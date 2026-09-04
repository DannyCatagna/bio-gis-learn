import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  Crosshair,
  Layers,
  Lightbulb,
  MapPinned,
  Target,
  ClipboardList,
} from "lucide-react";

type Tono = "jungle" | "ocean" | "paramo";

const tono: Record<Tono, { chip: string; btn: string; bar: string; border: string }> = {
  jungle: {
    chip: "bg-jungle/10 text-jungle",
    btn: "bg-jungle text-jungle-foreground hover:bg-jungle/90",
    bar: "[&>div]:bg-jungle",
    border: "hover:border-jungle/50",
  },
  ocean: {
    chip: "bg-ocean/10 text-ocean",
    btn: "bg-ocean text-ocean-foreground hover:bg-ocean/90",
    bar: "[&>div]:bg-ocean",
    border: "hover:border-ocean/50",
  },
  paramo: {
    chip: "bg-paramo/15 text-paramo",
    btn: "bg-paramo text-paramo-foreground hover:bg-paramo/90",
    bar: "[&>div]:bg-paramo",
    border: "hover:border-paramo/50",
  },
};

interface Guia {
  id: string;
  unidad: string;
  titulo: string;
  objetivo: string;
  reto: string;
  capas: string[];
  pasos: string[];
  tip: string;
  evidencia: string;
  tono: Tono;
  icon: typeof Crosshair;
}

const guias: Guia[] = [
  {
    id: "g1",
    unidad: "Unidad 2 · Guía 1",
    titulo: "Modelamiento de nichos y distribución espacial de especies endémicas",
    objetivo:
      "Relacionar variables ambientales (altitud, precipitación y temperatura) con la distribución potencial de especies endémicas del Ecuador continental.",
    reto:
      "Reto espacial: localiza en el visor el páramo húmedo donde habita de forma exclusiva el frailejón de hojas en roseta con vellosidades blanquecinas y registra sus coordenadas aproximadas.",
    capas: ["Áreas Protegidas (SNAP)"],
    pasos: [
      "Activa la capa Áreas Protegidas (SNAP) en el menú flotante del visor.",
      "Ubica el norte de la Sierra (provincia del Carchi) y acerca el zoom.",
      "Identifica el área protegida de páramo húmedo y anota su nombre oficial.",
      "Registra latitud y longitud aproximadas del punto central.",
      "Justifica por qué el rango restringido implica mayor vulnerabilidad.",
    ],
    tip: "Tip SIG: en modelamiento de nichos, la altitud y la precipitación explican gran parte del rango de las plantas altoandinas.",
    evidencia: "Coordenadas (lat, lon), nombre del área y descripción biogeográfica del hábitat.",
    tono: "jungle",
    icon: Crosshair,
  },
  {
    id: "g2",
    unidad: "Unidad 3 · Guía 2",
    titulo: "Análisis temporal de amenazas a la biodiversidad y deforestación",
    objetivo:
      "Interpretar la superposición de capas cartográficas para identificar zonas de impacto antrópico y conflictos territoriales sobre áreas de alto valor de conservación.",
    reto:
      "Reto de superposición: enciende simultáneamente las capas de carbono irrecuperable y conflicto territorial y delimita al menos dos zonas donde la presión extractiva o agrícola coincide con reservas de carbono.",
    capas: ["Carbono Irrecuperable", "Conflicto Territorial"],
    pasos: [
      "Activa las capas Carbono Irrecuperable y Conflicto Territorial en el visor.",
      "Compara la Amazonía norte con la frontera agrícola sur.",
      "Marca los polígonos donde ambas capas se intersecan.",
      "Estima el tipo de amenaza dominante en cada zona (extractiva o agropecuaria).",
      "Propón una herramienta de conservación aplicable a cada caso.",
    ],
    tip: "Tip SIG: la superposición (overlay) permite detectar conflictos que ninguna capa muestra por separado.",
    evidencia: "Zonas identificadas, amenaza dominante y herramienta de conservación propuesta.",
    tono: "paramo",
    icon: Layers,
  },
  {
    id: "g3",
    unidad: "Unidad 3 · Guía 3",
    titulo: "Límites cartográficos y cobertura del SNAP",
    objetivo:
      "Categorizar las estrategias de manejo del Sistema Nacional de Áreas Protegidas a partir de sus límites territoriales y su representatividad ecosistémica.",
    reto:
      "Reto de delimitación: activa la capa del SNAP junto con la de endemismo y determina qué áreas protegidas concentran especies de rango restringido y cuáles quedan como vacíos de conservación.",
    capas: ["Áreas Protegidas (SNAP)", "Endemismo (rango restringido)"],
    pasos: [
      "Activa las capas Áreas Protegidas (SNAP) y Endemismo en el visor.",
      "Recorre las tres regiones continentales: Costa, Sierra y Amazonía.",
      "Anota la categoría de manejo de al menos tres áreas observadas.",
      "Identifica un núcleo de endemismo sin cobertura del SNAP.",
      "Argumenta qué categoría de manejo sería la más adecuada para ese vacío.",
    ],
    tip: "Tip SIG: la representatividad se evalúa cruzando límites administrativos con la distribución real de los ecosistemas.",
    evidencia: "Áreas y categorías de manejo registradas, vacío de conservación detectado y propuesta de categoría.",
    tono: "ocean",
    icon: MapPinned,
  },
  {
    id: "g4",
    unidad: "Unidad 3 · Guía 4",
    titulo: "Superposición espacial: conflictos territoriales y zonas de amortiguamiento comunitarias",
    objetivo:
      "Evaluar la interacción entre la conservación in situ y las presiones antrópicas, proponiendo zonas de amortiguamiento gestionadas con las comunidades locales.",
    reto:
      "Reto de amortiguamiento: superpone SNAP, conflictos mineros/agrícolas y flora y fauna emblemática, y define un buffer de 2 a 5 km donde la gestión comunitaria sea prioritaria.",
    capas: [
      "Áreas Protegidas (SNAP)",
      "Conflictos Mineros y Agrícolas",
      "Flora y Fauna Emblemática",
    ],
    pasos: [
      "Activa las tres capas indicadas en el menú flotante del visor.",
      "Localiza los puntos donde la presión extractiva bordea un área protegida.",
      "Delimita mentalmente un buffer de 2 a 5 km alrededor del límite.",
      "Registra la fauna emblemática afectada dentro de ese buffer.",
      "Propón una acción de co-manejo comunitario para la zona.",
    ],
    tip: "Tip SIG: el buffer convierte un límite en una franja de gestión; ahí es donde se negocia el uso del suelo.",
    evidencia: "Zona de amortiguamiento propuesta, especies afectadas y acción de gobernanza comunitaria.",
    tono: "jungle",
    icon: Layers,
  },
];


interface Props {
  onActivarCapas: (labels: string[]) => void;
}

const GuiaCard = ({ guia, onActivarCapas }: { guia: Guia; onActivarCapas: Props["onActivarCapas"] }) => {
  const t = tono[guia.tono];
  const [check, setCheck] = useState<boolean[]>(() => guia.pasos.map(() => false));
  const [evidencia, setEvidencia] = useState("");

  const hechos = check.filter(Boolean).length;
  const progreso = Math.round((hechos / guia.pasos.length) * 100);

  return (
    <article className={`rounded-2xl border bg-surface-raised p-5 md:p-6 card-shadow transition-all duration-300 ${t.border}`}>
      <div className="flex items-start justify-between gap-3">
        <div className={`h-11 w-11 shrink-0 rounded-xl grid place-items-center ${t.chip}`}>
          <guia.icon className="h-5 w-5" />
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${t.chip}`}>{guia.unidad}</span>
      </div>

      <h3 className="mt-4 text-base font-semibold leading-snug">{guia.titulo}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guia.objetivo}</p>

      <div className={`mt-4 rounded-xl p-3 text-sm leading-relaxed ${t.chip}`}>
        <span className="flex items-center gap-2 font-semibold">
          <Target className="h-4 w-4" /> Reto geoespacial
        </span>
        <p className="mt-1.5 font-medium">{guia.reto}</p>
      </div>

      <Button
        onClick={() => onActivarCapas(guia.capas)}
        className={`mt-4 w-full min-h-[44px] font-semibold ${t.btn}`}
      >
        <MapPinned className="mr-1 h-4 w-4" />
        Activar capas en el visor
      </Button>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ClipboardList className="h-3.5 w-3.5" /> Ruta de navegación
          </span>
          <span>{progreso}%</span>
        </div>
        <Progress value={progreso} className={`mt-2 h-2 ${t.bar}`} />
        <ul className="mt-3 space-y-2.5">
          {guia.pasos.map((paso, i) => (
            <li key={paso} className="flex items-start gap-2.5">
              <Checkbox
                id={`${guia.id}-${i}`}
                checked={check[i]}
                onCheckedChange={(v) =>
                  setCheck((prev) => prev.map((c, idx) => (idx === i ? !!v : c)))
                }
                className="mt-0.5"
              />
              <label
                htmlFor={`${guia.id}-${i}`}
                className={`cursor-pointer text-sm leading-relaxed transition-colors ${
                  check[i] ? "text-muted-foreground line-through" : "text-foreground"
                }`}
              >
                {paso}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 flex gap-2 rounded-xl border bg-surface p-3 text-xs leading-relaxed text-muted-foreground">
        <Lightbulb className="h-4 w-4 shrink-0 text-paramo" />
        {guia.tip}
      </p>

      <div className="mt-4">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Bloque de evidencia
        </label>
        <Textarea
          value={evidencia}
          onChange={(e) => setEvidencia(e.target.value)}
          placeholder={guia.evidencia}
          className="mt-2 min-h-[96px] text-sm"
        />
      </div>

      <Link to="/guias" className="mt-4 block">
        <Button variant="outline" className="w-full min-h-[44px] font-semibold">
          Abrir hoja de trabajo completa
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </Link>
    </article>
  );
};

const GuiasSIG = ({ onActivarCapas }: Props) => (
  <section>
    <div className="flex items-center gap-2 mb-1">
      <ClipboardList className="h-5 w-5 text-ocean" />
      <h2 className="text-lg font-bold">Guías didácticas SIG</h2>
    </div>
    <p className="text-sm text-muted-foreground mb-4">
      Hojas de trabajo interactivas vinculadas al visor cartográfico superior.
    </p>
    <div className="grid gap-4 lg:grid-cols-2">
      {guias.map((g) => (
        <GuiaCard key={g.id} guia={g} onActivarCapas={onActivarCapas} />
      ))}
    </div>
  </section>
);

export default GuiasSIG;
