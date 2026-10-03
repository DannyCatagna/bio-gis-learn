import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Leaf, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// Fix default marker icons (Leaflet + bundlers)
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

type Category =
  | "Parques Nacionales"
  | "Reservas Ecológicas"
  | "Reservas Biológicas"
  | "Refugios de Vida Silvestre"
  | "Áreas Nacionales de Recreación"
  | "Reservas de Producción de Fauna"
  | "Reservas Marinas"
  | "Áreas Ecológicas de Conservación"
  | "Áreas Protegidas Privadas"
  | "Áreas Protegidas Comunitarias";

interface ProtectedArea {
  id: string;
  name: string;
  category: Category;
  position: [number, number];
  zoom: number;
  description: string;
  status: string;
}

const baseAreas: ProtectedArea[] = [
  // ========== PARQUES NACIONALES ==========
  {
    id: "yasuni",
    name: "P.N. Yasuní",
    category: "Parques Nacionales",
    position: [-0.9833, -76.3833],
    zoom: 9,
    description:
      "Uno de los lugares con mayor biodiversidad del planeta. Alberga miles de especies en plena Amazonía ecuatoriana.",
    status: "Reserva de Biósfera UNESCO",
  },
  {
    id: "cotopaxi",
    name: "P.N. Cotopaxi",
    category: "Parques Nacionales",
    position: [-0.6803, -78.4378],
    zoom: 11,
    description:
      "Ecosistema de páramo andino dominado por el volcán Cotopaxi (5897 m). Hábitat de cóndores y lobos de páramo.",
    status: "Área protegida del SNAP — Sierra",
  },
  {
    id: "cajas",
    name: "P.N. Cajas",
    category: "Parques Nacionales",
    position: [-2.8456, -79.2256],
    zoom: 11,
    description:
      "Sistema lacustre de páramo con más de 200 lagunas. Fuente principal de agua para Cuenca.",
    status: "Sitio Ramsar",
  },
  {
    id: "machalilla",
    name: "P.N. Machalilla",
    category: "Parques Nacionales",
    position: [-1.5167, -80.7667],
    zoom: 10,
    description:
      "Único parque nacional costero del Ecuador continental. Bosque seco tropical e Isla de la Plata.",
    status: "Área marino-costera protegida",
  },
  {
    id: "sangay",
    name: "P.N. Sangay",
    category: "Parques Nacionales",
    position: [-2.0, -78.3333],
    zoom: 9,
    description:
      "Patrimonio Natural de la Humanidad. Combina volcanes activos, páramo, bosque andino y selva amazónica.",
    status: "Patrimonio Natural UNESCO",
  },
  {
    id: "podocarpus",
    name: "P.N. Podocarpus",
    category: "Parques Nacionales",
    position: [-4.1167, -79.1],
    zoom: 10,
    description:
      "Refugio de los últimos bosques de romerillo (Podocarpus). Alta endemicidad de aves y orquídeas.",
    status: "Reserva de Biósfera",
  },
  {
    id: "sumaco",
    name: "P.N. Sumaco-Napo Galeras",
    category: "Parques Nacionales",
    position: [-0.5667, -77.6333],
    zoom: 10,
    description:
      "Volcán Sumaco rodeado de bosque amazónico premontano. Reserva de Biósfera de la UNESCO.",
    status: "Reserva de Biósfera UNESCO",
  },
  {
    id: "llanganates",
    name: "P.N. Llanganates",
    category: "Parques Nacionales",
    position: [-1.1667, -78.3333],
    zoom: 10,
    description:
      "Páramos, bosques nublados y lagunas. Refugio del tapir andino y leyenda del tesoro de Atahualpa.",
    status: "Sitio Ramsar",
  },
  {
    id: "cayambe-coca",
    name: "P.N. Cayambe-Coca",
    category: "Parques Nacionales",
    position: [-0.0333, -77.9833],
    zoom: 9,
    description:
      "Desde el nevado Cayambe hasta la Amazonía. Gradiente altitudinal único con osos andinos.",
    status: "Área del SNAP",
  },
  {
    id: "yacuri",
    name: "P.N. Yacuri",
    category: "Parques Nacionales",
    position: [-4.7, -79.4333],
    zoom: 11,
    description:
      "Páramo del sur con más de 70 lagunas. Conexión binacional Ecuador-Perú.",
    status: "Área del SNAP",
  },
  {
    id: "rio-negro",
    name: "P.N. Río Negro - Sopladora",
    category: "Parques Nacionales",
    position: [-2.85, -78.55],
    zoom: 11,
    description:
      "Bosques montanos altos y páramo en la cuenca del río Paute, clave para hidroeléctricas del Austro.",
    status: "Área del SNAP",
  },

  // ========== RESERVAS ECOLÓGICAS ==========
  {
    id: "cotacachi-cayapas",
    name: "R.E. Cotacachi-Cayapas",
    category: "Reservas Ecológicas",
    position: [0.3667, -78.35],
    zoom: 10,
    description:
      "Bosque nublado y laguna de Cuicocha. Una de las áreas con mayor diversidad biológica del Ecuador.",
    status: "Reserva Ecológica del SNAP",
  },
  {
    id: "cayapas-mataje",
    name: "R.E. Cayapas-Mataje",
    category: "Reservas Ecológicas",
    position: [1.4, -79.0167],
    zoom: 10,
    description:
      "Manglares más altos del mundo (hasta 60 m). Hábitat clave de cangrejos, conchas y aves migratorias.",
    status: "Sitio Ramsar",
  },
  {
    id: "antisana",
    name: "R.E. Antisana",
    category: "Reservas Ecológicas",
    position: [-0.4833, -78.1417],
    zoom: 10,
    description:
      "Páramo dominado por el volcán Antisana (5704 m). Refugio del cóndor andino.",
    status: "Reserva Ecológica del SNAP",
  },
  {
    id: "el-angel",
    name: "R.E. El Ángel",
    category: "Reservas Ecológicas",
    position: [0.7333, -77.9],
    zoom: 11,
    description:
      "Páramo de frailejones (Espeletia pycnophylla), ecosistema único en el norte ecuatoriano.",
    status: "Sitio Ramsar",
  },
  {
    id: "los-illinizas",
    name: "R.E. Los Illinizas",
    category: "Reservas Ecológicas",
    position: [-0.6667, -78.7167],
    zoom: 10,
    description:
      "Volcanes Illinizas y laguna del Quilotoa. Páramo, bosque andino y subtropical.",
    status: "Reserva Ecológica del SNAP",
  },
  {
    id: "manglares-churute",
    name: "R.E. Manglares Churute",
    category: "Reservas Ecológicas",
    position: [-2.45, -79.65],
    zoom: 11,
    description:
      "Manglares, bosque seco y la laguna del Canclón. Importante hábitat de aves acuáticas en el Golfo de Guayaquil.",
    status: "Sitio Ramsar",
  },
  {
    id: "mache-chindul",
    name: "R.E. Mache-Chindul",
    category: "Reservas Ecológicas",
    position: [0.4, -79.7333],
    zoom: 11,
    description:
      "Bosque húmedo tropical del Chocó ecuatoriano, uno de los hotspots de biodiversidad más amenazados.",
    status: "Reserva Ecológica del SNAP",
  },
  {
    id: "arenillas",
    name: "R.E. Arenillas",
    category: "Reservas Ecológicas",
    position: [-3.55, -80.15],
    zoom: 12,
    description:
      "Bosque seco y manglares fronterizos con Perú. Refugio de fauna del bosque seco tumbesino.",
    status: "Reserva Ecológica del SNAP",
  },

  // ========== RESERVAS BIOLÓGICAS ==========
  {
    id: "limoncocha",
    name: "R.B. Limoncocha",
    category: "Reservas Biológicas",
    position: [-0.4, -76.6167],
    zoom: 12,
    description:
      "Laguna amazónica con caimán negro, delfines rosados y rica avifauna. Importante humedal.",
    status: "Sitio Ramsar",
  },
  {
    id: "el-condor",
    name: "R.B. El Cóndor",
    category: "Reservas Biológicas",
    position: [-3.6167, -78.3833],
    zoom: 11,
    description:
      "Cordillera del Cóndor en frontera con Perú. Mesetas de arenisca con flora endémica única.",
    status: "Reserva Biológica del SNAP",
  },
  {
    id: "cerro-plateado",
    name: "R.B. Cerro Plateado",
    category: "Reservas Biológicas",
    position: [-4.5, -78.8833],
    zoom: 11,
    description:
      "Bosques montanos y mesetas tepuyanas amazónicas con altísima endemicidad de plantas.",
    status: "Reserva Biológica del SNAP",
  },
  {
    id: "colonso-chalupas",
    name: "R.B. Colonso-Chalupas",
    category: "Reservas Biológicas",
    position: [-1.0833, -77.85],
    zoom: 10,
    description:
      "Conexión entre los Andes y la Amazonía. Refugio del jaguar, oso de anteojos y tapir.",
    status: "Reserva Biológica del SNAP",
  },

  // ========== REFUGIOS DE VIDA SILVESTRE ==========
  {
    id: "pasochoa",
    name: "R.V.S. Pasochoa",
    category: "Refugios de Vida Silvestre",
    position: [-0.4667, -78.4833],
    zoom: 13,
    description:
      "Cráter volcánico extinto con uno de los últimos remanentes de bosque andino primario cerca de Quito.",
    status: "Refugio del SNAP",
  },
  {
    id: "isla-corazon",
    name: "R.V.S. Isla Corazón y Fragatas",
    category: "Refugios de Vida Silvestre",
    position: [-0.6, -80.4167],
    zoom: 13,
    description:
      "Manglares y colonia de fragatas magníficas en el estuario del río Chone (Manabí).",
    status: "Refugio Marino-Costero",
  },
  {
    id: "manglares-estuario-rio-muisne",
    name: "R.V.S. Estuario Río Muisne",
    category: "Refugios de Vida Silvestre",
    position: [0.6, -80.0167],
    zoom: 12,
    description:
      "Sistema de manglares de Esmeraldas, vital para la pesca artesanal y aves migratorias.",
    status: "Refugio Marino-Costero",
  },
  {
    id: "manglares-el-morro",
    name: "R.V.S. Manglares El Morro",
    category: "Refugios de Vida Silvestre",
    position: [-2.6833, -80.2833],
    zoom: 12,
    description:
      "Manglares del Golfo de Guayaquil. Hábitat del delfín nariz de botella costero.",
    status: "Refugio Marino-Costero",
  },
  {
    id: "el-pambilar",
    name: "R.V.S. El Pambilar",
    category: "Refugios de Vida Silvestre",
    position: [0.5667, -79.3],
    zoom: 12,
    description:
      "Bosque húmedo tropical del Chocó en Esmeraldas, uno de los últimos remanentes en pie.",
    status: "Refugio del SNAP",
  },
  {
    id: "la-chiquita",
    name: "R.V.S. La Chiquita",
    category: "Refugios de Vida Silvestre",
    position: [1.2333, -78.9],
    zoom: 13,
    description:
      "Bosque húmedo tropical del norte de Esmeraldas, gestionado con comunidades afroecuatorianas.",
    status: "Refugio del SNAP",
  },
  {
    id: "el-zarza",
    name: "R.V.S. El Zarza",
    category: "Refugios de Vida Silvestre",
    position: [-3.7833, -78.55],
    zoom: 13,
    description:
      "Bosque siempreverde montano bajo amazónico en Zamora Chinchipe.",
    status: "Refugio del SNAP",
  },
  {
    id: "manglares-el-salado",
    name: "R.V.S. Manglares El Salado",
    category: "Refugios de Vida Silvestre",
    position: [-2.2667, -79.95],
    zoom: 12,
    description:
      "Manglares urbanos de Guayaquil, importantes para la educación ambiental y la regulación hídrica.",
    status: "Refugio del SNAP",
  },
  {
    id: "marino-costero-pacoche",
    name: "R.V.S. Marino-Costero Pacoche",
    category: "Refugios de Vida Silvestre",
    position: [-1.0667, -80.85],
    zoom: 11,
    description:
      "Bosque húmedo de garúa y zona marina protegida en la costa de Manabí.",
    status: "Refugio Marino-Costero",
  },

  // ========== ÁREAS NACIONALES DE RECREACIÓN ==========
  {
    id: "el-boliche",
    name: "A.N.R. El Boliche",
    category: "Áreas Nacionales de Recreación",
    position: [-0.6, -78.4833],
    zoom: 13,
    description:
      "Bosque de pinos y eucaliptos junto al Cotopaxi. Área de recreación familiar y educación ambiental.",
    status: "Área de Recreación del SNAP",
  },
  {
    id: "parque-lago",
    name: "A.N.R. Parque Lago",
    category: "Áreas Nacionales de Recreación",
    position: [-2.1833, -80.05],
    zoom: 13,
    description:
      "Embalse Chongón en la costa, espacio de deportes acuáticos y aves migratorias.",
    status: "Área de Recreación del SNAP",
  },
  {
    id: "samanes",
    name: "A.N.R. Los Samanes",
    category: "Áreas Nacionales de Recreación",
    position: [-2.1167, -79.8833],
    zoom: 14,
    description:
      "Pulmón verde de Guayaquil, deportes y eventos en el corazón urbano.",
    status: "Área de Recreación del SNAP",
  },
  {
    id: "isla-santay",
    name: "A.N.R. Isla Santay",
    category: "Áreas Nacionales de Recreación",
    position: [-2.2167, -79.85],
    zoom: 13,
    description:
      "Isla fluvial frente a Guayaquil. Sitio Ramsar con manglares y comunidad sostenible.",
    status: "Sitio Ramsar",
  },
  {
    id: "playas-villamil",
    name: "A.N.R. Playas de Villamil",
    category: "Áreas Nacionales de Recreación",
    position: [-2.6333, -80.4],
    zoom: 12,
    description:
      "Franja costera con playas y zonas de descanso en la provincia del Guayas.",
    status: "Área de Recreación del SNAP",
  },
  {
    id: "quimsacocha",
    name: "A.N.R. Quimsacocha",
    category: "Áreas Nacionales de Recreación",
    position: [-3.05, -79.2333],
    zoom: 12,
    description:
      "Páramo de tres lagunas (Quimsa Cocha) clave para el agua de Cuenca.",
    status: "Área de Recreación del SNAP",
  },

  // ========== RESERVAS DE PRODUCCIÓN DE FAUNA ==========
  {
    id: "chimborazo",
    name: "R.P.F. Chimborazo",
    category: "Reservas de Producción de Fauna",
    position: [-1.4692, -78.8175],
    zoom: 10,
    description:
      "Páramo del volcán Chimborazo (6263 m). Manejo de vicuñas, llamas y alpacas con comunidades indígenas.",
    status: "Reserva de Producción de Fauna",
  },
  {
    id: "cuyabeno",
    name: "R.P.F. Cuyabeno",
    category: "Reservas de Producción de Fauna",
    position: [-0.0167, -76.1833],
    zoom: 9,
    description:
      "Sistema de lagunas amazónicas con delfines rosados, anacondas y nacionalidades indígenas.",
    status: "Sitio Ramsar",
  },
  {
    id: "manglares-el-salado-pf",
    name: "R.P.F. Puntilla de Santa Elena",
    category: "Reservas de Producción de Fauna",
    position: [-2.2, -81.0],
    zoom: 11,
    description:
      "Reserva marina y costera con avistamiento de ballenas jorobadas y aves marinas.",
    status: "Reserva Marino-Costera",
  },

  // ========== RESERVAS MARINAS ==========
  {
    id: "rm-galera-san-francisco",
    name: "R.M. Galera-San Francisco",
    category: "Reservas Marinas",
    position: [0.8167, -80.0667],
    zoom: 11,
    description:
      "Primera reserva marina del Ecuador continental. Arrecifes rocosos y tortugas marinas.",
    status: "Reserva Marina del SNAP",
  },
  {
    id: "rm-cantagallo-machalilla",
    name: "R.M. Cantagallo-Machalilla",
    category: "Reservas Marinas",
    position: [-1.5333, -80.85],
    zoom: 10,
    description:
      "Zona marina anexa al P.N. Machalilla, importante para ballenas jorobadas y peces pelágicos.",
    status: "Reserva Marina del SNAP",
  },

  // ========== ÁREAS ECOLÓGICAS DE CONSERVACIÓN ==========
  {
    id: "siete-iglesias",
    name: "A.E.C.M. Siete Iglesias",
    category: "Áreas Ecológicas de Conservación",
    position: [-3.0833, -78.5167],
    zoom: 11,
    description:
      "Área ecológica municipal de San Juan Bosco (Morona Santiago). Bosque nublado andino-amazónico.",
    status: "Área Municipal del SNAP",
  },
];


const mk = (
  name: string,
  category: Category,
  position: [number, number],
  description: string,
  status = "Área del SNAP",
): ProtectedArea => ({
  id: name.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-"),
  name,
  category,
  position,
  zoom: 12,
  description,
  status,
});

const extraAreas: ProtectedArea[] = [
  mk("R.E. Cofán Bermejo", "Reservas Ecológicas", [0.33, -77.3], "Bosque amazónico de piedemonte en territorio de la nacionalidad A'i Cofán (Sucumbíos)."),
  mk("R.B. El Quimi", "Reservas Biológicas", [-3.52, -78.38], "Mesetas de arenisca de la Cordillera del Cóndor con flora endémica."),
  mk("R.M. El Pelado", "Reservas Marinas", [-1.93, -80.79], "Islote y arrecifes rocosos frente a Ayangue, Santa Elena."),
  mk("R.M. Bajo Copé", "Reservas Marinas", [-2.0, -81.05], "Bajo submarino de alta productividad pesquera frente a Santa Elena."),
  mk("R.V.S. Isla Santa Clara", "Refugios de Vida Silvestre", [-3.17, -80.43], "Isla del Golfo de Guayaquil, colonia de piqueros y fragatas."),
  mk("R.V.S. Manglares Estuario Río Esmeraldas", "Refugios de Vida Silvestre", [0.95, -79.65], "Manglar urbano-estuarino de la ciudad de Esmeraldas."),
  mk("A.E.C.M. Tinajillas-Río Gualaceño", "Áreas Ecológicas de Conservación", [-3.2, -78.65], "Páramo y bosque montano del cantón Limón Indanza."),
  mk("A.E.C.M. Paltas", "Áreas Ecológicas de Conservación", [-4.05, -79.65], "Bosque seco y montano del cantón Paltas, Loja."),
  mk("A.E.C.M. Yacuambi", "Áreas Ecológicas de Conservación", [-3.6, -78.92], "Bosque montano de Zamora Chinchipe, recarga hídrica comunitaria."),
  mk("A.E.C.M. Huashapamba", "Áreas Ecológicas de Conservación", [-3.68, -79.28], "Bosque nublado de Saraguro, gestionado con el pueblo kichwa Saraguro."),
  mk("A.E.C.M. Celica", "Áreas Ecológicas de Conservación", [-4.1, -79.95], "Bosque andino del occidente lojano."),
  mk("A.E.C.M. Pindal", "Áreas Ecológicas de Conservación", [-4.12, -80.1], "Remanentes de bosque seco tumbesino."),
  mk("A.E.C.M. Zapotillo", "Áreas Ecológicas de Conservación", [-4.38, -80.24], "Bosque seco de ceibos, Reserva de Biósfera del Bosque Seco."),
  mk("A.E.C.M. Puyango", "Áreas Ecológicas de Conservación", [-3.88, -80.08], "Bosque petrificado con troncos fósiles y bosque seco."),
  mk("A.E.C.M. Mazán", "Áreas Ecológicas de Conservación", [-2.87, -79.12], "Bosque andino que protege fuentes de agua de Cuenca."),
  mk("A.E.C.M. Cerro de Hayas", "Áreas Ecológicas de Conservación", [-2.73, -79.62], "Bosque húmedo de estribación occidental en Naranjal."),
  mk("A.E.C.M. La Bonita", "Áreas Ecológicas de Conservación", [0.48, -77.55], "Bosque montano del cantón Sucumbíos, corredor andino-amazónico."),
  mk("A.P.P. Jama-Coaque", "Áreas Protegidas Privadas", [-0.12, -80.11], "Bosque húmedo tropical costero de Manabí.", "Subsistema privado"),
  mk("A.P.P. Bosque Seco Lalo Loor", "Áreas Protegidas Privadas", [-0.08, -80.15], "Transición bosque seco-húmedo en Jama.", "Subsistema privado"),
  mk("A.P.P. Ayampe", "Áreas Protegidas Privadas", [-1.67, -80.79], "Bosque de garúa, hábitat del colibrí estrellita esmeraldeña.", "Subsistema privado"),
  mk("A.P.P. Cerro Blanco", "Áreas Protegidas Privadas", [-2.18, -80.02], "Bosque seco tropical junto a Guayaquil, refugio del papagayo de Guayaquil.", "Subsistema privado"),
  mk("A.P.P. Maquipucuna", "Áreas Protegidas Privadas", [0.12, -78.63], "Bosque nublado del Chocó Andino, avistamiento del oso andino.", "Subsistema privado"),
  mk("A.P.P. Yanacocha", "Áreas Protegidas Privadas", [-0.11, -78.58], "Bosque altoandino del Pichincha, hogar del zamarrito pechinegro.", "Subsistema privado"),
  mk("A.P.P. Tapichalaca", "Áreas Protegidas Privadas", [-4.49, -79.13], "Bosque nublado donde se descubrió el gralaria jocotoco.", "Subsistema privado"),
  mk("A.P.P. Buenaventura", "Áreas Protegidas Privadas", [-3.65, -79.77], "Bosque nublado de El Oro, hábitat del perico de El Oro.", "Subsistema privado"),
  mk("A.P.P. Copalinga", "Áreas Protegidas Privadas", [-4.09, -78.96], "Bosque premontano junto al P.N. Podocarpus.", "Subsistema privado"),
  mk("A.P.P. Mashpi", "Áreas Protegidas Privadas", [0.16, -78.87], "Bosque nublado del Chocó Andino con alta endemicidad.", "Subsistema privado"),
  mk("A.P.P. Río Canandé", "Áreas Protegidas Privadas", [0.52, -79.13], "Bosque húmedo del Chocó en Esmeraldas.", "Subsistema privado"),
  mk("A.P.P. Río Silanche", "Áreas Protegidas Privadas", [0.13, -79.14], "Remanente de bosque piemontano del Chocó.", "Subsistema privado"),
  mk("A.P.P. Las Gralarias", "Áreas Protegidas Privadas", [-0.01, -78.73], "Bosque nublado de Mindo con anfibios amenazados.", "Subsistema privado"),
  mk("A.P.P. Narupa", "Áreas Protegidas Privadas", [-0.7, -77.75], "Bosque de estribación amazónica en Napo.", "Subsistema privado"),
  mk("A.P.C. Tambillo", "Áreas Protegidas Comunitarias", [-0.43, -78.55], "Bosque andino gestionado por la comunidad.", "Subsistema comunitario"),
  mk("A.P.C. Cuenca Alta del Río Oyacachi", "Áreas Protegidas Comunitarias", [-0.21, -78.06], "Páramo y bosque andino de la comunidad kichwa de Oyacachi.", "Subsistema comunitario"),
  mk("A.P.C. Kawsak Sacha (Sarayaku)", "Áreas Protegidas Comunitarias", [-1.73, -77.48], "Selva Viviente del pueblo kichwa de Sarayaku, Pastaza.", "Subsistema comunitario"),
];

const areas: ProtectedArea[] = [...baseAreas, ...extraAreas];

const categories: Category[] = [
  "Parques Nacionales",
  "Reservas Ecológicas",
  "Reservas Biológicas",
  "Refugios de Vida Silvestre",
  "Áreas Nacionales de Recreación",
  "Reservas de Producción de Fauna",
  "Reservas Marinas",
  "Áreas Ecológicas de Conservación",
  "Áreas Protegidas Privadas",
  "Áreas Protegidas Comunitarias",
];

const FlyToHandler = ({ target }: { target: ProtectedArea | null }) => {
  const map = useMap();
  if (target) {
    map.flyTo(target.position, target.zoom, { duration: 1.5 });
  }
  return null;
};

const MapaInteractivo = () => {
  const [selected, setSelected] = useState<ProtectedArea | null>(null);
  const markerRefs = useRef<Record<string, L.Marker | null>>({});

  const handleSelect = (area: ProtectedArea) => {
    setSelected(area);
    setTimeout(() => {
      markerRefs.current[area.id]?.openPopup();
    }, 1600);
  };

  return (
    <div className="container py-10">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Mapa Interactivo — {areas.length} Áreas Protegidas del Ecuador Continental
        </h1>
        <p className="text-muted-foreground">
          Explora las áreas protegidas del Ecuador continental, agrupadas por categoría
          de manejo. Despliega una sección y selecciona un área para ubicarla en el mapa.
        </p>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Áreas Protegidas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Accordion type="multiple" defaultValue={["Parques Nacionales"]} className="w-full">
                {categories.map((cat) => {
                  const items = areas.filter((a) => a.category === cat);
                  if (items.length === 0) return null;
                  return (
                    <AccordionItem key={cat} value={cat}>
                      <AccordionTrigger className="text-sm font-semibold text-primary hover:no-underline">
                        {cat}
                        <span className="ml-2 text-xs text-muted-foreground font-normal">
                          ({items.length})
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-1">
                        {items.map((a) => {
                          const active = selected?.id === a.id;
                          return (
                            <button
                              key={a.id}
                              onClick={() => handleSelect(a)}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-start gap-2 ${
                                active
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-muted text-foreground"
                              }`}
                            >
                              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                              <span className="font-medium leading-snug">{a.name}</span>
                            </button>
                          );
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        </aside>

        {/* Map */}
        <div className="rounded-xl overflow-hidden border card-shadow h-[600px]">
          <MapContainer
            center={[-1.5, -78.4]}
            zoom={6}
            minZoom={6}
            maxBounds={[
              [-6.8, -82.2],
              [2.8, -74.2],
            ]}
            maxBoundsViscosity={0.9}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FlyToHandler target={selected} />
            {areas.map((a) => (
              <Marker
                key={a.id}
                position={a.position}
                ref={(ref) => {
                  markerRefs.current[a.id] = ref;
                }}
                eventHandlers={{
                  click: () => setSelected(a),
                }}
              >
                <Popup maxWidth={300} minWidth={260}>
                  <div className="space-y-2">
                    <div className="aspect-video bg-secondary/30 rounded-md flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-primary/40" />
                    </div>
                    <span className="inline-block text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                      {a.category}
                    </span>
                    <h3 className="font-semibold text-base text-primary !m-0">
                      {a.name}
                    </h3>
                    <span className="inline-block text-xs px-2 py-0.5 rounded bg-secondary/40 text-foreground">
                      {a.status}
                    </span>
                    <p className="text-sm text-foreground !mt-2 leading-relaxed">
                      {a.description}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Selected detail card (mobile-friendly) */}
      {selected && (
        <Card className="mt-6 lg:hidden">
          <CardHeader>
            <span className="inline-block w-fit text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold mb-1">
              {selected.category}
            </span>
            <CardTitle className="text-primary">{selected.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <span className="inline-block text-xs px-2 py-1 rounded bg-secondary/40">
              {selected.status}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selected.description}
            </p>
            <Button variant="outline" size="sm" onClick={() => setSelected(null)}>
              Cerrar
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MapaInteractivo;
