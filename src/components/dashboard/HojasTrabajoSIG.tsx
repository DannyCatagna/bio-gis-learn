import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  ClipboardList,
  Crosshair,
  History,
  Lightbulb,
  MapPinned,
  Target,
} from "lucide-react";

interface Hoja {
  id: string;
  etiqueta: string;
  titulo: string;
  objetivo: string;
  reto: string;
  capas: string[];
  pasos: string[];
  tip: string;
  evidencia: string;
  icon: typeof Crosshair;
}

const hojas: Hoja[] = [
  {
    id: "hoja-1",
    etiqueta: "Hoja de trabajo 1",
    titulo:
      "Guía 1: Modelamiento de Nichos y Distribución Espacial de Especies Endémicas en el Ecuador",
    objetivo:
      "Relacionar variables ambientales (altitud, precipitación y temperatura) con la distribución potencial de especies endémicas del Ecuador continental.",
    reto:
      "Localiza en el visor el páramo húmedo donde habita de forma exclusiva el frailejón de hojas en roseta con vellosidades blanquecinas y registra sus coordenadas aproximadas.",
    capas: ["Áreas Protegidas (SNAP)", "Endemismo (rango restringido)"],
    pasos: [
      "Activa las capas Áreas Protegidas (SNAP) y Endemismo en el menú flotante del visor.",
      "Ubica el norte de la Sierra (provincia del Carchi) y acerca el zoom.",
      "Identifica el área protegida de páramo húmedo y anota su nombre oficial.",
      "Registra latitud y longitud aproximadas del punto central.",
      "Justifica por qué un rango de distribución restringido implica mayor vulnerabilidad.",
    ],
    tip: "En modelamiento de nichos, la altitud y la precipitación explican gran parte del rango de las plantas altoandinas.",
    evidencia:
      "Coordenadas (lat, lon), nombre oficial del área protegida y descripción biogeográfica del hábitat.",
    icon: Crosshair,
  },
  {
    id: "hoja-2",
    etiqueta: "Hoja de trabajo 2",
    titulo:
      "Guía 2: Análisis Temporal (Timelapse) de las Amenazas a la Biodiversidad y Deforestación",
    objetivo:
      "Interpretar la evolución en el tiempo de la presión antrópica sobre ecosistemas de alto valor de conservación mediante la comparación de capas cartográficas.",
    reto:
      "Enciende simultáneamente las capas de carbono irrecuperable y conflictos mineros y agrícolas, y delimita al menos dos zonas donde la presión extractiva o agrícola avanza sobre reservas de carbono.",
    capas: ["Carbono Irrecuperable", "Conflictos Mineros y Agrícolas", "Cuencas Hidrográficas"],
    pasos: [
      "Activa las capas Carbono Irrecuperable, Conflictos Mineros y Agrícolas y Cuencas Hidrográficas.",
      "Compara la Amazonía norte con la frontera agrícola del sur del país.",
      "Marca las zonas donde las capas se intersecan y describe el avance en el tiempo.",
      "Determina el tipo de amenaza dominante en cada zona (extractiva o agropecuaria).",
      "Propón una herramienta de conservación aplicable a cada caso.",
    ],
    tip: "El análisis multitemporal compara la misma zona en distintas fechas: lo que cambia entre imágenes es la huella de la amenaza.",
    evidencia:
      "Zonas identificadas, amenaza dominante, cuenca afectada y herramienta de conservación propuesta.",
    icon: History,
  },
];

interface Props {
  onActivarCapas: (labels: string[]) => void;
}

const HojaCard = ({ hoja, onActivarCapas }: { hoja: Hoja; onActivarCapas: Props["onActivarCapas"] }) => {
  const [check, setCheck] = useState<boolean[]>(() => hoja.pasos.map(() => false));
  const [evidencia, setEvidencia] = useState("");

  const progreso = Math.round((check.filter(Boolean).length / hoja.pasos.length) * 100);

  return (
    <article className="rounded-2xl border-2 border-paramo/30 bg-surface-raised p-6 md:p-8 card-shadow transition-all duration-300 hover:border-paramo/60 hover:card-shadow-hover">
      <div className="flex items-start justify-between gap-3">
        <div className="h-12 w-12 shrink-0 rounded-xl grid place-items-center bg-paramo/15 text-paramo">
          <hoja.icon className="h-6 w-6" />
        </div>
        <span className="rounded-full bg-paramo/15 px-3 py-1 text-[11px] font-semibold text-paramo">
          {hoja.etiqueta}
        </span>
      </div>

      <h3 className="mt-5 text-base md:text-lg font-semibold leading-snug">{hoja.titulo}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{hoja.objetivo}</p>

      <div className="mt-5 rounded-xl bg-paramo/10 p-4 text-sm leading-relaxed text-paramo">
        <span className="flex items-center gap-2 font-semibold">
          <Target className="h-4 w-4" /> Reto geoespacial
        </span>
        <p className="mt-2 font-medium">{hoja.reto}</p>
      </div>

      <Button
        onClick={() => onActivarCapas(hoja.capas)}
        className="mt-5 w-full min-h-[44px] font-semibold bg-paramo text-paramo-foreground hover:bg-paramo/90"
      >
        <MapPinned className="mr-1 h-4 w-4" />
        Activar capas en el visor
      </Button>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ClipboardList className="h-3.5 w-3.5" /> Ruta de navegación
          </span>
          <span>{progreso}%</span>
        </div>
        <Progress value={progreso} className="mt-2 h-2 [&>div]:bg-paramo" />
        <ul className="mt-4 space-y-3">
          {hoja.pasos.map((paso, i) => (
            <li key={paso} className="flex items-start gap-2.5">
              <Checkbox
                id={`${hoja.id}-${i}`}
                checked={check[i]}
                onCheckedChange={(v) =>
                  setCheck((prev) => prev.map((c, idx) => (idx === i ? !!v : c)))
                }
                className="mt-0.5"
              />
              <label
                htmlFor={`${hoja.id}-${i}`}
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

      <p className="mt-5 flex gap-2 rounded-xl border bg-surface p-4 text-xs leading-relaxed text-muted-foreground">
        <Lightbulb className="h-4 w-4 shrink-0 text-paramo" />
        {hoja.tip}
      </p>

      <div className="mt-5">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Bloque de evidencia
        </label>
        <Textarea
          value={evidencia}
          onChange={(e) => setEvidencia(e.target.value)}
          placeholder={hoja.evidencia}
          className="mt-2 min-h-[104px] text-sm"
        />
      </div>

      <Link to="/guias" className="mt-5 block">
        <Button variant="outline" className="w-full min-h-[44px] font-semibold">
          Abrir hoja de trabajo completa
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </Link>
    </article>
  );
};

const HojasTrabajoSIG = ({ onActivarCapas }: Props) => (
  <div>
    <div className="text-center max-w-2xl mx-auto">
      <span className="text-xs font-semibold uppercase tracking-widest text-paramo">
        Hojas de trabajo
      </span>
      <h2 className="mt-2 text-2xl md:text-3xl font-bold">Guías Didácticas SIG</h2>
      <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
        Retos interactivos que se resuelven activando capas en el visor cartográfico y registrando
        la evidencia obtenida.
      </p>
    </div>

    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {hojas.map((h) => (
        <HojaCard key={h.id} hoja={h} onActivarCapas={onActivarCapas} />
      ))}
    </div>
  </div>
);

export default HojasTrabajoSIG;
