import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Bird, Leaf, Sparkles, Scale, ShieldCheck, HeartPulse } from "lucide-react";

type Tono = "jungle" | "ocean" | "paramo";

const tonoChip: Record<Tono, string> = {
  jungle: "bg-jungle/10 text-jungle",
  ocean: "bg-ocean/10 text-ocean",
  paramo: "bg-paramo/15 text-paramo",
};

interface Subtema {
  icon: typeof Leaf;
  titulo: string;
  resumen: string;
  puntos: string[];
  tono: Tono;
}

const unidad2: Subtema[] = [
  {
    icon: Sparkles,
    titulo: "Diversidad de las especies",
    resumen:
      "La diversidad específica describe la riqueza (número de especies) y la equidad (abundancia relativa) presentes en un territorio. Ecuador concentra una riqueza excepcional por unidad de superficie gracias al gradiente altitudinal andino, la influencia de las corrientes marinas y la conexión amazónica.",
    puntos: [
      "Riqueza: número total de especies registradas en un área.",
      "Equidad: cómo se reparten los individuos entre esas especies.",
      "Gradiente altitudinal: de 0 a más de 6.000 m s.n.m. en menos de 200 km.",
      "Escalas de análisis: diversidad alfa (local), beta (recambio) y gamma (regional).",
    ],
    tono: "jungle",
  },
  {
    icon: Bird,
    titulo: "Flora y fauna del Ecuador",
    resumen:
      "Las cuatro regiones naturales (Costa, Sierra, Amazonía e Insular) sostienen formaciones vegetales que van del manglar y bosque seco al bosque húmedo tropical, bosque nublado y páramo, cada una con comunidades faunísticas asociadas.",
    puntos: [
      "Costa: manglar, bosque seco tropical y bosque húmedo del Chocó.",
      "Sierra: bosque montano, bosque nublado y páramo de pajonal y frailejones.",
      "Amazonía: bosque húmedo tropical con la mayor riqueza de árboles por hectárea.",
      "Fauna emblemática: oso andino, cóndor, jaguar, danta amazónica, mono araña.",
    ],
    tono: "ocean",
  },
  {
    icon: Leaf,
    titulo: "Especies endémicas",
    resumen:
      "Una especie endémica es aquella cuya distribución natural está restringida a un territorio determinado. El endemismo ecuatoriano se concentra en islas, páramos aislados y estribaciones andinas, lo que lo hace altamente vulnerable a la pérdida de hábitat.",
    puntos: [
      "Endemismo insular: Galápagos, con especies exclusivas por isla.",
      "Endemismo altoandino: frailejones y plantas en roseta del páramo húmedo.",
      "Endemismo del Chocó Andino: anfibios y orquídeas de rango restringido.",
      "Regla clave: a menor rango de distribución, mayor riesgo de extinción.",
    ],
    tono: "paramo",
  },
];

const unidad3: Subtema[] = [
  {
    icon: Scale,
    titulo: "Ámbito legal y normativa ecuatoriana",
    resumen:
      "El marco jurídico ecuatoriano reconoce los derechos de la naturaleza y define competencias del Estado para la conservación, el uso sostenible y la restauración de los ecosistemas.",
    puntos: [
      "Constitución (2008): derechos de la naturaleza y deber estatal de conservación.",
      "Código Orgánico del Ambiente (COA) y su reglamento: instrumento rector vigente.",
      "Autoridad ambiental nacional: rectoría, control y declaratoria de áreas protegidas.",
      "Instrumentos: licenciamiento ambiental, planes de manejo y evaluación de impactos.",
    ],
    tono: "ocean",
  },
  {
    icon: ShieldCheck,
    titulo: "Sistema Nacional de Áreas Protegidas (SNAP)",
    resumen:
      "El SNAP integra áreas terrestres, marinas e insulares de importancia ecológica y sociocultural, cuya gestión contribuye a la protección de la biodiversidad, el mantenimiento de los servicios ecosistémicos y el desarrollo sostenible del país.",
    puntos: [
      "81 áreas protegidas declaradas a nivel nacional.",
      "26.477.811 hectáreas conservadas (79,6% marina y 20,4% terrestre).",
      "277 MtC de carbono irrecuperable, equivalentes al 32,6% del total nacional.",
      "Subsistemas: estatal, autónomo descentralizado, comunitario y privado.",
    ],
    tono: "jungle",
  },
  {
    icon: HeartPulse,
    titulo: "Extinción de especies y herramientas de conservación",
    resumen:
      "La extinción es la desaparición definitiva de un linaje. Sus motores principales son la pérdida de hábitat, la sobreexplotación, las especies invasoras, la contaminación y el cambio climático.",
    puntos: [
      "Categorías UICN: LC, NT, VU, EN, CR, EW y EX.",
      "Conservación in situ: áreas protegidas, corredores y restauración ecológica.",
      "Conservación ex situ: bancos de germoplasma, zoocriaderos y jardines botánicos.",
      "Herramientas SIG: modelamiento de nichos, análisis multitemporal y superposición.",
    ],
    tono: "paramo",
  },
];

const ListaSubtemas = ({ items }: { items: Subtema[] }) => (
  <Accordion type="single" collapsible className="w-full">
    {items.map((s) => (
      <AccordionItem key={s.titulo} value={s.titulo} className="border-b last:border-b-0">
        <AccordionTrigger className="py-4 text-left hover:no-underline">
          <span className="flex items-center gap-3">
            <span className={`h-9 w-9 shrink-0 rounded-xl grid place-items-center ${tonoChip[s.tono]}`}>
              <s.icon className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold">{s.titulo}</span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-5">
          <p className="text-sm leading-relaxed text-muted-foreground">{s.resumen}</p>
          <ul className="mt-3 space-y-2">
            {s.puntos.map((p) => (
              <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${tonoChip[s.tono]}`} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

const FundamentacionTeorica = () => (
  <section className="rounded-2xl border bg-surface-raised p-5 md:p-7 card-shadow">
    <div className="flex items-center gap-2 mb-1">
      <BookOpen className="h-5 w-5 text-jungle" />
      <h2 className="text-lg font-bold">Fundamentación teórica</h2>
    </div>
    <p className="text-sm text-muted-foreground mb-5">
      Bases conceptuales de las Unidades 2 y 3 de Biodiversidad del Ecuador.
    </p>

    <Tabs defaultValue="u2">
      <TabsList className="w-full sm:w-auto">
        <TabsTrigger value="u2" className="flex-1 sm:flex-none data-[state=active]:bg-jungle data-[state=active]:text-jungle-foreground">
          Unidad 2 · Especies
        </TabsTrigger>
        <TabsTrigger value="u3" className="flex-1 sm:flex-none data-[state=active]:bg-ocean data-[state=active]:text-ocean-foreground">
          Unidad 3 · Conservación
        </TabsTrigger>
      </TabsList>

      <TabsContent value="u2" className="mt-4">
        <ListaSubtemas items={unidad2} />
      </TabsContent>
      <TabsContent value="u3" className="mt-4">
        <ListaSubtemas items={unidad3} />
      </TabsContent>
    </Tabs>
  </section>
);

export default FundamentacionTeorica;
