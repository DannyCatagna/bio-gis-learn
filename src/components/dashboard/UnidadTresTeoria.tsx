import { Scale, ShieldCheck, HeartPulse, Users } from "lucide-react";

interface Tarjeta {
  icon: typeof Scale;
  titulo: string;
  resumen: string;
  puntos: string[];
}

const tarjetas: Tarjeta[] = [
  {
    icon: Scale,
    titulo: "Ámbito legal y normativa ecuatoriana",
    resumen:
      "El marco jurídico ecuatoriano reconoce derechos a la naturaleza y define las competencias del Estado para la conservación, el uso sostenible y la restauración de los ecosistemas.",
    puntos: [
      "Constitución de 2008: derechos de la naturaleza y deber estatal de conservación.",
      "Código Orgánico del Ambiente (COA) y su reglamento: instrumento rector vigente.",
      "Autoridad ambiental nacional: rectoría, control y declaratoria de áreas protegidas.",
      "Instrumentos de gestión: licenciamiento ambiental, planes de manejo y evaluación de impactos.",
    ],
  },
  {
    icon: ShieldCheck,
    titulo: "Sistema Nacional de Áreas Protegidas (SNAP), Clasificación y Estructura",
    resumen:
      "El SNAP integra áreas terrestres, marinas e insulares de importancia ecológica y sociocultural, cuya gestión protege la biodiversidad, mantiene los servicios ecosistémicos y aporta al desarrollo sostenible del país.",
    puntos: [
      "81 áreas protegidas declaradas a nivel nacional.",
      "26.477.811 hectáreas conservadas (79,6% marina y 20,4% terrestre).",
      "277 MtC de carbono irrecuperable, equivalentes al 32,6% del total nacional.",
      "Subsistemas: estatal, autónomo descentralizado, comunitario y privado.",
      "Categorías de manejo: parque nacional, reserva ecológica, refugio de vida silvestre, reserva marina, entre otras.",
    ],
  },
  {
    icon: HeartPulse,
    titulo: "Extinción de especies, Conservación in-situ y ex-situ",
    resumen:
      "Frente al riesgo de extinción se aplican dos grandes estrategias complementarias: conservar la especie en su hábitat natural o mantenerla bajo condiciones controladas.",
    puntos: [
      "In situ: áreas protegidas, corredores de conectividad y restauración ecológica.",
      "Ex situ: bancos de germoplasma, jardines botánicos, zoocriaderos y centros de rescate.",
      "Programas de reintroducción y control de especies invasoras.",
      "Herramientas SIG: modelamiento de nichos, análisis multitemporal y superposición de capas.",
    ],
  },
  {
    icon: Users,
    titulo: "Estrategias de manejo y Rol de las comunidades en la conservación",
    resumen:
      "La conservación efectiva depende de la gobernanza del territorio: las comunidades locales, indígenas y campesinas son actores directos en el manejo de las áreas y sus zonas de amortiguamiento.",
    puntos: [
      "Zonificación de las áreas protegidas y definición de zonas de amortiguamiento.",
      "Acuerdos de co-manejo y conservación comunitaria dentro del SNAP.",
      "Bioemprendimientos, turismo comunitario y aprovechamiento sostenible.",
      "Monitoreo participativo y conocimiento tradicional aplicado a la gestión.",
    ],
  },
];

const UnidadTresTeoria = () => (
  <div>
    <div className="text-center max-w-2xl mx-auto">
      <span className="text-xs font-semibold uppercase tracking-widest text-ocean">
        Apartado teórico
      </span>
      <h2 className="mt-2 text-2xl md:text-3xl font-bold">
        Unidad 3: Conservación de la Biodiversidad en el Ecuador
      </h2>
      <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
        Marco legal, estructura del Sistema Nacional de Áreas Protegidas y estrategias de
        conservación con participación comunitaria.
      </p>
    </div>

    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {tarjetas.map((t) => (
        <article
          key={t.titulo}
          className="rounded-2xl border border-ocean/25 bg-surface-raised p-6 md:p-8 card-shadow transition-all duration-300 hover:-translate-y-1 hover:border-ocean/60 hover:card-shadow-hover"
        >
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 shrink-0 rounded-xl grid place-items-center bg-ocean/10 text-ocean">
              <t.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-1 text-base md:text-lg font-semibold leading-snug">{t.titulo}</h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.resumen}</p>
          <ul className="mt-5 space-y-2.5 border-l-2 border-ocean/30 pl-4">
            {t.puntos.map((p) => (
              <li key={p} className="text-sm leading-relaxed text-muted-foreground">
                {p}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </div>
);

export default UnidadTresTeoria;
