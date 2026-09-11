import { Sparkles, Bird, Droplets, AlertTriangle } from "lucide-react";

interface Tarjeta {
  icon: typeof Bird;
  titulo: string;
  resumen: string;
  puntos: string[];
}

const tarjetas: Tarjeta[] = [
  {
    icon: Sparkles,
    titulo: "Diversidad de las Especies y Características ambientales",
    resumen:
      "La diversidad específica se mide por la riqueza (número de especies) y la equidad (abundancia relativa). En Ecuador esa riqueza responde a un conjunto de factores ambientales que se concentran en un territorio pequeño.",
    puntos: [
      "Gradiente altitudinal de 0 a más de 6.000 m s.n.m. en menos de 200 km.",
      "Influencia de las corrientes de Humboldt (fría) y de El Niño (cálida).",
      "Posición ecuatorial: luz y temperatura estables durante todo el año.",
      "Escalas de análisis: diversidad alfa (local), beta (recambio) y gamma (regional).",
    ],
  },
  {
    icon: Bird,
    titulo: "Flora y Fauna del Ecuador, Ecosistemas y Especies endémicas",
    resumen:
      "Las cuatro regiones naturales sostienen formaciones vegetales que van del manglar y el bosque seco al bosque húmedo tropical, el bosque nublado y el páramo, cada una con comunidades faunísticas propias.",
    puntos: [
      "Costa: manglar, bosque seco tropical y bosque húmedo del Chocó.",
      "Sierra: bosque montano, bosque nublado y páramo de pajonal y frailejones.",
      "Amazonía: bosque húmedo tropical con la mayor riqueza de árboles por hectárea.",
      "Endemismo: Galápagos, páramos aislados y estribaciones andinas concentran especies de rango restringido.",
      "Fauna emblemática: oso andino, cóndor, jaguar, danta amazónica y mono araña.",
    ],
  },
  {
    icon: Droplets,
    titulo: "Manejo de cuencas hídricas en el Ecuador",
    resumen:
      "Una cuenca hidrográfica es la unidad territorial donde el agua de lluvia drena hacia un mismo cauce. Su manejo integra el uso del suelo, la vegetación de altura y el abastecimiento humano y productivo.",
    puntos: [
      "Vertiente del Pacífico: cuencas del Guayas, Esmeraldas y Jubones.",
      "Vertiente amazónica: cuencas del Napo, Pastaza y Santiago.",
      "El páramo actúa como esponja reguladora y fuente de agua para las ciudades andinas.",
      "Presiones: expansión de la frontera agrícola, quema de pajonal y contaminación minera.",
      "Manejo integrado: protección de cabeceras, reforestación y fondos de agua.",
    ],
  },
  {
    icon: AlertTriangle,
    titulo: "Extinción de las Especies y Amenazas para la pérdida de la Biodiversidad",
    resumen:
      "La extinción es la desaparición definitiva de un linaje. En Ecuador el riesgo se agrava porque muchas especies tienen distribuciones muy reducidas.",
    puntos: [
      "Pérdida y fragmentación de hábitat por deforestación y frontera agrícola.",
      "Sobreexplotación: cacería, tráfico de fauna y pesca no regulada.",
      "Especies invasoras, sobre todo en el archipiélago de Galápagos.",
      "Contaminación por actividades extractivas y agroquímicos.",
      "Cambio climático: desplazamiento altitudinal de los ecosistemas de montaña.",
      "Categorías UICN de amenaza: LC, NT, VU, EN, CR, EW y EX.",
    ],
  },
];

const UnidadDosTeoria = () => (
  <div>
    <div className="text-center max-w-2xl mx-auto">
      <span className="text-xs font-semibold uppercase tracking-widest text-jungle">
        Apartado teórico
      </span>
      <h2 className="mt-2 text-2xl md:text-3xl font-bold">
        Unidad 2: Ecuador, País Megadiverso
      </h2>
      <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
        Bases conceptuales sobre la diversidad biológica del país, sus ecosistemas, el agua como
        recurso territorial y las amenazas que la ponen en riesgo.
      </p>
    </div>

    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {tarjetas.map((t) => (
        <article
          key={t.titulo}
          className="rounded-2xl border-2 border-jungle/30 bg-surface-raised p-6 md:p-8 card-shadow transition-all duration-300 hover:-translate-y-1 hover:border-jungle/60 hover:card-shadow-hover"
        >
          <div className="h-12 w-12 rounded-xl grid place-items-center bg-jungle/10 text-jungle">
            <t.icon className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-base md:text-lg font-semibold leading-snug">{t.titulo}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.resumen}</p>
          <ul className="mt-5 space-y-2.5">
            {t.puntos.map((p) => (
              <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-jungle" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </div>
);

export default UnidadDosTeoria;
