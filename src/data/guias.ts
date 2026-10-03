export interface GuiaStep {
  text: string;
  tip?: string;
}

export interface GlosarioTermino {
  termino: string;
  definicion: string;
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
  recursos: string[];
  glosario: GlosarioTermino[];
  productoEsperado: string;
  criterios: string[];
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
      "El endemismo es la condición por la cual una especie habita exclusivamente en un territorio delimitado. Ecuador, debido a su ubicación ecuatorial, gradientes altitudinales y biorregiones (Costa, Sierra, Amazonía y Galápagos), presenta una alta tasa de endemismo. El modelamiento de nichos ecológicos mediante SIG permite correlacionar registros de presencia con variables bioclimáticas (temperatura, precipitación, altitud) para predecir áreas de distribución potencial y orientar decisiones de conservación.\n\nEn la práctica, un modelo de distribución de especies se construye en tres fases: (1) recopilación de registros de presencia georreferenciados (en formato decimal, datum WGS84), validando que no existan errores de coordenadas ni duplicados; (2) selección de variables predictoras —en el Ecuador andino la altitud, la precipitación anual y la temperatura media explican la mayor parte de la variación de hábitat, pues el país condensa desde el nivel del mar hasta más de 6.000 msnm en pocos kilómetros; y (3) ajuste del modelo (por ejemplo con MaxEnt o métodos de distancia ambiental), que produce un mapa de idoneidad donde cada píxel indica la probabilidad de que el hábitat sea adecuado. Un rango de distribución restringido —como el de muchas especies de páramo, que solo habitan por encima de los 3.000 msnm— implica mayor vulnerabilidad: un evento puntual (incendio, cambio de uso de suelo, cambio climático) puede afectar a la población completa porque no existe otro lugar con condiciones equivalentes.",
    pasos: [
      { text: "Abre el Visor WebGIS de biodiversidad.", tip: "Recomendado: GBIF, BIOWEB o el Geoportal MAATE." },
      { text: "Localiza las coordenadas de presencia de una especie endémica asignada.", tip: "Usa el formato decimal (Lat, Lng) en WGS84. Verifica que el punto caiga dentro del territorio continental o insular del Ecuador; un punto en el mar o en otra provincia suele indicar un error de georreferenciación." },
      { text: "Superpone la capa climática para identificar los factores determinantes de su hábitat.", tip: "Activa capas de WorldClim o MAATE: temperatura media y precipitación anual." },
      { text: "Delimita el rango altitudinal y biorregional de la especie anotando los valores mínimos y máximos observados.", tip: "Ejemplo: muchas especies de páramo se restringen a 3.000–4.500 msnm en la Sierra norte; si tu especie es de la Costa, revisa el rango de precipitación en vez del de temperatura." },
      { text: "Compara el área de distribución observada con la red de áreas protegidas (SNAP) para estimar qué porcentaje del hábitat está protegido.", tip: "Si el rango queda fuera del SNAP, la especie depende de áreas privadas, comunitarias o de corredores biológicos." },
      { text: "Redacta una breve interpretación del nicho: variables dominantes, rango espacial y grado de protección.", tip: "Apóyate en el formato: 'La especie se distribuye entre X e Y msnm, con precipitación de A a B mm/año; el Z% de su rango cae dentro del SNAP'." },
    ],
    evidenciaPlaceholder:
      "Registra aquí las coordenadas de presencia (Lat, Lng), nombre científico de la especie y descripción biogeográfica del hábitat...",
    preguntas: [
      "¿Qué factores ambientales determinan principalmente la distribución de la especie analizada?",
      "¿Cómo se relaciona el rango de distribución observado con las regiones biogeográficas del Ecuador?",
      "¿Qué implicaciones tendría una variación climática sobre el nicho potencial de esta especie endémica?",
etiquetaExtra: "",
    ].filter(Boolean) as string[],
    recursos: [
      "GBIF (gbif.org) — registros de presencia globales georreferenciados.",
      "BIOWEB (bioweb.bio) — portal de biodiversidad del Ecuador.",
      "WorldClim — variables bioclimáticas: temperatura media y precipitación anual.",
      "Geoportal MAATE — capas oficiales de biodiversidad del Ecuador.",
    ],
    glosario: [
      { termino: "Nicho ecológico", definicion: "Conjunto de condiciones ambientales (temperatura, precipitación, altitud, suelo) dentro de las cuales una especie puede mantener poblaciones viables." },
      { termino: "Modelo de distribución de especies (SDM)", definicion: "Modelo que relaciona registros de presencia con variables ambientales para predecir el área de distribución potencial de la especie." },
      { termino: "Registro de presencia", definicion: "Punto georreferenciado (latitud, longitud, datum WGS84) donde se documentó la observación de la especie." },
      { termino: "Rango de distribución restringido", definicion: "Área de ocupación pequeña o disyunta; implica mayor vulnerabilidad porque una perturbación local puede afectar a toda la población." },
      { termino: "Variable bioclimática", definicion: "Capa derivada de datos climáticos (temperatura media, precipitación anual, estacionalidad) usada como predictora en el modelamiento." },
      { termino: "WGS84", definicion: "Sistema geodésico mundial estándar para expresar coordenadas geográficas; garantiza que los puntos coincidan entre visores y capas." },
    ],
    productoEsperado:
      "Ficha de la especie con: coordenadas de presencia (Lat, Lng en WGS84), nombre científico, variables ambientales dominantes, rango altitudinal y biorregional, y estimación del porcentaje de hábitat dentro del SNAP.",
    criterios: [
      "Las coordenadas registradas son correctas y están en formato decimal WGS84.",
      "Identifica al menos dos variables ambientales que explican la distribución y justifica con valores observados.",
      "Relaciona el rango observado con la biorregión (Costa, Sierra, Amazonía o Galápagos).",
      "Argumenta el efecto del cambio climático sobre el nicho con base en la estrechez o amplitud del rango.",
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
      "El análisis multitemporal mediante percepción remota permite cuantificar cambios en la cobertura vegetal a lo largo del tiempo. Plataformas como Global Forest Watch y Google Earth Engine integran series temporales de imágenes Landsat (30 m de resolución, un ciclo de revisita cada 16 días desde 1984) y Sentinel-2 (10 m, cada 5 días) para detectar deforestación, fragmentación de hábitats y pérdida neta de bosque. Estas evidencias son fundamentales para identificar los motores antrópicos de la pérdida de biodiversidad en el Ecuador.\n\nEl procedimiento típico combina: (1) una imagen base (año de referencia, por ejemplo 2000) y una imagen actual, para comparar el mismo territorio con la misma escala y proyección; (2) clasificación de cobertura (bosque, cultivo, pasto, suelo desnudo) o índices espectrales como el NDVI, que mide la 'verdeza' de la vegetación y baja drásticamente cuando se pierde cobertura; y (3) cuantificación del cambio en hectáreas (1 ha = 10.000 m²) y en porcentaje de pérdida. En el Ecuador, las tasas más altas de deforestación se registran en el piedemonte amazónico (frontera agrícola y petrolera de Sucumbíos, Orellana y Pastaza) y en el noroccidente de Pichincha e Imbabura; la fragmentación resultante aísla parches de bosque, reduce la conectividad ecológica y afecta primero a las especies con grandes territorios (mamíferos y aves de dosel).",
    pasos: [
      { text: "Activa la herramienta de línea de tiempo o Timelapse en el visor de mapas.", tip: "Google Earth Timelapse o Global Forest Watch tienen esta funcionalidad integrada." },
      { text: "Compara la cobertura vegetal boscosa entre el año 2000 y el año actual en la zona de estudio.", tip: "Captura screenshots de ambos períodos manteniendo el mismo zoom y centro; sin ese control, la comparación visual no es válida." },
      { text: "Utiliza la herramienta de medición para delimitar el área estimada en hectáreas de bosque afectado.", tip: "1 hectárea = 10.000 m². Usa el polígono de medición." },
      { text: "Clasifica la amenaza dominante de cada zona observada: expansión agrícola, ganadería, minería, carreteras o urbanización.", tip: "Guíate por la textura de la imagen: mosaicos regulares sugieren cultivo o pasto; claros lineales sugieren vías o sísmica petrolera; frentes arenosos con lagos sugieren minería." },
      { text: "Evalúa la fragmentación: cuenta los parches de bosque aislados y estima las distancias entre ellos.", tip: "Los parches pequeños y alejados entre sí albergan menos especies y dificultan el movimiento de la fauna (efecto de borde)." },
      { text: "Redacta la serie temporal: año de referencia, superficie inicial, superficie actual, pérdida en hectáreas y porcentaje.", tip: "Presenta el resultado como: 'Entre 2000 y 2025 la zona pasó de X a Y ha de bosque (pérdida de Z%)'." },
    ],
    evidenciaPlaceholder:
      "Anota las coordenadas del área de estudio, el porcentaje de pérdida de cobertura y la superficie afectada en hectáreas...",
    preguntas: [
      "¿Cuáles son los principales motores antrópicos identificados en la zona de estudio?",
      "¿Qué impacto tiene la deforestación observada sobre la conectividad ecológica del paisaje?",
      "¿Qué estrategias de mitigación propondrías con base en la evidencia espacial recolectada?",
    ],
    recursos: [
      "Global Forest Watch — pérdida de cobertura boscosa año por año con datos Hansen.",
      "Google Earth Timelapse — series Landsat de 1984 a la actualidad.",
      "Google Earth Engine — procesamiento en la nube de series temporales y NDVI.",
      "MAATE / Forest Online — cifras oficiales de deforestación del Ecuador.",
    ],
    glosario: [
      { termino: "Análisis multitemporal", definicion: "Comparación de la misma zona en distintas fechas para detectar y cuantificar cambios de cobertura o uso del suelo." },
      { termino: "Percepción remota", definicion: "Obtención de información del territorio a partir de imágenes captadas por satélites o sensores aéreos, sin contacto directo." },
      { termino: "NDVI", definicion: "Índice de vegetación de diferencia normalizada; valores altos indican vegetación densa y vigorosa, y su caída señala pérdida de cobertura." },
      { termino: "Fragmentación", definicion: "División de un bosque continuo en parches menores y aislados; reduce la conectividad ecológica y el hábitat efectivo." },
      { termino: "Efecto de borde", definicion: "Cambios microclimáticos y biológicos que ocurren en los límites del parche de bosque y afectan a las especies del interior." },
      { termino: "Frontera agrícola", definicion: "Línea de avance de la agricultura y ganadería sobre ecosistemas naturales; en el Ecuador avanza sobre el piedemonte amazónico y el noroccidente." },
    ],
    productoEsperado:
      "Bitácora del cambio: coordenadas del área de estudio, superficie de bosque inicial y actual (ha), porcentaje de pérdida, mapa de las dos fechas comparadas y clasificación de la amenaza dominante.",
    criterios: [
      "La comparación temporal usa el mismo zoom, centro y escala en ambas fechas.",
      "La superficie afectada se expresa en hectáreas y porcentaje con la herramienta de medición.",
      "Clasifica correctamente la amenaza dominante y la justifica con la textura/patrón de la imagen.",
      "Conecta la deforestación observada con la pérdida de conectividad ecológica y propone mitigación.",
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
      "El SNAP del Ecuador está conformado por cuatro subsistemas (Estatal, Autónomo Descentralizado, Comunitario y Privado) y agrupa categorías de manejo como Parques Nacionales, Reservas Biológicas, Reservas Ecológicas, Refugios de Vida Silvestre y Áreas Nacionales de Recreación. Cada categoría implica un nivel distinto de restricción de uso y objetivos de conservación según el Código Orgánico del Ambiente.\n\nEn cartografía, los límites del SNAP se distribuyen como capas vectoriales de polígonos (shapefile o servicios WMS del Geoportal MAATE) cuyos atributos incluyen nombre oficial, categoría de manejo, superficie (ha) y provincia. El análisis consisten en simbolizar la capa por categoría de manejo y verificar: (1) la correspondencia entre el límite cartográfico y los ecosistemas que la protección busca resguardar (un parque puede abarcar desde manglar hasta páramo); (2) la representatividad ecosistémica, es decir, qué proporción de cada ecosistema del país queda dentro de alguna área protegida; y (3) los vacíos de conservación, regiones con alta riqueza o endemismo que no están representadas en la red. El marco legal que respalda estos límites incluye la Constitución de 2008 (arts. 14, 400 y 405, que reconocen los derechos de la naturaleza y declaran de interés público la conservación), el Código Orgánico del Ambiente (2023, que unifica la normativa) y los planes de manejo de cada área.",
    pasos: [
      { text: "Carga la capa oficial del Sistema Nacional de Áreas Protegidas (SNAP).", tip: "Disponible en el Geoportal MAATE en formato shapefile o WMS." },
      { text: "Identifica la categoría de manejo (Parque Nacional, Reserva Biológica, etc.) de la zona asignada.", tip: "Consulta los atributos de la capa para ver la categoría oficial." },
      { text: "Examina las políticas de ordenamiento territorial que rigen sobre dichos límites cartográficos.", tip: "Revisa el Plan de Manejo y el Código Orgánico del Ambiente (COA)." },
      { text: "Simboliza la capa por categoría de manejo y describe el patrón espacial de la red: dónde se concentra, qué regiones quedan desatendidas.", tip: "Observa la asimetría clásica: fuerte presencia amazónica y galapagueña, menor cobertura en la Costa y en los valles interandinos." },
      { text: "Cruza los límites del área con los ecosistemas que abarca y anota la superficie oficial en hectáreas.", tip: "Compara la superficie del atributo con la calculada en el visor; diferencias grandes pueden indicar límites desactualizados." },
      { text: "Detecta un vacío de conservación: un ecosistema o zona de alto valor natural sin representación en el SNAP y argumenta qué categoría de manejo le correspondería.", tip: "Apóyate en el objetivo de la categoría: uso sostenible (reserva ecológica), protección estricta (parque nacional) o manejo de hábitats específicos (refugio de vida silvestre)." },
    ],
    evidenciaPlaceholder:
      "Describe el área protegida asignada: nombre, categoría de manejo, superficie en hectáreas y coordenadas centrales...",
    preguntas: [
      "¿Qué categoría de manejo presenta el área analizada y qué implicaciones tiene para los usos permitidos?",
      "¿Cómo se relacionan los límites cartográficos del área con los ecosistemas que protege?",
      "¿Qué vacíos de conservación detectas en la representatividad ecosistémica del SNAP?",
    ],
    recursos: [
      "Geoportal MAATE — shapefile y WMS oficiales del SNAP.",
      "Código Orgánico del Ambiente (2023) — normas y categorías de manejo.",
      "Constitución de la República del Ecuador (2008), arts. 14, 400 y 405.",
      "Planes de manejo de áreas protegidas (publicaciones del MAATE).",
    ],
    glosario: [
      { termino: "SNAP", definicion: "Sistema Nacional de Áreas Protegidas: red territorial que integra las áreas protegidas estatales, de GAD, comunitarias y privadas del Ecuador." },
      { termino: "Categoría de manejo", definicion: "Clasificación legal del área (Parque Nacional, Reserva Ecológica, Reserva Biológica, Refugio de Vida Silvestre, Área Nacional de Recreación) que define sus usos permitidos." },
      { termino: "Capa vectorial", definicion: "Representación cartográfica por puntos, líneas o polígonos con atributos; los límites del SNAP son polígonos." },
      { termino: "WMS", definicion: "Servicio de mapas web que entrega capas georreferenciadas a visores sin necesidad de descargar el archivo completo." },
      { termino: "Representatividad ecosistémica", definicion: "Grado en que los ecosistemas de un país están incluidos dentro de la red de áreas protegidas." },
      { termino: "Vacío de conservación", definicion: "Zona con alto valor biológico que no está representada en ninguna categoría de protección del sistema." },
    ],
    productoEsperado:
      "Ficha cartográfica del área protegida: nombre oficial, categoría de manejo, superficie en ha, coordenadas centrales, ecosistemas incluidos y un vacío de conservación identificado con propuesta de categoría.",
    criterios: [
      "Identifica correctamente la categoría de manejo y sus usos permitidos según el COA.",
      "La superficie y las coordenadas se registran con las unidades y el datum correctos.",
      "Describe el patrón espacial de la red de áreas protegidas del Ecuador.",
      "Argumenta un vacío de conservación concreto y propone la categoría adecuada.",
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
      "El análisis de superposición (overlay) permite identificar conflictos territoriales al cruzar capas de áreas protegidas con capas de presión antrópica (asentamientos humanos, vías, concesiones extractivas). Las zonas de amortiguamiento (buffer) son herramientas clave para gestionar estos conflictos, mientras que las comunidades locales cumplen un rol estratégico como custodios de la biodiversidad mediante prácticas tradicionales y co-manejo.\n\nTécnicamente, el overlay es un álgebra espacial: al intersecar dos polígonos (por ejemplo, un área protegida y una concesión minera) se obtiene la superficie en conflicto y sus atributos combinados. El buffer genera una franja de radio fijo alrededor de un límite (en el Ecuador se suelen aplicar 2 a 5 km alrededor de áreas protegidas) que delimita la zona donde se deben negociar usos compatibles. El marco de gobernanza distingue tres niveles: el manejo estatal (MAATE y guardaparques), el co-manejo con nacionalidades indígenas y comunidades campesinas —reconocido por la Constitución de 2008 y los convenios internacionales ratificados por el país— y las iniciativas comunitarias de conservación (bosques protectores, territorialidades indígenas como la del pueblo Waorani o Kichwa de la Amazonía). El resultado esperado es una propuesta de zona de amortiguamiento con reglas de uso definidas junto a las comunidades, no una simple línea en el mapa.",
    pasos: [
      { text: "Activa de manera simultánea la capa de Áreas Protegidas y la capa de Asentamientos Humanos / Vías de Transporte.", tip: "Ajusta la transparencia de cada capa para visualizar la superposición." },
      { text: "Traza una zona de amortiguamiento (buffer) alrededor del área protegida para analizar posibles conflictos de uso de suelo.", tip: "Buffer recomendado: 2 a 5 km según el contexto territorial." },
      { text: "Registra el rol de las comunidades locales como 'Guardianes de la Biodiversidad' frente a las amenazas detectadas.", tip: "Identifica nacionalidades indígenas y comunidades campesinas asentadas." },
      { text: "Cuantifica los conflictos: interseca los polígonos de presión antrópica con el buffer y estima la superficie en conflicto.", tip: "Distingue entre conflicto dentro del área protegida (invasión) y conflicto en el buffer (presión perimetral)." },
      { text: "Clasifica los actores presentes en la zona (comunidades, GAD, empresas, guardaparques) y sus intereses sobre el territorio.", tip: "Un mismo territorio puede superponer usos consuetudinarios, concesiones y protección; la gobernanza nace de nombrar a todos los actores." },
      { text: "Formula una propuesta de co-manejo: reglas de uso del buffer, actor responsable y mecanismo de vigilancia comunitaria.", tip: "Inspírate en experiencias reales: bosques protectores comunitarios, rondas de vigilancia indígena y corredores biológicos comunitarios." },
    ],
    evidenciaPlaceholder:
      "Documenta los conflictos territoriales identificados, el radio del buffer aplicado y las comunidades locales presentes...",
    preguntas: [
      "¿Qué tipos de conflictos territoriales se evidencian en la superposición espacial realizada?",
      "¿Cómo contribuyen las comunidades locales a la conservación efectiva del área analizada?",
      "¿Qué estrategias de gobernanza territorial propondrías para armonizar conservación y desarrollo comunitario?",
    ],
    recursos: [
      "Geoportal MAATE — capas SNAP, vías y asentamientos.",
      "Constitución de 2008 — derechos de la naturaleza y participación comunitaria.",
      "Convenio 169 OIT y declaraciones de derechos de pueblos indígenas.",
      "Experiencias de co-manejo y bosques protectores comunitarios del Ecuador.",
    ],
    glosario: [
      { termino: "Overlay (superposición)", definicion: "Operación SIG que cruza dos o más capas para obtener las zonas donde coinciden, con los atributos combinados." },
      { termino: "Buffer (zona de amortiguamiento)", definicion: "Franja de radio fijo trazada alrededor de un polígono o línea; delimita el espacio donde se gestionan usos compatibles con la conservación." },
      { termino: "Conflicto territorial", definicion: "Coincidencia espacial entre usos incompatibles del suelo (por ejemplo, concesión extractiva dentro o junto a un área protegida)." },
      { termino: "Co-manejo", definicion: "Gestión compartida de un territorio protegido entre el Estado y las comunidades o nacionalidades locales." },
      { termino: "Conservación in situ", definicion: "Protección de la biodiversidad dentro de su hábitat natural, ya sea en áreas protegidas o en territorios comunitarios." },
      { termino: "Vigilancia comunitaria", definicion: "Mecanismo de monitoreo y control del territorio ejercido por las comunidades locales, como rondas o monitoreos con GPS." },
    ],
    productoEsperado:
      "Mapa de conflicto con buffer aplicado (radio indicado en km), superficie en conflicto estimada, actores identificados y propuesta de co-manejo con reglas de uso para la zona de amortiguamiento.",
    criterios: [
      "Aplica correctamente la superposición de capas y describe los conflictos resultantes.",
      "El buffer tiene un radio explícito (2 a 5 km) y su superficie en conflicto se estima.",
      "Identifica a los actores territoriales y diferencia invasión de presión perimetral.",
      "La propuesta de co-manejo asigna responsables y mecanismos de vigilancia concretos.",
    ],
  },
];

export const getGuia = (id: string) => guias.find((g) => g.id === id);
