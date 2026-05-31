export interface GuiaStep {
  text: string;
  tip?: string;
}

export interface Guia {
  id: string;
  numero: number;
  unidad: string;
  titulo: string;
  objetivo: string;
  fundamento: string;
  pasos: GuiaStep[];
  evidenciaPlaceholder: string;
  preguntas: string[];
}

export const guias: Guia[] = [
  {
    id: "1",
    numero: 1,
    unidad: "Unidad 2: Ecuador Megadiverso",
    titulo: "Modelamiento de Nichos y Distribución Espacial de Especies Endémicas",
    objetivo:
      "Tipificar la distribución geográfica de la flora y fauna endémica correlacionándola con las características ambientales del Ecuador.",
    fundamento:
      "El endemismo es la condición por la cual una especie habita exclusivamente en un territorio delimitado. Ecuador, debido a su ubicación ecuatorial, gradientes altitudinales y biorregiones (Costa, Sierra, Amazonía y Galápagos), presenta una alta tasa de endemismo. El modelamiento de nichos ecológicos mediante SIG permite correlacionar registros de presencia con variables bioclimáticas (temperatura, precipitación, altitud) para predecir áreas de distribución potencial y orientar decisiones de conservación.",
    pasos: [
      { text: "Abre el Visor WebGIS de biodiversidad.", tip: "Recomendado: GBIF, BIOWEB o el Geoportal MAATE." },
      { text: "Localiza las coordenadas de presencia de una especie endémica asignada.", tip: "Usa el formato decimal (Lat, Lng) en WGS84." },
      { text: "Superpone la capa climática para identificar los factores determinantes de su hábitat.", tip: "Activa capas de WorldClim o MAATE: temperatura media y precipitación anual." },
    ],
    evidenciaPlaceholder:
      "Registra aquí las coordenadas de presencia (Lat, Lng), nombre científico de la especie y descripción biogeográfica del hábitat...",
    preguntas: [
      "¿Qué factores ambientales determinan principalmente la distribución de la especie analizada?",
      "¿Cómo se relaciona el rango de distribución observado con las regiones biogeográficas del Ecuador?",
      "¿Qué implicaciones tendría una variación climática sobre el nicho potencial de esta especie endémica?",
    ],
  },
  {
    id: "2",
    numero: 2,
    unidad: "Unidad 2: Ecuador Megadiverso",
    titulo: "Análisis Temporal de Amenazas a la Biodiversidad y Deforestación",
    objetivo:
      "Investigar espaciotemporalmente las causas de la pérdida de biodiversidad mediante el uso de imágenes de satélite.",
    fundamento:
      "El análisis multitemporal mediante percepción remota permite cuantificar cambios en la cobertura vegetal a lo largo del tiempo. Plataformas como Global Forest Watch y Google Earth Engine integran series temporales de imágenes Landsat y Sentinel para detectar deforestación, fragmentación de hábitats y pérdida neta de bosque. Estas evidencias son fundamentales para identificar los motores antrópicos de la pérdida de biodiversidad en el Ecuador.",
    pasos: [
      { text: "Activa la herramienta de línea de tiempo o Timelapse en el visor de mapas.", tip: "Google Earth Timelapse o Global Forest Watch tienen esta funcionalidad integrada." },
      { text: "Compara la cobertura vegetal boscosa entre el año 2000 y el año actual en la zona de estudio.", tip: "Captura screenshots de ambos períodos para comparación visual." },
      { text: "Utiliza la herramienta de medición para delimitar el área estimada en hectáreas de bosque afectado.", tip: "1 hectárea = 10.000 m². Usa el polígono de medición." },
    ],
    evidenciaPlaceholder:
      "Anota las coordenadas del área de estudio, el porcentaje de pérdida de cobertura y la superficie afectada en hectáreas...",
    preguntas: [
      "¿Cuáles son los principales motores antrópicos identificados en la zona de estudio?",
      "¿Qué impacto tiene la deforestación observada sobre la conectividad ecológica del paisaje?",
      "¿Qué estrategias de mitigación propondrías con base en la evidencia espacial recolectada?",
    ],
  },
  {
    id: "3",
    numero: 3,
    unidad: "Unidad 3: Conservación en el Ecuador",
    titulo: "Análisis Cartográfico y Límites del Sistema Nacional de Áreas Protegidas (SNAP)",
    objetivo:
      "Categorizar las estrategias de manejo de las áreas protegidas del Ecuador mediante su delimitación territorial.",
    fundamento:
      "El SNAP del Ecuador está conformado por cuatro subsistemas (Estatal, Autónomo Descentralizado, Comunitario y Privado) y agrupa categorías de manejo como Parques Nacionales, Reservas Biológicas, Reservas Ecológicas, Refugios de Vida Silvestre y Áreas Nacionales de Recreación. Cada categoría implica un nivel distinto de restricción de uso y objetivos de conservación según el Código Orgánico del Ambiente.",
    pasos: [
      { text: "Carga la capa oficial del Sistema Nacional de Áreas Protegidas (SNAP).", tip: "Disponible en el Geoportal MAATE en formato shapefile o WMS." },
      { text: "Identifica la categoría de manejo (Parque Nacional, Reserva Biológica, etc.) de la zona asignada.", tip: "Consulta los atributos de la capa para ver la categoría oficial." },
      { text: "Examina las políticas de ordenamiento territorial que rigen sobre dichos límites cartográficos.", tip: "Revisa el Plan de Manejo y el Código Orgánico del Ambiente (COA)." },
    ],
    evidenciaPlaceholder:
      "Describe el área protegida asignada: nombre, categoría de manejo, superficie en hectáreas y coordenadas centrales...",
    preguntas: [
      "¿Qué categoría de manejo presenta el área analizada y qué implicaciones tiene para los usos permitidos?",
      "¿Cómo se relacionan los límites cartográficos del área con los ecosistemas que protege?",
      "¿Qué vacíos de conservación detectas en la representatividad ecosistémica del SNAP?",
    ],
  },
  {
    id: "4",
    numero: 4,
    unidad: "Unidad 3: Conservación en el Ecuador",
    titulo: "Análisis de Superposición Espacial: Conflictos Territoriales y Conservación Comunitaria",
    objetivo:
      "Evaluar la interacción entre las estrategias de conservación in situ y las presiones antrópicas o actividades de las comunidades locales.",
    fundamento:
      "El análisis de superposición (overlay) permite identificar conflictos territoriales al cruzar capas de áreas protegidas con capas de presión antrópica (asentamientos humanos, vías, concesiones extractivas). Las zonas de amortiguamiento (buffer) son herramientas clave para gestionar estos conflictos, mientras que las comunidades locales cumplen un rol estratégico como custodios de la biodiversidad mediante prácticas tradicionales y co-manejo.",
    pasos: [
      { text: "Activa de manera simultánea la capa de Áreas Protegidas y la capa de Asentamientos Humanos / Vías de Transporte.", tip: "Ajusta la transparencia de cada capa para visualizar la superposición." },
      { text: "Traza una zona de amortiguamiento (buffer) alrededor del área protegida para analizar posibles conflictos de uso de suelo.", tip: "Buffer recomendado: 2 a 5 km según el contexto territorial." },
      { text: "Registra el rol de las comunidades locales como 'Guardianes de la Biodiversidad' frente a las amenazas detectadas.", tip: "Identifica nacionalidades indígenas y comunidades campesinas asentadas." },
    ],
    evidenciaPlaceholder:
      "Documenta los conflictos territoriales identificados, el radio del buffer aplicado y las comunidades locales presentes...",
    preguntas: [
      "¿Qué tipos de conflictos territoriales se evidencian en la superposición espacial realizada?",
      "¿Cómo contribuyen las comunidades locales a la conservación efectiva del área analizada?",
      "¿Qué estrategias de gobernanza territorial propondrías para armonizar conservación y desarrollo comunitario?",
    ],
  },
];

export const getGuia = (id: string) => guias.find((g) => g.id === id);
