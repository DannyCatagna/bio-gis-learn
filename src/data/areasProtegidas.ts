export type Region = "Costa" | "Sierra" | "Amazonía";
export type Categoria =
  | "Parques Nacionales"
  | "Reservas Ecológicas"
  | "Refugios de Vida Silvestre";

export interface AreaProtegida {
  id: string;
  nombre: string;
  region: Region;
  categoria: Categoria;
  hectareas: number;
  provincia: string;
  anio: number;
  altitud: string;
  descripcion: string;
  reto: string;
  /** Coordenadas para el visor SIG */
  coords: [number, number];
}

export const areasProtegidas: AreaProtegida[] = [
  {
    id: "cotopaxi",
    nombre: "Parque Nacional Cotopaxi",
    region: "Sierra",
    categoria: "Parques Nacionales",
    hectareas: 32255,
    provincia: "Cotopaxi, Napo y Pichincha",
    anio: 1975,
    altitud: "3.400 – 5.897 m s.n.m.",
    descripcion:
      "Páramo de pajonal y bosque de pino alrededor del volcán activo más emblemático del Ecuador. Refugio del lobo de páramo, el venado de cola blanca y el cóndor andino.",
    reto: "Derretimiento glaciar y turismo no regulado.",
    coords: [-0.6806, -78.4372],
  },
  {
    id: "yasuni",
    nombre: "Parque Nacional Yasuní",
    region: "Amazonía",
    categoria: "Parques Nacionales",
    hectareas: 1022736,
    provincia: "Orellana y Pastaza",
    anio: 1979,
    altitud: "190 – 400 m s.n.m.",
    descripcion:
      "Reserva de Biosfera y uno de los puntos con mayor diversidad biológica del planeta: bosque húmedo tropical, territorio waorani y zona intangible de pueblos en aislamiento.",
    reto: "Extracción petrolera y deforestación.",
    coords: [-0.9833, -75.9],
  },
  {
    id: "machalilla",
    nombre: "Parque Nacional Machalilla",
    region: "Costa",
    categoria: "Parques Nacionales",
    hectareas: 41756,
    provincia: "Manabí",
    anio: 1979,
    altitud: "0 – 840 m s.n.m.",
    descripcion:
      "Único parque que protege bosque seco tropical, bosque de garúa y ecosistemas marino-costeros. Zona de avistamiento de ballenas jorobadas y anidación de aves marinas.",
    reto: "Pesca ilegal y contaminación plástica.",
    coords: [-1.5333, -80.7667],
  },
  {
    id: "antisana",
    nombre: "Reserva Ecológica Antisana",
    region: "Sierra",
    categoria: "Reservas Ecológicas",
    hectareas: 120000,
    provincia: "Napo y Pichincha",
    anio: 1993,
    altitud: "1.200 – 5.758 m s.n.m.",
    descripcion:
      "Complejo de páramos, humedales altoandinos y bosque montano que abastece de agua a Quito. Hábitat clave del oso andino y de la mayor población de cóndores del país.",
    reto: "Presión sobre las zonas de importancia hídrica.",
    coords: [-0.4833, -78.1417],
  },
  {
    id: "cayambe-coca",
    nombre: "Parque Nacional Cayambe Coca",
    region: "Sierra",
    categoria: "Parques Nacionales",
    hectareas: 403103,
    provincia: "Imbabura, Pichincha, Napo y Sucumbíos",
    anio: 1970,
    altitud: "600 – 5.790 m s.n.m.",
    descripcion:
      "Gradiente altitudinal excepcional que conecta el nevado Cayambe con la Amazonía baja, con más de 900 especies de aves registradas.",
    reto: "Avance de la frontera agrícola y ganadería de altura.",
    coords: [-0.3667, -77.9833],
  },
  {
    id: "el-angel",
    nombre: "Reserva Ecológica El Ángel",
    region: "Sierra",
    categoria: "Reservas Ecológicas",
    hectareas: 15715,
    provincia: "Carchi",
    anio: 1992,
    altitud: "3.644 – 4.768 m s.n.m.",
    descripcion:
      "Páramo húmedo dominado por frailejones con hojas en roseta recubiertas de densas vellosidades blanquecinas, esponja hídrica del norte del país.",
    reto: "Quema de pajonal y expansión del cultivo de papa.",
    coords: [0.7167, -77.9333],
  },
  {
    id: "manglares-churute",
    nombre: "Reserva Ecológica Manglares Churute",
    region: "Costa",
    categoria: "Reservas Ecológicas",
    hectareas: 50068,
    provincia: "Guayas",
    anio: 1979,
    altitud: "0 – 700 m s.n.m.",
    descripcion:
      "Sitio Ramsar con manglar, bosque seco y humedales del Golfo de Guayaquil; refugio del mono aullador y de aves migratorias playeras.",
    reto: "Expansión camaronera y tala de manglar.",
    coords: [-2.4333, -79.6667],
  },
  {
    id: "cuyabeno",
    nombre: "Reserva de Producción Faunística Cuyabeno",
    region: "Amazonía",
    categoria: "Reservas Ecológicas",
    hectareas: 590112,
    provincia: "Sucumbíos y Orellana",
    anio: 1979,
    altitud: "177 – 326 m s.n.m.",
    descripcion:
      "Sistema lacustre amazónico con bosque inundable (igapó), delfines rosados, manatíes y territorios de las nacionalidades siona, secoya y cofán.",
    reto: "Derrames petroleros y turismo de alta carga.",
    coords: [-0.0167, -76.1833],
  },
  {
    id: "pasochoa",
    nombre: "Refugio de Vida Silvestre Pasochoa",
    region: "Sierra",
    categoria: "Refugios de Vida Silvestre",
    hectareas: 500,
    provincia: "Pichincha",
    anio: 1996,
    altitud: "2.700 – 4.200 m s.n.m.",
    descripcion:
      "Uno de los últimos remanentes de bosque andino primario del callejón interandino, dentro del cráter de un volcán extinto.",
    reto: "Fragmentación por urbanización del valle de los Chillos.",
    coords: [-0.4333, -78.4833],
  },
  {
    id: "isla-corazon",
    nombre: "Refugio de Vida Silvestre Isla Corazón y Fragatas",
    region: "Costa",
    categoria: "Refugios de Vida Silvestre",
    hectareas: 2811,
    provincia: "Manabí",
    anio: 2002,
    altitud: "0 – 5 m s.n.m.",
    descripcion:
      "Manglar del estuario del río Chone que alberga la mayor colonia de fragatas del Ecuador continental, gestionado con turismo comunitario.",
    reto: "Sedimentación del estuario y presión camaronera.",
    coords: [-0.6333, -80.35],
  },
  {
    id: "el-zarza",
    nombre: "Refugio de Vida Silvestre El Zarza",
    region: "Amazonía",
    categoria: "Refugios de Vida Silvestre",
    hectareas: 3643,
    provincia: "Zamora Chinchipe",
    anio: 2006,
    altitud: "900 – 2.000 m s.n.m.",
    descripcion:
      "Bosque montano de la Cordillera del Cóndor, con alto endemismo de anfibios y orquídeas en suelos de arenisca.",
    reto: "Minería metálica a gran escala en el entorno.",
    coords: [-3.7833, -78.5833],
  },
  {
    id: "sangay",
    nombre: "Parque Nacional Sangay",
    region: "Amazonía",
    categoria: "Parques Nacionales",
    hectareas: 502105,
    provincia: "Chimborazo, Morona Santiago, Tungurahua y Cañar",
    anio: 1975,
    altitud: "900 – 5.319 m s.n.m.",
    descripcion:
      "Patrimonio Natural de la Humanidad: volcanes activos, páramos y bosque nublado amazónico con tapir de montaña y oso andino.",
    reto: "Carretera Guamote–Macas y ganadería extensiva.",
    coords: [-2.0, -78.3333],
  },
];

export const regionStyles: Record<Region, { chip: string; dot: string; grad: string }> = {
  Amazonía: {
    chip: "bg-jungle/15 text-jungle border-jungle/30",
    dot: "bg-jungle",
    grad: "from-jungle/80 via-jungle/40 to-jungle/10",
  },
  Sierra: {
    chip: "bg-paramo/15 text-paramo border-paramo/30",
    dot: "bg-paramo",
    grad: "from-paramo/80 via-paramo/40 to-paramo/10",
  },
  Costa: {
    chip: "bg-ocean/15 text-ocean border-ocean/30",
    dot: "bg-ocean",
    grad: "from-ocean/80 via-ocean/40 to-ocean/10",
  },
};
