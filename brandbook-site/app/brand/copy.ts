import type {
  BrandbookBlockId,
  MotionDemoId,
  SectionId,
  SignalId,
  SurfaceLevel,
} from './system';
import type { FamilyId } from './generated/palette';
import { TOOLS, type StatusId } from './catalog';

export type Language = 'es' | 'en';

export type Localized = Record<Language, string>;

export type Chapter = {
  id: string;
  sectionIds: SectionId[];
  label: Localized;
  detail: Localized;
};

export const CHAPTERS: readonly Chapter[] = [
  {
    id: 'orientacion',
    sectionIds: ['norte', 'identidad'],
    label: { es: 'Orientación', en: 'Orientation' },
    detail: {
      es: 'la marca como brújula',
      en: 'the mark as a compass',
    },
  },
  {
    id: 'semantica',
    sectionIds: ['herramientas', 'color'],
    label: { es: 'Semántica', en: 'Semantics' },
    detail: {
      es: 'datos, señales y estado',
      en: 'data, signals, and status',
    },
  },
  {
    id: 'lenguaje',
    sectionIds: ['tipografia', 'iconografia', 'voz'],
    label: { es: 'Lenguaje', en: 'Language' },
    detail: {
      es: 'cómo se lee y se nombra',
      en: 'how it reads and names things',
    },
  },
  {
    id: 'comportamiento',
    sectionIds: ['movimiento', 'materia', 'patrones'],
    label: { es: 'Comportamiento', en: 'Behavior' },
    detail: {
      es: 'capas, respuesta y ritmo',
      en: 'layers, response, and rhythm',
    },
  },
  {
    id: 'entrega',
    sectionIds: ['referencias', 'entrega'],
    label: { es: 'Entrega', en: 'Handoff' },
    detail: {
      es: 'producto, guardas y código',
      en: 'product, guardrails, and code',
    },
  },
] as const;

export const BLOCK_COPY: Record<
  BrandbookBlockId,
  { label: Localized; detail: Localized }
> = {
  norte: {
    label: { es: 'Norte', en: 'North star' },
    detail: { es: 'la dirección del sistema', en: 'the system direction' },
  },
  identidad: {
    label: { es: 'Identidad', en: 'Identity' },
    detail: { es: 'marca madre y familias', en: 'mother brand and families' },
  },
  sistema: {
    label: { es: 'Sistema', en: 'System' },
    detail: {
      es: 'herramientas, señal y color',
      en: 'tools, signal, and color',
    },
  },
  lenguaje: {
    label: { es: 'Lenguaje', en: 'Language' },
    detail: { es: 'tipo, iconos y voz', en: 'type, icons, and voice' },
  },
  interaccion: {
    label: { es: 'Interacción', en: 'Interaction' },
    detail: { es: 'movimiento y materia', en: 'motion and material' },
  },
  patrones: {
    label: { es: 'Patrones', en: 'Patterns' },
    detail: { es: 'orden que se adapta', en: 'adaptive order' },
  },
  casos: {
    label: { es: 'Casos', en: 'Cases' },
    detail: { es: 'el sistema en producto', en: 'the system in product' },
  },
  entrega: {
    label: { es: 'Entrega', en: 'Handoff' },
    detail: { es: 'tokens y guardas', en: 'tokens and guardrails' },
  },
};

export const SECTION_COPY: Record<
  SectionId,
  { label: Localized; detail: Localized }
> = {
  norte: {
    label: { es: 'Norte', en: 'North star' },
    detail: { es: 'qué debe sentirse', en: 'what it should feel like' },
  },
  identidad: {
    label: { es: 'Identidad', en: 'Identity' },
    detail: { es: 'la marca y su familia', en: 'the mark and its family' },
  },
  herramientas: {
    label: { es: 'Herramientas', en: 'Tools' },
    detail: {
      es: '6 familias de producto',
      en: '6 product families',
    },
  },
  color: {
    label: { es: 'Color', en: 'Color' },
    detail: { es: 'señal, familia y estado', en: 'signal, family, and status' },
  },
  tipografia: {
    label: { es: 'Tipografía', en: 'Type' },
    detail: { es: 'leer sin traducir', en: 'read without translation' },
  },
  movimiento: {
    label: { es: 'Movimiento', en: 'Motion' },
    detail: { es: 'respuesta, no ruido', en: 'response, not noise' },
  },
  materia: {
    label: { es: 'Materia', en: 'Material' },
    detail: { es: 'capas que orientan', en: 'layers that orient' },
  },
  iconografia: {
    label: { es: 'Iconografía', en: 'Iconography' },
    detail: { es: 'dibujar como se calcula', en: 'draw what is calculated' },
  },
  patrones: {
    label: { es: 'Patrones', en: 'Patterns' },
    detail: { es: 'orden que se adapta', en: 'order that adapts' },
  },
  referencias: {
    label: { es: 'Referencias', en: 'References' },
    detail: { es: 'el sistema en producto', en: 'the system in product' },
  },
  voz: {
    label: { es: 'Voz', en: 'Voice' },
    detail: {
      es: 'lenguaje que no promete de más',
      en: 'language that does not overpromise',
    },
  },
  entrega: {
    label: { es: 'Entrega', en: 'Handoff' },
    detail: { es: 'tokens y guardas', en: 'tokens and guardrails' },
  },
};

export const SECTION_INTROS: Record<
  string,
  { eyebrow: Localized; title: Localized; body: Localized }
> = {
  '01': {
    eyebrow: { es: 'Norte · dirección', en: 'North star · direction' },
    title: {
      // El lema es una firma fija: no se traduce en el modo español.
      es: 'Make complexity legible.',
      en: 'Make complexity legible.',
    },
    body: {
      es: 'Modelo, resultado y decisión se leen igual en pantalla, en papel y en obra.',
      en: 'Model, result, and decision read consistently on screen, on paper, and on site.',
    },
  },
  '02': {
    eyebrow: { es: 'Identidad · la ménsula', en: 'Identity · the cantilever' },
    title: {
      es: 'Una F estructural, no decorativa.',
      en: 'A structural F, not a decorative one.',
    },
    body: {
      es: 'La F se construye como una columna y dos voladizos. El cuerpo permanece en grafito; sólo el brazo inferior adopta el color de la marca o de su familia.',
      en: 'The F is built as a column and two cantilevers. Its body remains graphite; only the lower arm adopts the brand or family color.',
    },
  },
  '03': {
    eyebrow: { es: 'Herramientas · catálogo', en: 'Tools · catalog' },
    title: {
      es: 'Seis familias, una marca madre.',
      en: 'Six families, one mother brand.',
    },
    body: {
      es: 'Las familias ordenan el sistema; cada herramienta declara su estado real sin confundirse con la identidad.',
      en: 'Families organize the system; every tool declares its real state without being confused with identity.',
    },
  },
  '04': {
    eyebrow: { es: 'Color · tres escalas', en: 'Color · three scales' },
    title: {
      es: 'El color explica una relación o no se usa.',
      en: 'Color explains a relationship or it is not used.',
    },
    body: {
      es: 'Las señales pertenecen al resultado, las familias a la herramienta y los estados a la verdad del producto.',
      en: 'Signals belong to results, families to tools, and states to the truth of the product.',
    },
  },
  '05': {
    eyebrow: { es: 'Tipografía · dos voces', en: 'Type · two voices' },
    title: {
      es: 'La jerarquía se entiende antes de leerse.',
      en: 'Hierarchy is understood before it is read.',
    },
    body: {
      es: 'Una sans geométrica orienta y una monoespaciada alinea unidades, coordenadas, versiones y procedencia.',
      en: 'A geometric sans orients; a monospace aligns units, coordinates, versions, and provenance.',
    },
  },
  '06': {
    eyebrow: { es: 'Movimiento · respuesta', en: 'Motion · response' },
    title: {
      es: 'El movimiento dice qué cambió y de dónde vino.',
      en: 'Motion says what changed and where it came from.',
    },
    body: {
      es: 'Un panel llega desde su borde, una relación se dibuja antes de explicarse y apagar el movimiento nunca quita información.',
      en: 'A panel arrives from its edge, a relationship draws before it explains itself, and turning motion off never removes information.',
    },
  },
  '07': {
    eyebrow: { es: 'Materia · profundidad', en: 'Material · depth' },
    title: {
      es: 'La profundidad también comunica.',
      en: 'Depth communicates too.',
    },
    body: {
      es: 'Un solo material a seis distancias: la profundidad dice qué está arriba, qué se puede presionar y qué contiene la decisión actual.',
      en: 'One material at six distances: depth says what is above, what can be pressed, and what contains the current decision.',
    },
  },
  '08': {
    eyebrow: { es: 'Iconografía · gramática', en: 'Iconography · grammar' },
    title: { es: 'Dibujar como se calcula.', en: 'Draw what is calculated.' },
    body: {
      es: 'Los glifos usan la misma retícula, el mismo trazo y el mismo nudo. Ninguno toma prestada una metáfora de otra categoría.',
      en: 'Glyphs share one grid, one stroke, and one joint. None borrows a metaphor from another category.',
    },
  },
  '09': {
    eyebrow: { es: 'Patrones · composición', en: 'Patterns · composition' },
    title: {
      es: 'Consola, lienzo e instrumento.',
      en: 'Console, canvas, and instrument.',
    },
    body: {
      es: 'La consola orienta, el lienzo trabaja y el instrumento confirma. En móvil la lógica se convierte en una secuencia enfocada.',
      en: 'The console orients, the canvas does the work, and the instrument confirms. On mobile the logic becomes a focused sequence.',
    },
  },
  '10': {
    eyebrow: {
      es: 'Referencias · el sistema en producto',
      en: 'References · the system in product',
    },
    title: {
      es: 'Una identidad, cualquier superficie.',
      en: 'One identity, any surface.',
    },
    body: {
      es: 'Estas piezas fijan proporción, densidad, jerarquía y profundidad. Son criterio, no pantallas finales.',
      en: 'These pieces set proportion, density, hierarchy, and depth. They are criteria, not final screens.',
    },
  },
  '11': {
    eyebrow: { es: 'Voz · verdad del producto', en: 'Voice · product truth' },
    title: {
      es: 'Claro sobre lo que existe. Preciso sobre lo que falta.',
      en: 'Clear about what exists. Precise about what is missing.',
    },
    body: {
      es: 'La confianza se construye declarando el estado, nombrando el límite y diciendo qué información está conectada con qué.',
      en: 'Trust is built by declaring status, naming limits, and saying which information is connected to what.',
    },
  },
  '12': {
    eyebrow: { es: 'Entrega · guardas', en: 'Handoff · guardrails' },
    title: {
      es: 'Un sistema se sostiene con guardas.',
      en: 'A system stands on guardrails.',
    },
    body: {
      es: 'Los valores y comprobaciones que un cambio debe pasar antes de considerarse listo viven aquí, junto a su puente hacia CSS y TypeScript.',
      en: 'The values and checks a change must pass before it is ready live here, alongside their bridge to CSS and TypeScript.',
    },
  },
};

export const UI_COPY = {
  es: {
    skip: 'Ir al contenido',
    edition: 'edición 2026',
    index: 'Índice',
    indexAria: 'Secciones del brandbook',
    active: 'Activo',
    calm: 'Calma',
    day: 'Día',
    night: 'Noche',
    language: 'Idioma',
    changeLanguage: 'Cambiar idioma',
    themeToggle: 'Cambiar a tema',
    reduceMotion: 'Reducir el movimiento',
    enableMotion: 'Activar el movimiento',
    openIndex: 'Abrir índice',
    closeIndex: 'Cerrar índice',
    copied: 'Copiado',
    copyFailed: 'No se pudo copiar. Selecciona el valor y cópialo a mano.',
    chapter: 'Capítulo',
    indexDescription:
      'Un sistema propio para hacer legible la complejidad del trabajo construido.',
    direction: 'dirección',
    experimental: 'experimental',
    footerLine:
      'sistema propio · el estado de cada superficie lo define el código',
  },
  en: {
    skip: 'Skip to content',
    edition: '2026 edition',
    index: 'Index',
    indexAria: 'Brandbook sections',
    active: 'Active',
    calm: 'Calm',
    day: 'Day',
    night: 'Night',
    language: 'Language',
    changeLanguage: 'Change language',
    themeToggle: 'Change to theme',
    reduceMotion: 'Reduce motion',
    enableMotion: 'Enable motion',
    openIndex: 'Open index',
    closeIndex: 'Close index',
    copied: 'Copied',
    copyFailed: 'Could not copy. Select the value and copy it manually.',
    chapter: 'Chapter',
    indexDescription:
      'A proprietary system that makes built-work complexity legible.',
    direction: 'direction',
    experimental: 'experimental',
    footerLine: 'proprietary system · code defines the state of every surface',
  },
} as const;

/**
 * Copy shared by the catalogue shell and its inline detail panel. Keeping the
 * labels here prevents an English pass from leaving the filter chrome or the
 * focusable detail surface in Spanish.
 */
export const TOOLS_COPY = {
  es: {
    detail: 'Detalle de',
    close: 'Cerrar detalle',
    today: 'Hoy',
    next: 'Debe crecer',
    gate: 'Puerta mínima',
    viewGate: 'Ver puerta mínima',
    category: 'Categoría estudiada',
    note: 'Referencia de categoría para investigar el problema. No implica equivalencia, compatibilidad ni reemplazo.',
    familyFilter: 'Filtrar por familia',
    all: 'Todas',
    statusFilter: 'Filtrar por estado',
    anyStatus: 'Cualquier estado',
    search: 'Buscar superficie, código o categoría',
    searchLabel: 'Buscar en el catálogo',
    surfaces: 'superficies',
    of: 'de',
    empty:
      'Ninguna superficie coincide con ese filtro. Prueba con otra familia o borra la búsqueda.',
    vocabulary: 'Vocabulario de estado',
    vocabularyBody:
      'Cuatro palabras. Se usan igual en la interfaz, en la documentación y aquí.',
    rule: 'Una tarjeta puede dibujar una intención. No puede escribirla en presente.',
  },
  en: {
    detail: 'Details for',
    close: 'Close details',
    today: 'Today',
    next: 'Needs to grow',
    gate: 'Minimum gate',
    viewGate: 'View minimum gate',
    category: 'Studied category',
    note: 'A category reference for researching the problem. It does not imply equivalence, compatibility, or replacement.',
    familyFilter: 'Filter by family',
    all: 'All',
    statusFilter: 'Filter by status',
    anyStatus: 'Any status',
    search: 'Search surface, code, or category',
    searchLabel: 'Search the catalog',
    surfaces: 'surfaces',
    of: 'of',
    empty:
      'No surface matches that filter. Try another family or clear the search.',
    vocabulary: 'Status vocabulary',
    vocabularyBody:
      'Four words used consistently in the interface, documentation, and here.',
    rule: 'A card can draw an intention. It cannot write it in the present tense.',
  },
} as const;

export const RULE_LABEL: Localized = {
  es: 'Regla',
  en: 'Rule',
};

export const MARK_CONSTRUCTION_COPY: Localized = {
  es: 'peralte 9u → 5u',
  en: 'depth 9u → 5u',
};

export const COLOR_COPY = {
  es: {
    signals: 'Señales de resultado',
    active: 'activo',
    use: 'usar en',
    avoid: 'evitar',
    contrast: 'contraste',
    usageValue: 'línea · punto · estado · etiqueta',
    avoidValue: 'fondo completo · relleno decorativo · texto largo',
    motherBrand: 'Marca madre',
    motherBrandBody:
      'FusionStructure sostiene navegación, foco y evidencia compartida. No cuenta como una familia de producto.',
    families: 'Seis familias de producto',
    familyBody:
      'Emparentadas con las señales, pero más profundas: la señal pertenece al dato y la familia a la herramienta. Nunca se usan como resultado.',
    neutrals: 'Neutros',
    neutralBody:
      'Una sola rampa cálida para día y noche. Cada paso tiene un papel; ninguno se usa «porque se ve bien».',
    day: 'Día · papel técnico',
    dayTitle: 'Fondo tranquilo, tinta densa.',
    dayBody:
      'El papel cálido baja el brillo sin apagar el trazo. La señal aparece en tono profundo para sostener 4.5:1 sobre fondo claro.',
    night: 'Noche · carbón',
    nightTitle: 'Carbón neutro, nunca negro puro.',
    nightBody:
      'En noche la misma señal sube de luminosidad. El significado no cambia: cambia el valor para conservar la lectura.',
    insufficient: 'insuficiente',
    graphic: 'AA · gráfico',
    rule: 'Si el color no explica una relación del dominio, se elimina antes de discutirlo.',
  },
  en: {
    signals: 'Result signals',
    active: 'active',
    use: 'use on',
    avoid: 'avoid',
    contrast: 'contrast',
    usageValue: 'line · point · state · label',
    avoidValue: 'full background · decorative fill · long text',
    motherBrand: 'Parent brand',
    motherBrandBody:
      'FusionStructure carries navigation, focus, and shared evidence. It does not count as a product family.',
    families: 'Six product families',
    familyBody:
      'Related to signals but deeper: a signal belongs to data and a family belongs to a tool. Never use them as results.',
    neutrals: 'Neutrals',
    neutralBody:
      'One warm ramp for day and night. Every step has a role; none is used just because it looks good.',
    day: 'Day · technical paper',
    dayTitle: 'Quiet background, dense ink.',
    dayBody:
      'Warm paper lowers glare without muting the stroke. The signal uses a deeper tone to keep 4.5:1 on a light background.',
    night: 'Night · charcoal',
    nightTitle: 'Neutral charcoal, never pure black.',
    nightBody:
      'At night the same signal gains luminosity. Meaning does not change; value does, to preserve reading.',
    insufficient: 'insufficient',
    graphic: 'AA · graphic',
    rule: 'If color does not explain a domain relationship, remove it before discussing it.',
  },
} as const;

export const TYPOGRAPHY_COPY = {
  es: {
    character: 'La claridad puede tener carácter.',
    weight: 'Peso',
    weightLegend: 'Peso tipográfico',
    display: 'títulos, marca y una idea por pantalla',
    interface: 'controles, listas y lectura larga',
    data: 'unidad, versión, coordenada y token',
    fallback: 'Respaldo: fuentes del sistema; conserva tamaño y espaciado.',
    line: 'línea',
    displayLabel: 'Display · Space Grotesk',
    editorialLabel: 'Editorial · Plus Jakarta Sans',
    fontFamilyLegend: 'Familia tipográfica',
    interfaceLabel: 'Interfaz · Inter',
    dataLabel: 'Dato · IBM Plex Mono',
    numbers: 'Números',
    numbersTitle: 'Un dato mal escrito es un dato equivocado.',
    numbersBody: 'Alinea cifras tabulares; conserva unidad, signo y versión.',
    yes: 'así',
    no: 'así no',
    rule: 'Si el texto necesita explicarse dos veces, el problema es la jerarquía, no el tamaño.',
  },
  en: {
    character: 'Clarity can have character.',
    weight: 'Weight',
    weightLegend: 'Type weight',
    display: 'headings, mark, and one idea per screen',
    interface: 'controls, lists, and long reading',
    data: 'unit, version, coordinate, and token',
    fallback:
      'All three are backed by the system stack. If a font fails to load, hierarchy still stands because it lives in size and space.',
    line: 'line',
    displayLabel: 'Display · Space Grotesk',
    editorialLabel: 'Editorial · Plus Jakarta Sans',
    fontFamilyLegend: 'Type family',
    interfaceLabel: 'Interface · Inter',
    dataLabel: 'Data · IBM Plex Mono',
    numbers: 'Numbers',
    numbersTitle: 'A badly written value is a wrong value.',
    numbersBody:
      'Data type uses tabular figures so columns can be compared without reading every row.',
    yes: 'this way',
    no: 'not this way',
    rule: 'If text needs explaining twice, hierarchy is the problem—not size.',
  },
} as const;

export const ICONOGRAPHY_COPY = {
  es: {
    diagrams: 'Lenguaje de diagramas',
    title: 'El resultado se dibuja siempre igual.',
    body: 'Mismo eje, misma dirección de signo, misma relación entre trazo lleno y trazo fantasma. Cambiar de módulo no debe obligar a reaprender un diagrama.',
    rule: 'Un glifo nuevo entra al sistema cuando se puede distinguir en tinta, a 20 px y sin su etiqueta.',
  },
  en: {
    diagrams: 'Diagram language',
    title: 'The result is always drawn the same way.',
    body: 'Same axis, same sign direction, same relationship between solid and ghost stroke. Changing modules must not force people to relearn a diagram.',
    rule: 'A new glyph enters the system when it can be distinguished in ink, at 20 px, and without its label.',
  },
} as const;

export const DRAWING_RULE_COPY: Record<
  string,
  { title: Localized; body: Localized }
> = {
  '01': {
    title: { es: 'Retícula de 48', en: '48 grid' },
    body: {
      es: 'Todo glifo se dibuja en 48u con 8u de aire. Las líneas caen en múltiplos de 1u.',
      en: 'Every glyph is drawn on 48u with 8u of air. Lines land on 1u multiples.',
    },
  },
  '02': {
    title: { es: 'Trazo 2.6', en: '2.6 stroke' },
    body: {
      es: 'Un solo grosor, extremos redondos y uniones a inglete. El peso no jerarquiza: lo hace la posición.',
      en: 'One weight, round ends, and mitered joins. Position creates hierarchy, not weight.',
    },
  },
  '03': {
    title: { es: 'Dos tintas', en: 'Two inks' },
    body: {
      es: 'Color de familia para la estructura del glifo; grafito para el dato que la ocupa.',
      en: 'Family color for the glyph structure; graphite for the data it carries.',
    },
  },
  '04': {
    title: { es: 'Nudo visible', en: 'Visible joint' },
    body: {
      es: 'Donde dos miembros se encuentran hay un punto. El encuentro es información.',
      en: 'Where two members meet there is a point. The meeting is information.',
    },
  },
  '05': {
    title: { es: 'Sin metáforas prestadas', en: 'No borrowed metaphors' },
    body: {
      es: 'Nada de estetoscopios, libros ni cascos: el glifo dibuja el objeto real del dominio.',
      en: 'No stethoscopes, books, or hard hats: the glyph draws the domain’s real object.',
    },
  },
  '06': {
    title: { es: 'Prueba a 20 px', en: '20 px test' },
    body: {
      es: 'Si a 20 px dos glifos se confunden, se rediseña el que llegó después.',
      en: 'If two glyphs blur together at 20 px, redesign the one that arrived later.',
    },
  },
};

export const HERO_COPY = {
  es: {
    eyebrow: 'Capítulo 01 · orientación',
    axiom: 'La claridad precede a la expresión.',
    lead: 'Modelo, resultado y decisión se leen igual en pantalla, en papel y en obra.',
    // El eslogan es una firma de marca y no se traduce.
    titleLines: ['Make', 'complexity', 'legible.'],
    tools: 'Ver las 6 familias',
    identity: 'Empezar por la marca',
    state: 'estado verificable, no promesa comercial',
    alt: 'Referencia Clay–Minimal para la portada del brandbook',
  },
  en: {
    eyebrow: 'Chapter 01 · orientation',
    axiom: 'Clarity precedes expression.',
    lead: 'Model, result, and decision read consistently on screen, on paper, and on site.',
    titleLines: ['Make', 'complexity', 'legible.'],
    tools: 'View the 6 families',
    identity: 'Start with the mark',
    state: 'verifiable status, never a sales promise',
    alt: 'Clay–Minimal reference for the brandbook cover',
  },
} as const;

export const HERO_BOARD_COPY = {
  es: {
    chrome: 'pórtico-04 · marco plano',
    description:
      'Pórtico de dos columnas con carga distribuida, deformada y diagrama de resultado para la señal activa.',
    method: 'método',
    methodValue: 'lineal · P-Δ',
    tolerance: 'tolerancia',
    revision: 'revisión',
    figure: 'Clay / 01',
    yieldUnit: 'demanda / capacidad',
    attentionUnit: 'supuesto sin declarar',
  },
  en: {
    chrome: 'frame-04 · plane frame',
    description:
      'Two-column frame with distributed load, deformation, and a result diagram for the active signal.',
    method: 'method',
    methodValue: 'linear · P-Δ',
    tolerance: 'tolerance',
    revision: 'revision',
    figure: 'Clay / 01',
    yieldUnit: 'demand / capacity',
    attentionUnit: 'undeclared assumption',
  },
} as const;

export const HERO_BEAT_COPY: Record<
  string,
  { label: Localized; note: Localized }
> = {
  modelo: {
    label: { es: 'Modelo', en: 'Model' },
    note: {
      es: 'geometría, apoyos y cargas declaradas',
      en: 'geometry, supports, and declared loads',
    },
  },
  analisis: {
    label: { es: 'Análisis', en: 'Analysis' },
    note: {
      es: 'equilibrio resuelto con su tolerancia',
      en: 'equilibrium solved with its tolerance',
    },
  },
  lectura: {
    label: { es: 'Lectura', en: 'Reading' },
    note: {
      es: 'el diagrama dice qué gobierna',
      en: 'the diagram says what governs',
    },
  },
  decision: {
    label: { es: 'Decisión', en: 'Decision' },
    note: {
      es: 'la traza queda unida al resultado',
      en: 'the trace stays linked to the result',
    },
  },
};

export const IDENTITY_COPY = {
  es: {
    signalNight: 'Señal · noche',
    signalNightUse: 'sobre carbón',
    mark: 'Marca de FusionStructure',
    markCaption: 'Ménsula',
    markEdition: 'marca madre · 2026',
    construction: 'Construcción',
    grid: 'retícula 48u',
    constructionBody: 'Columna 9u · voladizos 24u / 17u · peralte 9u → 5u.',
    minimumSizes: 'Tamaños mínimos',
    sizeBody:
      'Marca ≥16 px · brazo ≥1 px. Por debajo de 16 px, usa el icono de aplicación.',
    clearspace: 'Espacio libre',
    clearspaceUnit: '1 columna = 9u',
    clearspaceBody: 'Reserva 9u en los cuatro lados.',
    variants: 'Variantes',
    signal: 'Señal',
    signalUse: 'uso general',
    mono: 'Mono',
    monoUse: 'documento e impresión',
    inverse: 'Inversa',
    inverseUse: 'fondo oscuro',
    icon: 'Icono',
    iconUse: 'aplicación y favicon',
    lockups: 'Lockups',
    lockupTitle: 'La firma cambia de forma, no de jerarquía.',
    lockupAria: 'Variantes de firma',
    lockupTagline: 'Make complexity legible.',
    lockupUses: {
      horizontal: 'barra de aplicación, encabezado, firma',
      apilado: 'portada de memoria, tarjeta social',
      compacto: 'móvil, favicon, avatar',
    },
    lockupLabels: {
      horizontal: 'Horizontal',
      apilado: 'Apilado',
      compacto: 'Compacto',
    },
    misuseTag: 'Lo que rompe la marca',
    misuseIntro:
      'Seis usos que la vuelven ilegible o le hacen prometer algo que no es.',
    misuse: {
      girar: {
        label: 'No girar',
        note: 'la ménsula trabaja apoyada en su columna',
      },
      estirar: {
        label: 'No deformar',
        note: 'el peralte es una proporción, no un adorno',
      },
      recolorear: {
        label: 'No teñir',
        note: 'la marca madre no adopta color de herramienta',
      },
      contorno: {
        label: 'No contornear',
        note: 'el trazo hueco desaparece a 16 px',
      },
      sombra: {
        label: 'No dar volumen',
        note: 'la profundidad vive en la superficie, no en la marca',
      },
      ruido: { label: 'No sobre imagen', note: 'sin contraste no hay lectura' },
    },
    rule: 'Conserva la geometría, el espacio libre y el brazo de señal de la marca.',
  },
  en: {
    signalNight: 'Signal · night',
    signalNightUse: 'on charcoal',
    mark: 'FusionStructure mark',
    markCaption: 'Cantilever',
    markEdition: 'parent mark · 2026',
    construction: 'Construction',
    grid: '48u grid',
    constructionBody: 'Column 9u · cantilevers 24u / 17u · depth 9u → 5u.',
    minimumSizes: 'Minimum sizes',
    sizeBody: 'Mark ≥16 px · arm ≥1 px. Below 16 px, use the app icon.',
    clearspace: 'Clear space',
    clearspaceUnit: '1 column = 9u',
    clearspaceBody: 'Reserve 9u on all four sides.',
    variants: 'Variants',
    signal: 'Signal',
    signalUse: 'general use',
    mono: 'Mono',
    monoUse: 'document and print',
    inverse: 'Inverse',
    inverseUse: 'dark backgrounds',
    icon: 'Icon',
    iconUse: 'app and favicon',
    lockups: 'Lockups',
    lockupTitle: 'The signature changes shape, not hierarchy.',
    lockupAria: 'Signature variants',
    lockupTagline: 'Make complexity legible.',
    lockupUses: {
      horizontal: 'app bar, header, signature',
      apilado: 'report cover, social card',
      compacto: 'mobile, favicon, avatar',
    },
    lockupLabels: {
      horizontal: 'Horizontal',
      apilado: 'Stacked',
      compacto: 'Compact',
    },
    misuseTag: 'What breaks the mark',
    misuseIntro:
      'Six uses that make it illegible or make it promise something it is not.',
    misuse: {
      girar: {
        label: 'Do not rotate',
        note: 'the cantilever works from its column',
      },
      estirar: {
        label: 'Do not distort',
        note: 'depth is a proportion, not decoration',
      },
      recolorear: {
        label: 'Do not tint',
        note: 'the parent mark does not adopt a tool color',
      },
      contorno: {
        label: 'Do not outline',
        note: 'the hollow stroke disappears at 16 px',
      },
      sombra: {
        label: 'Do not add volume',
        note: 'depth lives in the surface, not the mark',
      },
      ruido: {
        label: 'Do not place over noise',
        note: 'without contrast there is no reading',
      },
    },
    rule: 'Preserve the mark geometry, clearspace, and signal arm.',
  },
} as const;

export const NEUTRAL_ROLE_COPY: Record<string, Localized> = {
  '000': { es: 'papel elevado', en: 'raised paper' },
  '050': { es: 'fondo', en: 'background' },
  '100': { es: 'superficie', en: 'surface' },
  '200': { es: 'superficie hundida', en: 'inset surface' },
  '300': { es: 'filete suave', en: 'soft rule' },
  '400': { es: 'filete visible', en: 'visible rule' },
  '500': { es: 'texto de apoyo', en: 'supporting text' },
  '600': { es: 'texto secundario', en: 'secondary text' },
  '700': { es: 'texto fuerte', en: 'strong text' },
  '900': { es: 'tinta', en: 'ink' },
};

export const SURFACE_LEVEL_COPY: Record<
  SurfaceLevel,
  { name: Localized; use: Localized; rule: Localized }
> = {
  plano: {
    name: { es: 'Plano', en: 'Flat' },
    use: {
      es: 'rejilla, tablas y filas técnicas',
      en: 'grid, tables, and technical rows',
    },
    rule: {
      es: 'filete suave, sin volumen: el dato se queda plano',
      en: 'soft rule, no volume: data stays flat',
    },
  },
  interior: {
    name: { es: 'Interior', en: 'Inset' },
    use: { es: 'cavidad de interacción', en: 'interaction cavity' },
    rule: {
      es: 'la luz se invierte: se hunde por arriba-izquierda',
      en: 'light inverts: it sinks from the top left',
    },
  },
  elevado: {
    name: { es: 'Elevado', en: 'Raised' },
    use: {
      es: 'paneles, barras e inspector',
      en: 'panels, bars, and inspector',
    },
    rule: {
      es: 'un escalón: sombra abajo-derecha, contacto arriba-izquierda',
      en: 'one step: shadow bottom right, contact top left',
    },
  },
  flotante: {
    name: { es: 'Flotante', en: 'Floating' },
    use: { es: 'menús, popovers y avisos', en: 'menus, popovers, and notices' },
    rule: {
      es: 'dos escalones, misma luz: se despega sin cambiar de material',
      en: 'two steps, same light: it lifts without changing material',
    },
  },
  hoja: {
    name: { es: 'Hoja', en: 'Sheet' },
    use: {
      es: 'superficies que nacen de un borde',
      en: 'surfaces that originate at an edge',
    },
    rule: {
      es: 'entra desde su origen y proyecta hacia él: la única sombra que sube',
      en: 'enters from its origin and projects toward it: the only shadow that rises',
    },
  },
  modal: {
    name: { es: 'Modal', en: 'Modal' },
    use: {
      es: 'interrupciones que exigen decisión',
      en: 'interruptions that require a decision',
    },
    rule: {
      es: 'velo, foco atrapado y salida evidente',
      en: 'scrim, trapped focus, and an obvious exit',
    },
  },
};

export const MATERIAL_COPY = {
  es: {
    project: 'proyecto · noroeste',
    verified: 'verificado',
    envelope: 'Envolvente de momento',
    level: 'Nivel',
    components: 'Componentes',
    geometry: 'La geometría no cambia entre temas.',
    geometryBody:
      'Cambian el papel, la tinta y la profundidad. Nunca la altura ni el trazo.',
    buttons: '01 · botones',
    inputs: '02 · entradas',
    visibleUnit: 'unidad visible',
    analyze: 'Analizar',
    compare: 'Comparar revisiones',
    detail: 'Ver detalle',
    delete: 'Eliminar 12 miembros',
    noResults: 'Sin resultados',
    buttonRule:
      'La etiqueta anticipa el resultado. Lo destructivo cuenta cuánto destruye.',
    load: 'Carga distribuida',
    length: 'Longitud',
    unitRule: 'Declara la unidad antes de analizar.',
    fieldRule: 'La unidad vive dentro del campo, no en una leyenda lejana.',
    ready: 'Listo',
    readyBody: 'Equilibrio verificado con tolerancia 1e−6.',
    review: 'Revisar',
    reviewBody: 'Falta declarar la unidad de la carga en 2 miembros.',
    context: 'Contexto',
    contextBody: 'El resultado corresponde a la revisión v4 del modelo.',
    tables: '03 · tablas',
    headerUnit: 'unidad en el encabezado',
    member: 'Miembro',
    result: 'Resultado',
    check: 'revisar',
    tableRule:
      'El equilibrio de un resultado no es el estado de una superficie del producto:',
    tableCalculation: 'verificado',
    tableReview: 'revisar',
    and: 'y',
    describeCalculation: 'describen el cálculo;',
    moduleAvailable: 'Disponible',
    moduleExperimental: 'Experimental',
    describeModule: 'describen el módulo.',
    today: 'hoy',
    tactileLab: 'Laboratorio táctil de botones',
    pressAction: 'Probar compresión táctil',
    pressStatus: 'Desplazamiento elástico: 1.5px',
    restStatus: 'Reposo: relieve volumétrico de arcilla',
    pressCount: 'Pulsaciones registradas',
    depthLevels: '4 niveles de materia',
    rule: 'Toda la luz entra por arriba-izquierda y ninguna superficie tiene luz propia: la profundidad es una sola, compartida, y por eso se puede leer.',
  },
  en: {
    project: 'project · northwest',
    verified: 'verified',
    envelope: 'Moment envelope',
    level: 'Level',
    components: 'Components',
    geometry: 'Geometry does not change between themes.',
    geometryBody: 'Paper, ink, and depth change. Height and stroke never do.',
    buttons: '01 · buttons',
    inputs: '02 · inputs',
    visibleUnit: 'visible unit',
    analyze: 'Analyze',
    compare: 'Compare revisions',
    detail: 'View details',
    delete: 'Delete 12 members',
    noResults: 'No results',
    buttonRule:
      'The label anticipates the outcome. Destructive actions state how much they destroy.',
    load: 'Distributed load',
    length: 'Length',
    unitRule: 'Declare the unit before analyzing.',
    fieldRule: 'The unit lives inside the field, not in a distant legend.',
    ready: 'Ready',
    readyBody: 'Equilibrium verified with tolerance 1e−6.',
    review: 'Review',
    reviewBody: 'The load unit is missing on 2 members.',
    context: 'Context',
    contextBody: 'The result belongs to model revision v4.',
    tables: '03 · tables',
    headerUnit: 'unit in the header',
    member: 'Member',
    result: 'Result',
    check: 'review',
    tableRule: 'Result equilibrium is not the same as a product surface state:',
    tableCalculation: 'verified',
    tableReview: 'review',
    and: 'and',
    describeCalculation: 'describe calculation;',
    moduleAvailable: 'Available',
    moduleExperimental: 'Experimental',
    describeModule: 'describe module.',
    today: 'today',
    tactileLab: 'Tactile Button Laboratory',
    pressAction: 'Test tactile compression',
    pressStatus: 'Elastic displacement: 1.5px',
    restStatus: 'Rest: elevated clay volume',
    pressCount: 'Registered presses',
    depthLevels: '4 material depth levels',
    rule: 'All light enters from top-left and no surface has its own glow: depth is singular and shared, which is why it remains legible.',
  },
} as const;

export const MOTION_DEMO_COPY: Record<
  MotionDemoId,
  { label: Localized; note: Localized; rule: Localized }
> = {
  llegar: {
    label: { es: 'Llegar', en: 'Arrive' },
    note: { es: 'entrada desde su origen', en: 'entry from its origin' },
    rule: {
      es: 'Un panel entra desde el borde que lo generó, nunca desde el centro.',
      en: 'A panel enters from the edge that generated it, never from the center.',
    },
  },
  conectar: {
    label: { es: 'Conectar', en: 'Connect' },
    note: {
      es: 'relación entre superficies',
      en: 'relationship between surfaces',
    },
    rule: {
      es: 'La línea de relación se dibuja antes de que aparezca el detalle.',
      en: 'The relationship line draws before the detail appears.',
    },
  },
  confirmar: {
    label: { es: 'Confirmar', en: 'Confirm' },
    note: { es: 'estado guardado', en: 'saved state' },
    rule: {
      es: 'La confirmación ocupa el lugar del control, no una esquina lejana.',
      en: 'The confirmation takes the control’s place, not a distant corner.',
    },
  },
  comparar: {
    label: { es: 'Comparar', en: 'Compare' },
    note: { es: 'dos revisiones', en: 'two revisions' },
    rule: {
      es: 'La comparación mantiene ejes y escala; solo cambia el trazo.',
      en: 'Comparison keeps axes and scale; only the stroke changes.',
    },
  },
  deshacer: {
    label: { es: 'Deshacer', en: 'Undo' },
    note: { es: 'volver sin castigo', en: 'return without penalty' },
    rule: {
      es: 'Deshacer devuelve la geometría por el mismo camino que la trajo.',
      en: 'Undo returns the geometry along the same path that brought it in.',
    },
  },
  esperar: {
    label: { es: 'Esperar', en: 'Wait' },
    note: { es: 'proceso en curso', en: 'process in progress' },
    rule: {
      es: 'La espera muestra avance real o dice que no puede estimarlo.',
      en: 'Waiting shows real progress or says it cannot estimate it.',
    },
  },
};

export const MOTION_COPY = {
  es: {
    calm: 'modo calma',
    active: 'vista activa',
    model: 'modelo',
    inspector: 'inspector',
    saved: 'Versión local guardada',
    messages: 'Seis mensajes',
    oneAtTime: 'uno a la vez',
    replay: 'Repetir',
    rule: 'Con prefers-reduced-motion o en modo calma, toda transición cae a cero y el contenido queda en su estado final. Nada se pierde.',
    piece: 'Pieza de marca',
    title: 'Del modelo a una decisión legible.',
    body: 'Diez segundos con la misma gramática: llegar, conectar, confirmar. La pieza no muestra una función que no exista.',
    format: 'formato',
    use: 'uso',
    usageValue: 'portada, presentación, encabezado',
    animation: 'Animación de marca de FusionStructure',
    filmLabel: 'estudio de movimiento',
    joint: 'nudo',
  },
  en: {
    calm: 'calm mode',
    active: 'active view',
    model: 'model',
    inspector: 'inspector',
    saved: 'Local version saved',
    messages: 'Six messages',
    oneAtTime: 'one at a time',
    replay: 'Replay',
    rule: 'With prefers-reduced-motion or calm mode, every transition falls to zero and content stays in its final state. Nothing is lost.',
    piece: 'Brand piece',
    title: 'From model to a legible decision.',
    body: 'Ten seconds with the same grammar: arrive, connect, confirm. The piece does not show a capability that does not exist.',
    format: 'format',
    use: 'use',
    usageValue: 'cover, presentation, header',
    animation: 'FusionStructure brand animation',
    filmLabel: 'motion study',
    joint: 'joint',
  },
} as const;

export const MOTION_TOKEN_COPY: Record<
  string,
  { name: Localized; use: Localized }
> = {
  '--fs-instant': {
    name: { es: 'Instante', en: 'Instant' },
    use: { es: 'presionar y soltar', en: 'press and release' },
  },
  '--fs-quick': {
    name: { es: 'Rápido', en: 'Quick' },
    use: { es: 'foco, hover y control', en: 'focus, hover, and control' },
  },
  '--fs-bridge': {
    name: { es: 'Puente', en: 'Bridge' },
    use: { es: 'cambio de plano', en: 'change of plane' },
  },
  '--fs-reveal': {
    name: { es: 'Revelar', en: 'Reveal' },
    use: { es: 'contenido contextual', en: 'contextual content' },
  },
  '--fs-trace': {
    name: { es: 'Trazo', en: 'Trace' },
    use: { es: 'dibujar un resultado', en: 'draw a result' },
  },
  '--fs-pulse': {
    name: { es: 'Pulso', en: 'Pulse' },
    use: { es: 'espera y proceso', en: 'waiting and processing' },
  },
};

export const EASING_COPY: Record<string, { name: Localized; use: Localized }> =
  {
    '--fs-ease': {
      name: { es: 'Salida', en: 'Ease out' },
      use: { es: 'casi todo', en: 'almost everything' },
    },
    '--fs-ease-in': {
      name: { es: 'Entrada', en: 'Ease in' },
      use: { es: 'algo que se va', en: 'something leaving' },
    },
    '--fs-ease-firm': {
      name: { es: 'Firme', en: 'Firm' },
      use: { es: 'estados y conmutadores', en: 'states and toggles' },
    },
  };

export const TYPE_SCALE_COPY: Record<
  string,
  { role: Localized; use: Localized }
> = {
  Display: {
    role: { es: 'Display', en: 'Display' },
    use: { es: 'una idea que abre', en: 'an idea that opens' },
  },
  Título: {
    role: { es: 'Título', en: 'Title' },
    use: { es: 'el tema de la sección', en: 'the section topic' },
  },
  Subtítulo: {
    role: { es: 'Subtítulo', en: 'Subtitle' },
    use: { es: 'la promesa del bloque', en: 'the block promise' },
  },
  Lectura: {
    role: { es: 'Lectura', en: 'Reading' },
    use: { es: 'el párrafo que acompaña', en: 'the supporting paragraph' },
  },
  Interfaz: {
    role: { es: 'Interfaz', en: 'Interface' },
    use: { es: 'controles y listas', en: 'controls and lists' },
  },
  Dato: {
    role: { es: 'Dato', en: 'Data' },
    use: {
      es: 'mono: unidad, versión, coordenada',
      en: 'mono: unit, version, coordinate',
    },
  },
  Etiqueta: {
    role: { es: 'Etiqueta', en: 'Label' },
    use: { es: 'mono en mayúsculas, 0.14em', en: 'uppercase mono, 0.14em' },
  },
};

export const NUMBER_RULE_COPY: Record<
  string,
  { rule: Localized; good: Localized; bad: Localized }
> = {
  '0': {
    rule: {
      es: 'La unidad viaja con el número',
      en: 'The unit travels with the number',
    },
    good: { es: '248.2 kN', en: '248.2 kN' },
    bad: { es: '248.2', en: '248.2' },
  },
  '1': {
    rule: { es: 'El signo es información', en: 'The sign is information' },
    good: { es: '−12.4 kN·m', en: '−12.4 kN·m' },
    bad: { es: '12.4 kN·m', en: '12.4 kN·m' },
  },
  '2': {
    rule: { es: 'La precisión no se infla', en: 'Precision is not inflated' },
    good: { es: '3.47 mm', en: '3.47 mm' },
    bad: { es: '3.4700000 mm', en: '3.4700000 mm' },
  },
  '3': {
    rule: { es: 'La escala se declara', en: 'The scale is declared' },
    good: { es: 'Δ ×120', en: 'Δ ×120' },
    bad: { es: 'deformada', en: 'deformed' },
  },
  '4': {
    rule: {
      es: 'La versión acompaña al resultado',
      en: 'The version travels with the result',
    },
    good: { es: 'v4 · 23/05', en: 'v4 · 23/05' },
    bad: { es: 'actual', en: 'current' },
  },
};

export const PATTERN_COPY = {
  es: {
    field: 'Campo de interfaz',
    desktop: 'Escritorio · mesa de trabajo',
    mobile: 'Móvil · modo enfocado',
    view: 'Vista del patrón',
    model: 'Modelo',
    loads: 'Cargas',
    results: 'Resultados',
    trace: 'Traza',
    project: 'pórtico-04',
    selected: 'selección · miembro B4',
    inspector: 'Inspector',
    section: 'Sección',
    moment: 'Momento',
    deformed: 'Deformada',
    openTrace: 'Abrir traza',
    states: 'Cuatro estados obligatorios',
    statesBody:
      'Toda superficie debe diseñar los cuatro antes de considerarse terminada.',
    stateLegend: 'Estado de la superficie',
    rule: 'Orientar, actuar, comprobar y continuar. Si una pantalla no permite las cuatro, le falta una.',
    snap: 'ajuste 0.25 m',
  },
  en: {
    field: 'Interface field',
    desktop: 'Desktop · workbench',
    mobile: 'Mobile · focused mode',
    view: 'Pattern view',
    model: 'Model',
    loads: 'Loads',
    results: 'Results',
    trace: 'Trace',
    project: 'frame-04',
    selected: 'selection · member B4',
    inspector: 'Inspector',
    section: 'Section',
    moment: 'Moment',
    deformed: 'Deformed',
    openTrace: 'Open trace',
    states: 'Four required states',
    statesBody:
      'Every surface must design all four before it is considered complete.',
    stateLegend: 'Surface state',
    rule: 'Orient, act, verify, and continue. If a screen cannot do all four, one is missing.',
    snap: 'snap 0.25 m',
  },
} as const;

export const PATTERN_STATE_COPY: Record<
  string,
  { label: Localized; title: Localized; body: Localized; action: Localized }
> = {
  vacio: {
    label: { es: 'Vacío', en: 'Empty' },
    title: { es: 'Sin resultados todavía', en: 'No results yet' },
    body: {
      es: 'Analiza el modelo para ver reacciones, diagramas y deformada.',
      en: 'Analyze the model to see reactions, diagrams, and deformation.',
    },
    action: { es: 'Analizar', en: 'Analyze' },
  },
  proceso: {
    label: { es: 'En proceso', en: 'In progress' },
    title: {
      es: 'Resolviendo 148 grados de libertad',
      en: 'Solving 148 degrees of freedom',
    },
    body: {
      es: 'Se puede seguir editando; el resultado quedará marcado como desactualizado.',
      en: 'Editing can continue; the result will be marked stale.',
    },
    action: { es: 'Cancelar', en: 'Cancel' },
  },
  error: {
    label: { es: 'Error', en: 'Error' },
    title: {
      es: 'El nudo B4 no tiene apoyo ni continuidad',
      en: 'Joint B4 has neither support nor continuity',
    },
    body: {
      es: 'La estructura es un mecanismo. Revisa B4 antes de volver a analizar.',
      en: 'The structure is a mechanism. Check B4 before analyzing again.',
    },
    action: { es: 'Ir a B4', en: 'Go to B4' },
  },
  exito: {
    label: { es: 'Resuelto', en: 'Solved' },
    title: { es: 'Equilibrio verificado', en: 'Equilibrium verified' },
    body: {
      es: 'Tolerancia 1e−6. Revisión v4 guardada localmente.',
      en: 'Tolerance 1e−6. Revision v4 saved locally.',
    },
    action: { es: 'Abrir traza', en: 'Open trace' },
  },
};

export const VOICE_COPY = {
  es: {
    rewrite: 'Reescritura',
    title: 'La misma idea, sostenible.',
    body: 'Elige una frase típica y mira qué queda cuando se le quita la promesa.',
    tabs: 'Frases para reescribir',
    promises: 'promete',
    supports: 'sostiene',
    why: 'Por qué:',
    glossary: 'Glosario',
    glossaryBody:
      'Seis palabras que significan lo mismo en la interfaz, en la documentación y en una conversación con quien revisa.',
    rule: 'FusionStructure no sustituye el criterio de una persona responsable, la revisión independiente ni la normativa aplicable. Escribir como si lo hiciera es un error de marca.',
  },
  en: {
    rewrite: 'Rewrite',
    title: 'The same idea, supportable.',
    body: 'Choose a common phrase and see what remains when its promise is removed.',
    tabs: 'Phrases to rewrite',
    promises: 'promises',
    supports: 'supports',
    why: 'Why:',
    glossary: 'Glossary',
    glossaryBody:
      'Six words that mean the same thing in the interface, documentation, and a conversation with a reviewer.',
    rule: 'FusionStructure does not replace the judgment of a responsible person, independent review, or applicable regulation. Writing as if it did is a brand error.',
  },
} as const;

export const VOICE_PRINCIPLE_COPY: Record<
  string,
  { title: Localized; body: Localized }
> = {
  estado: {
    title: { es: 'Primero el estado', en: 'Status comes first' },
    body: {
      es: 'Antes de explicar una función se dice si está disponible, es experimental o está planeada.',
      en: 'Before explaining a capability, say whether it is available, experimental, or planned.',
    },
  },
  limite: {
    title: {
      es: 'El límite es parte del dato',
      en: 'The limit is part of the data',
    },
    body: {
      es: 'Un número llega con unidad, método y supuesto. Un resultado sin límites no está terminado.',
      en: 'A number arrives with a unit, method, and assumption. A result without limits is unfinished.',
    },
  },
  accion: {
    title: { es: 'Una frase, una acción', en: 'One sentence, one action' },
    body: {
      es: 'La etiqueta dice qué va a pasar. Si la acción es destructiva, lo dice antes de ocurrir.',
      en: 'The label says what will happen. If the action is destructive, it says so before it happens.',
    },
  },
  persona: {
    title: { es: 'La persona decide', en: 'A person decides' },
    body: {
      es: 'El producto propone, calcula y explica. La responsabilidad técnica sigue siendo de quien firma.',
      en: 'The product proposes, calculates, and explains. Technical responsibility remains with the person who signs.',
    },
  },
};

export const VOICE_REWRITE_COPY: Record<
  string,
  { context: Localized; before: Localized; after: Localized; why: Localized }
> = {
  certificado: {
    context: { es: 'Resultado de análisis', en: 'Analysis result' },
    before: {
      es: 'Análisis certificado y listo para construcción.',
      en: 'Certified analysis ready for construction.',
    },
    after: {
      es: 'Análisis lineal resuelto. Requiere revisión profesional antes de usarse en obra.',
      en: 'Linear analysis solved. Requires professional review before use on site.',
    },
    why: {
      es: 'Ninguna puerta del repositorio certifica un resultado ni autoriza una obra.',
      en: 'No repository gate certifies a result or authorizes construction.',
    },
  },
  exacto: {
    context: { es: 'Precisión', en: 'Precision' },
    before: {
      es: 'Cálculo exacto con precisión garantizada.',
      en: 'Exact calculation with guaranteed precision.',
    },
    after: {
      es: 'Equilibrio verificado con tolerancia 1e-6. El modelo y sus hipótesis siguen siendo tuyos.',
      en: 'Equilibrium verified with tolerance 1e-6. The model and its assumptions are still yours.',
    },
    why: {
      es: 'La exactitud depende del modelo, no del motor.',
      en: 'Accuracy depends on the model, not the engine.',
    },
  },
  error: {
    context: { es: 'Error de modelo', en: 'Model error' },
    before: {
      es: 'Ocurrió un error inesperado.',
      en: 'An unexpected error occurred.',
    },
    after: {
      es: 'El nudo B4 no tiene apoyo ni continuidad: la estructura es un mecanismo. Revisa B4.',
      en: 'Joint B4 has neither support nor continuity: the structure is a mechanism. Check B4.',
    },
    why: {
      es: 'Un error debe nombrar el objeto y la siguiente acción.',
      en: 'An error should name the object and the next action.',
    },
  },
  vacio: {
    context: { es: 'Estado vacío', en: 'Empty state' },
    before: { es: 'No hay datos disponibles.', en: 'No data is available.' },
    after: {
      es: 'Todavía no hay resultados. Analiza el modelo para ver reacciones y diagramas.',
      en: 'There are no results yet. Analyze the model to see reactions and diagrams.',
    },
    why: {
      es: 'Un vacío explica qué falta y ofrece la acción que lo llena.',
      en: 'An empty state explains what is missing and offers the action that fills it.',
    },
  },
  ia: {
    context: { es: 'Asistencia', en: 'Assistance' },
    before: {
      es: 'La IA optimizó tu estructura automáticamente.',
      en: 'AI optimized your structure automatically.',
    },
    after: {
      es: 'Propuesta de asistencia: reducir IPE 300 a IPE 270 en 4 miembros. Revisa y confirma.',
      en: 'Assistance proposal: reduce IPE 300 to IPE 270 in 4 members. Review and confirm.',
    },
    why: {
      es: 'La asistencia propone; ejecutar sin confirmación oculta la decisión.',
      en: 'Assistance proposes; executing without confirmation hides the decision.',
    },
  },
  destructivo: {
    context: { es: 'Acción destructiva', en: 'Destructive action' },
    before: { es: '¿Continuar?', en: 'Continue?' },
    after: {
      es: 'Eliminar 12 miembros y sus cargas. Se puede deshacer en esta sesión.',
      en: 'Delete 12 members and their loads. This can be undone in this session.',
    },
    why: {
      es: 'Antes de destruir se dice qué se pierde y si hay regreso.',
      en: 'Before destroying, say what is lost and whether there is a way back.',
    },
  },
  planeado: {
    context: { es: 'Módulo futuro', en: 'Future module' },
    before: {
      es: 'Presupuestos integrados con tu modelo.',
      en: 'Budgets integrated with your model.',
    },
    after: {
      es: 'Cantidades y costos: planeado. Hoy no existe medición derivada del modelo.',
      en: 'Quantities and costs: planned. Model-derived measurement does not exist today.',
    },
    why: {
      es: 'Una intención no se escribe en presente.',
      en: 'An intention is not written in the present tense.',
    },
  },
  norma: {
    context: { es: 'Normativa', en: 'Regulation' },
    before: {
      es: 'Cumple con la norma aplicable.',
      en: 'Complies with the applicable standard.',
    },
    after: {
      es: 'Se evaluó fluencia por tensión axial. Faltan pandeo, aplastamiento y ruptura neta.',
      en: 'Yield in axial tension was evaluated. Buckling, crushing, and net-section rupture remain.',
    },
    why: {
      es: 'Cumplir se demuestra estado límite por estado límite.',
      en: 'Compliance is demonstrated limit state by limit state.',
    },
  },
};

export const MICROCOPY_COPY: Record<
  string,
  { group: Localized; items: { label: Localized; note: Localized }[] }
> = {
  botones: {
    group: { es: 'Botones', en: 'Buttons' },
    items: [
      {
        label: { es: 'Analizar', en: 'Analyze' },
        note: {
          es: 'la acción principal nombra el verbo del dominio',
          en: 'the primary action names the domain verb',
        },
      },
      {
        label: { es: 'Comparar revisiones', en: 'Compare revisions' },
        note: {
          es: 'el objeto aparece cuando hay más de uno posible',
          en: 'the object appears when more than one is possible',
        },
      },
      {
        label: { es: 'Guardar versión local', en: 'Save local version' },
        note: { es: 'dice dónde queda', en: 'says where it goes' },
      },
      {
        label: { es: 'Eliminar 12 miembros', en: 'Delete 12 members' },
        note: {
          es: 'lo destructivo cuenta cuánto',
          en: 'the destructive action says how much',
        },
      },
    ],
  },
  estados: {
    group: { es: 'Estados vacíos', en: 'Empty states' },
    items: [
      {
        label: { es: 'Sin resultados todavía', en: 'No results yet' },
        note: { es: 'temporal, no negativo', en: 'temporary, not negative' },
      },
      {
        label: {
          es: 'Analiza para ver diagramas',
          en: 'Analyze to see diagrams',
        },
        note: {
          es: 'la salida está en la misma frase',
          en: 'the outcome is in the same sentence',
        },
      },
      {
        label: {
          es: 'Este proyecto no tiene cargas',
          en: 'This project has no loads',
        },
        note: {
          es: 'nombra el objeto que falta',
          en: 'names the missing object',
        },
      },
      {
        label: { es: 'Importación DXF parcial', en: 'Partial DXF import' },
        note: { es: 'declara el alcance real', en: 'states the real scope' },
      },
    ],
  },
  avisos: {
    group: { es: 'Avisos', en: 'Notices' },
    items: [
      {
        label: {
          es: 'Revisa la unidad de la carga',
          en: 'Check the load unit',
        },
        note: {
          es: 'la revisión es una tarea, no un regaño',
          en: 'review is a task, not a reprimand',
        },
      },
      {
        label: {
          es: 'Resultado desactualizado respecto al modelo',
          en: 'Result is stale relative to the model',
        },
        note: { es: 'relación, no alarma', en: 'relationship, not alarm' },
      },
      {
        label: {
          es: 'Solver 3D: dominio experimental',
          en: 'Solver 3D: experimental domain',
        },
        note: {
          es: 'el estado precede al contenido',
          en: 'status precedes content',
        },
      },
      {
        label: {
          es: 'Sin conexión: guardado local',
          en: 'Offline: saved locally',
        },
        note: {
          es: 'confirma que no se perdió nada',
          en: 'confirms nothing was lost',
        },
      },
    ],
  },
};

export const GLOSSARY_COPY: Record<
  string,
  { term: Localized; meaning: Localized }
> = {
  Modelo: {
    term: { es: 'Modelo', en: 'Model' },
    meaning: {
      es: 'la representación editable: nudos, miembros, apoyos y cargas.',
      en: 'the editable representation: joints, members, supports, and loads.',
    },
  },
  Resultado: {
    term: { es: 'Resultado', en: 'Result' },
    meaning: {
      es: 'lo derivado de un análisis; se versiona, no se edita.',
      en: 'what is derived from an analysis; it is versioned, not edited.',
    },
  },
  Procedencia: {
    term: { es: 'Procedencia', en: 'Provenance' },
    meaning: {
      es: 'de qué modelo, motor, versión y supuestos nació un dato.',
      en: 'which model, engine, version, and assumptions produced a datum.',
    },
  },
  Revisión: {
    term: { es: 'Revisión', en: 'Revision' },
    meaning: {
      es: 'un estado congelado del proyecto que se puede comparar.',
      en: 'a frozen project state that can be compared.',
    },
  },
  Traza: {
    term: { es: 'Traza', en: 'Trace' },
    meaning: {
      es: 'el camino visible entre entrada, método y conclusión.',
      en: 'the visible path between input, method, and conclusion.',
    },
  },
  Puerta: {
    term: { es: 'Puerta', en: 'Gate' },
    meaning: {
      es: 'la comprobación mínima que un módulo debe pasar para cambiar de estado.',
      en: 'the minimum check a module must pass to change state.',
    },
  },
};

type ToolId = (typeof TOOLS)[number]['id'];

type ToolCopyFields = {
  name: Localized;
  role: Localized;
  summary: Localized;
  today: Localized;
  next: Localized;
  gate: Localized;
  reference: Localized;
};

type ToolEnglishFields = {
  name: string;
  role: string;
  summary: string;
  today: string;
  next: string;
  gate: string;
  reference: string;
};

const TOOL_ENGLISH: Record<ToolId, ToolEnglishFields> = {
  proyecto: {
    name: 'Local project',
    role: 'the unit everything shares',
    summary:
      'A project with identity, units, configuration, local versions, and recovery. Every surface reads and writes here.',
    today:
      'Project, configuration, units, local persistence, recovery, versions, and reversible changes.',
    next: 'Stable identity across domains, permissions, and optional sync without breaking the local flow.',
    gate: 'Save, recover, and undo without silently losing information.',
    reference: 'Desktop project managers',
  },
  calidad: {
    name: 'Result quality',
    role: 'audit before trust',
    summary:
      'Load audit, diagnostics, a limited numerical certificate, and traceability for every result.',
    today:
      'Load audit, diagnostics, reliability, and result trace within the 2D solver scope.',
    next: 'More pathological cases, declared tolerances, and comparison between revisions.',
    gate: 'A result without visible units, method, and limits is not presented as a conclusion.',
    reference: 'Numerical verification practices',
  },
  memoria: {
    name: 'Technical report',
    role: 'the calculation, written down',
    summary:
      'PDF report with appendices, diagrams, procedure, and materials, plus a portable record and preview.',
    today:
      'PDF report, appendices, diagrams, procedure, materials, portable record, and preview.',
    next: 'Jurisdiction templates, review signature, and comparison between deliveries.',
    gate: 'The document declares generator, model version, and status; it does not simulate a sealed drawing.',
    reference: 'Firm calculation reports',
  },
  intercambio: {
    name: 'Current exchange',
    role: 'leave without lock-in',
    summary:
      'Project JSON, SVG, PNG, CSV, shareable links, and ASCII DXF import for a subset.',
    today:
      'JSON/SVG/PNG/CSV export, shareable links, and DXF import for a subset.',
    next: 'Wider DXF coverage, loss report, and tested round-trip.',
    gate: 'Every import declares what it understood, ignored, and which units it used.',
    reference: 'DXF, CSV, JSON',
  },
  biblioteca: {
    name: 'Personal library',
    role: 'what you already solved',
    summary:
      'Sections, views, favorites, and local preferences that follow a person across projects.',
    today: 'Sections, views, favorites, and local preferences.',
    next: 'Shareable catalogs with provenance and a version for every profile.',
    gate: 'A saved section preserves origin, units, and date.',
    reference: 'Section catalogs',
  },
  offline: {
    name: 'Offline work',
    role: 'the workshop does not always have a network',
    summary:
      'PWA shell, local storage, and a controlled update notice: offline work is a core capability.',
    today: 'PWA shell, local storage, and controlled update notice.',
    next: 'Conflict resolution on reconnect and explicit backup.',
    gate: 'No update discards local work without warning.',
    reference: 'Local-first applications',
  },
  asistencia: {
    name: 'Local assistance',
    role: 'proposes, does not decide',
    summary:
      'Local command proposals. It must not hide or execute ambiguous actions without confirmation.',
    today: 'Command proposals for the open model, always confirmable.',
    next: 'Explain why, preview the effect, and guarantee undo.',
    gate: 'No ambiguous action executes without explicit confirmation.',
    reference: 'Command palettes',
  },
  'fs-a01': {
    name: 'FStructure',
    role: '2D solver · frames, trusses, and beams',
    summary:
      'The available core: model, analyze, and read results with the procedure in view, in the browser. FStructure is the module name; 2D Solver is its family role.',
    today:
      'Joints, members, supports, properties, loads, cases, and combinations; linear and P-Delta analysis; reactions, deformation, N-V-M, envelopes, influence, buckling, and modal studies.',
    next: 'Independent numerical suite, more pathological cases, sign and unit contracts, and external oracles.',
    gate: 'Equilibrium, compatibility, reactions, and displacements against manual cases and an independent oracle.',
    reference: 'FTOOL, Edubeam, RFEM',
  },
  'fs-a02': {
    name: '3D Solver',
    role: 'separate spatial frame',
    summary:
      'A spatial domain isolated from 2D. It exists, solves linear elastic cases, and does not share contracts yet.',
    today:
      'Linear elastic spatial frame, six degrees of freedom per node, nodal loads, and end forces.',
    next: 'Transformations, releases, springs, distributed loads, diaphragms, mass, dynamics, and stability.',
    gate: 'Spatial frames with rigid rotations, symmetry, and 3D equilibrium; deterministic rejection of singular models.',
    reference: 'ETABS, SAP2000, RFEM, OpenSees',
  },
  'fs-a03': {
    name: 'Finite elements',
    role: 'fields, meshes, and convergence',
    summary:
      '2D/3D meshes with linear and later nonlinear materials. Structural, mechanical, and geotechnical families are not faked as one constitutive model.',
    today: 'No implementation yet.',
    next: 'Meshes, contacts, boundaries, stages, adaptivity, convergence, and result fields.',
    gate: 'Patch tests, mesh refinement, equilibrium conservation, and comparison with analytical solutions.',
    reference: 'Ansys Mechanical, PLAXIS',
  },
  'fs-a04': {
    name: 'Materials design',
    role: 'demand versus capacity',
    summary:
      'Today there is one deliberately incomplete steel limit state in axial tension. It is not integral design.',
    today:
      'A component separate from the analysis result, with material, section, standard source, and explicit blockers.',
    next: 'Concrete, timber, and masonry; versioned standards packages; evaluated and missing limit states made visible.',
    gate: 'Reproduce every clause by hand and block the conclusion when a limit state is missing.',
    reference: 'ETABS, Osdag, StructuralCodes',
  },
  'fs-m01': {
    name: 'CAD drawing',
    role: 'precise, open geometry',
    summary:
      '2D/3D geometry with layers, blocks, references, dimensions, and constraints. A line can represent, but it cannot silently replace a project entity.',
    today: 'No implementation yet.',
    next: 'Layers, blocks, external references, dimensions, constraints, styles, layouts, and open export.',
    gate: 'Tolerances, snapping, undo, format round-trip, and zero silent coordinate changes.',
    reference: 'AutoCAD, Rhino',
  },
  'fs-m02': {
    name: 'BIM model',
    role: 'physical and analytical, related',
    summary:
      'Levels, axes, spaces, elements, phases, and views. IFC will be an exchange contract, not the entire internal model.',
    today: 'No implementation yet.',
    next: 'Construction elements, classifications, tables, and an explicit relationship between physical and analytical models.',
    gate: 'Stable identity, migrations, version comparison, and declared information loss.',
    reference: 'Revit, Archicad, Tekla Structures',
  },
  'fs-m03': {
    name: 'Detailing',
    role: 'from calculation to fabrication',
    summary:
      'Connections, plates, bolts, welds, and reinforcement. An analysis result does not automatically become an approved detail.',
    today: 'No implementation yet.',
    next: 'Numbering, shop drawings, assemblies, bill of materials, and fabrication packages.',
    gate: 'Consistency between model, views, bill of materials, and exported file.',
    reference: 'Tekla Structures, SolidWorks',
  },
  'fs-c01': {
    name: 'Terrain',
    role: 'the site as data',
    summary:
      'Surveys, surfaces, alignments, and volumes with coordinates, source, and accuracy as first-class data.',
    today: 'No implementation yet.',
    next: 'Points, TIN, contours, parcels, alignments, profiles, corridors, and cut/fill.',
    gate: 'CRS, datum, units, accuracy, source, and volume balance recorded.',
    reference: 'Civil 3D, QGIS',
  },
  'fs-c02': {
    name: 'Geotechnics',
    role: 'soil, water, and stages',
    summary:
      'Strata, water table, excavations, and staged stability, with visible constitutive assumptions.',
    today: 'No implementation yet.',
    next: 'Support, flow, consolidation, and soil-structure interaction by phase.',
    gate: 'Academic benchmarks, mesh studies, and clear warnings about missing field data.',
    reference: 'PLAXIS, GeoStudio',
  },
  'fs-c03': {
    name: 'Water and drainage',
    role: 'networks, basins, and scenarios',
    summary:
      'Pressurized networks, drainage, rainfall, runoff, and storage with reproducible balances.',
    today: 'No implementation yet.',
    next: 'Basins, pumps, water quality, and scenario comparison.',
    gate: 'Mass and energy continuity, temporal stability, and comparison against official example files.',
    reference: 'EPANET, SWMM',
  },
  'fs-p01': {
    name: 'Documents',
    role: 'every mark points somewhere',
    summary:
      'Sheets, marks, revisions, issues, and final record where each issue points to an object, view, and revision.',
    today:
      'The current technical report is an available base; the coordinated surface does not yet exist.',
    next: 'Sheet comparison, transmittals, RFI, submittals, and owners.',
    gate: 'Every document preserves generator, model version, status, checksum, and difference.',
    reference: 'Bluebeam, Navisworks',
  },
  'fs-p02': {
    name: 'Quantities and costs',
    role: 'measure before estimating',
    summary:
      'Takeoff, catalogs, unit-price analyses, and budget, always distinguishing derived measurement from manual entry.',
    today: 'No implementation yet.',
    next: 'Items, materials, labor, equipment, indirects, and comparisons by revision.',
    gate: 'Currency, price date, unit, production rate, formula, rounding, and source visible.',
    reference: 'Neodata, Opus',
  },
  'fs-p03': {
    name: 'Schedule and field',
    role: 'construction against the plan',
    summary:
      'WBS, critical path, resources, progress, and field evidence joined to the element and its cost.',
    today: 'No implementation yet.',
    next: 'Calendars, risks, 4D, daily reports, safety, photos, and issues.',
    gate: 'Verified critical path, explicit time zones, offline operation, and evidence linked to activity and version.',
    reference: 'Primavera P6, Procore',
  },
  'fs-i01': {
    name: 'Connectors',
    role: 'exchange with checkpoint',
    summary:
      'Versioned adapters with preview, differences, confirmation, and a return point. The current base is not a hub.',
    today:
      'Partial DXF import and existing exports; the versioned hub is still a vision.',
    next: 'Revit, AutoCAD, IFC, BCF, IDS, and authoring APIs adapters.',
    gate: 'Immutable source snapshot, added-changed-deleted diff, idempotence, and reversible checkpoint.',
    reference: 'IFC, BCF, IDS, APS',
  },
  'fs-l01': {
    name: 'Structural classroom',
    role: 'predict before revealing',
    summary:
      'Guided exercises on the same model and analysis, with a personal prediction before the result.',
    today:
      'Beam, cantilever, frame, and truss exercises; parameters with units; build, define, analyze, compare, and conclude path.',
    next: 'Versioned exercise library, rubrics, and portable teaching packages.',
    gate: 'Every exercise includes a manual answer or oracle, conventions, tolerances, and a conclusion distinguishing prediction from result.',
    reference: 'FTOOL, Edubeam, IndeterminateBeam',
  },
  'fs-l02': {
    name: 'Research workshop',
    role: 'the question and its evidence',
    summary:
      'Problem, hypothesis, variables, method, sources, and decisions linked to project snapshots.',
    today: 'No implementation yet.',
    next: 'Versioned protocol, milestones, ethics, and decision log.',
    gate: 'The report can be reconstructed from versioned sources, decisions, data, and executions.',
    reference: 'Quarto, reference managers',
  },
  'fs-l03': {
    name: 'Reproducible lab',
    role: 'same number on another machine',
    summary:
      'Data, parameters, engine, version, tolerance, and artifacts for each run, tied to a project snapshot.',
    today: 'No implementation yet.',
    next: 'Notebooks, datasets, environments, hashes, metrics, and versioned figures.',
    gate: 'Another machine reconstructs the result or explains why it cannot.',
    reference: 'JupyterLab, DVC',
  },
  'fs-l04': {
    name: 'Mentoring and trajectory',
    role: 'agreements with evidence',
    summary:
      'Sessions, agreements, milestones, and blockers evaluated by evidence from real work, not gamification.',
    today: 'No implementation yet.',
    next: 'Agenda, owners, criteria, alerts, and next actions linked to the project.',
    gate: 'Every agreement can be closed, reopened, and audited; removing the external connector does not destroy the record.',
    reference: 'LMS and task managers',
  },
};

export const TOOL_COPY: Record<ToolId, ToolCopyFields> = Object.fromEntries(
  TOOLS.map((tool) => {
    const english = TOOL_ENGLISH[tool.id];
    return [
      tool.id,
      {
        name: { es: tool.name, en: english.name },
        role: { es: tool.role, en: english.role },
        summary: { es: tool.summary, en: english.summary },
        today: { es: tool.today, en: english.today },
        next: { es: tool.next, en: english.next },
        gate: { es: tool.gate, en: english.gate },
        reference: { es: tool.reference, en: english.reference },
      },
    ];
  }),
) as Record<ToolId, ToolCopyFields>;

export const REFERENCE_COPY = {
  es: {
    eyebrow: 'Referencias · el sistema en producto',
    title: 'Una identidad, cualquier superficie.',
    body: 'Estas piezas fijan proporción, densidad, jerarquía y profundidad. Son mockups propios y editables: muestran criterio, no capacidades prometidas.',
    atlasAria: 'Demostraciones Clay construidas con el sistema',
    atlasNote: 'Tres demostraciones editables · cero fotografía',
    deviceDayLabel: 'estudio de dispositivo · día',
    deviceDayTitle: 'escritorio + teléfono',
    deviceDayAlt: 'FusionStructure en monitor y teléfono, modo día',
    deviceNightLabel: 'estudio de dispositivo · noche',
    deviceNightTitle: 'carbón neutro',
    deviceNightAlt: 'FusionStructure en monitor y teléfono, modo noche',
    dayGroup: 'día · papel técnico',
    nightGroup: 'noche · carbón',
    referenceCount: '05 mockups',
    mobile: 'móvil',
    desktop: 'escritorio',
    mockupAlt: 'Referencia de FusionStructure',
    rule: 'Aplicar principios, no copiar pantallas: papel técnico, un solo escalón de volumen con una sola luz, color con significado y movimiento que explica procedencia.',
  },
  en: {
    eyebrow: 'References · the system in product',
    title: 'One identity, every surface.',
    body: 'These pieces set proportion, density, hierarchy, and depth. They are original, editable mockups: design criteria, not promised capabilities.',
    atlasAria: 'Clay demonstrations built with the system',
    atlasNote: 'Three editable demonstrations · zero photography',
    deviceDayLabel: 'device study · day',
    deviceDayTitle: 'desktop + phone',
    deviceDayAlt: 'FusionStructure on monitor and phone, day mode',
    deviceNightLabel: 'device study · night',
    deviceNightTitle: 'neutral charcoal',
    deviceNightAlt: 'FusionStructure on monitor and phone, night mode',
    dayGroup: 'day · technical paper',
    nightGroup: 'night · charcoal',
    referenceCount: '05 mockups',
    mobile: 'mobile',
    desktop: 'desktop',
    mockupAlt: 'FusionStructure reference',
    rule: 'Apply principles, do not copy screens: technical paper, one volume step with one light, meaningful color, and motion that explains provenance.',
  },
} as const;

export const HANDOFF_COPY = {
  es: {
    tokens: 'Hoja de tokens · propuesta',
    copySheet: 'Copiar la hoja completa',
    tokensNote:
      'Valores propuestos por el brandbook. La aplicación conserva los de',
    tokensRest:
      'hasta que exista una migración con capturas comparables y revisión de accesibilidad.',
    checks: 'Antes de cerrar un cambio',
    checksNote: 'Las puertas del repositorio',
    checksRest:
      'no certifican una función: solo dicen que lo automatizado pasó.',
    assets: 'Activos',
    assetNote: 'Los 25 glifos de herramienta viven en',
    assetRest: 'con el identificador de cada superficie. Se regeneran con',
    assetEnd: ': no se editan a mano.',
    inventory: 'Inventario',
    surfaces: 'superficies',
    maturity: 'Madurez del sistema',
    ownership: 'Propiedad y cambios',
    owner: 'Propietario',
    source: 'Fuente',
    changelog: 'Changelog',
    changelogValue: 'Atlas Clay–Minimal · primera edición',
  },
  en: {
    tokens: 'Token sheet · proposal',
    copySheet: 'Copy the complete sheet',
    tokensNote:
      'Values proposed by the brandbook. The application keeps those in',
    tokensRest:
      'until a migration with comparable captures and accessibility review exists.',
    checks: 'Before closing a change',
    checksNote: 'Repository gates',
    checksRest:
      'do not certify a feature: they only say automated checks passed.',
    assets: 'Assets',
    assetNote: 'The 25 tool glyphs live in',
    assetRest: 'with each surface identifier. Regenerate them with',
    assetEnd: ': do not edit them manually.',
    inventory: 'Inventory',
    surfaces: 'surfaces',
    maturity: 'System maturity',
    ownership: 'Ownership and changes',
    owner: 'Owner',
    source: 'Source',
    changelog: 'Changelog',
    changelogValue: 'Atlas Clay–Minimal · first edition',
  },
} as const;

export const BRAND_ASSET_COPY: Record<
  string,
  { name: Localized; note: Localized }
> = {
  signal: {
    name: { es: 'Marca · señal', en: 'Mark · signal' },
    note: {
      es: 'uso general, brazo en color de señal',
      en: 'general use, arm in signal color',
    },
  },
  mono: {
    name: { es: 'Marca · mono', en: 'Mark · mono' },
    note: {
      es: 'documento, impresión y grabado',
      en: 'document, print, and engraving',
    },
  },
  inverse: {
    name: { es: 'Marca · inversa', en: 'Mark · inverse' },
    note: { es: 'fondos oscuros', en: 'dark backgrounds' },
  },
  icon: {
    name: { es: 'Icono de aplicación', en: 'App icon' },
    note: {
      es: 'carbón con esquina de 11u',
      en: 'charcoal with an 11u corner',
    },
  },
  lockup: {
    name: { es: 'Firma horizontal', en: 'Horizontal lockup' },
    note: { es: 'marca, nombre y principio', en: 'mark, name, and principle' },
  },
  favicon: {
    name: { es: 'Favicon', en: 'Favicon' },
    note: { es: '16 px en adelante', en: '16 px and up' },
  },
};

export const HANDOFF_CHECK_COPY: Localized[] = [
  {
    es: 'El color usado explica una relación del dominio.',
    en: 'The color used explains a domain relationship.',
  },
  {
    es: 'El estado (Disponible, Experimental, Planeado) aparece antes que la promesa.',
    en: 'Status (Available, Experimental, Planned) appears before the promise.',
  },
  {
    es: 'Cada número lleva unidad, signo y precisión declarada.',
    en: 'Every number carries a unit, sign, and declared precision.',
  },
  {
    es: 'La animación se puede apagar sin perder información.',
    en: 'Animation can be turned off without losing information.',
  },
  {
    es: 'El foco es visible con teclado en día y en noche.',
    en: 'Focus is visible with a keyboard in day and night.',
  },
  {
    es: 'El glifo distingue la herramienta incluso sin color.',
    en: 'The glyph distinguishes the tool even without color.',
  },
  {
    es: 'La profundidad usa la luz del sistema y no tiñe: ninguna pieza se ilumina sola.',
    en: 'Depth uses the system light and does not tint: no piece lights itself.',
  },
];

export const STATUS_COPY = {
  disponible: { es: 'Disponible', en: 'Available' },
  experimental: { es: 'Experimental', en: 'Experimental' },
  planeado: { es: 'Planeado', en: 'Planned' },
  'no-comprometido': { es: 'No comprometido', en: 'Not committed' },
} as const;

export const STATUS_MEANING_COPY: Record<StatusId, Localized> = {
  disponible: {
    es: 'Existe una ruta utilizable dentro del alcance documentado.',
    en: 'A usable path exists within the documented scope.',
  },
  experimental: {
    es: 'Implementación parcial o validación todavía insuficiente.',
    en: 'Partial implementation or validation is still insufficient.',
  },
  planeado: {
    es: 'Objetivo aprobado para una fase futura.',
    en: 'An approved objective for a future phase.',
  },
  'no-comprometido': {
    es: 'Idea sin contrato, sin fecha y sin promesa.',
    en: 'An idea with no contract, date, or promise.',
  },
};

export const STATUS_RULE_COPY: Record<StatusId, Localized> = {
  disponible: {
    es: 'Se puede usar hoy. No equivale a certificación ni a obra.',
    en: 'Usable today. It does not equal certification or construction work.',
  },
  experimental: {
    es: 'Se muestra con sus límites y nunca como resultado final.',
    en: 'Shown with its limits, never as a final result.',
  },
  planeado: {
    es: 'Se dibuja, no se insinúa como existente.',
    en: 'Drawn as a plan, never implied to exist.',
  },
  'no-comprometido': {
    es: 'Solo aparece cuando la conversación es sobre dirección.',
    en: 'Appears only when the conversation is about direction.',
  },
};

export const FAMILY_COPY: Record<
  FamilyId,
  { label: Localized; purpose: Localized }
> = {
  nucleo: {
    label: { es: 'FusionStructure', en: 'FusionStructure' },
    purpose: {
      es: 'marca madre, proyecto, unidades, versiones y evidencia compartida',
      en: 'parent brand, project, units, versions, and shared evidence',
    },
  },
  analisis: {
    label: { es: 'Análisis', en: 'Analysis' },
    purpose: {
      es: 'solvers, comprobaciones y calidad numérica',
      en: 'solvers, checks, and numerical quality',
    },
  },
  modelo: {
    label: { es: 'Modelo', en: 'Model' },
    purpose: {
      es: 'dibujo, modelo constructivo y detallado',
      en: 'drawing, construction model, and detailing',
    },
  },
  civil: {
    label: { es: 'Civil', en: 'Civil' },
    purpose: {
      es: 'terreno, suelo y sistemas físicos del sitio',
      en: 'terrain, soil, and site physical systems',
    },
  },
  proyecto: {
    label: { es: 'Proyecto', en: 'Project' },
    purpose: {
      es: 'documentos, cantidades, costo, programa y campo',
      en: 'documents, quantities, cost, schedule, and field',
    },
  },
  interop: {
    label: { es: 'Conexiones', en: 'Connections' },
    purpose: {
      es: 'intercambio versionado con otras aplicaciones',
      en: 'versioned exchange with other applications',
    },
  },
  aprendizaje: {
    label: { es: 'Aprendizaje', en: 'Learning' },
    purpose: {
      es: 'aula, investigación, laboratorio y trayectoria',
      en: 'classroom, research, lab, and learning path',
    },
  },
};

export const TOOL_CODE_COPY: Record<string, Localized> = {
  NÚCLEO: { es: 'FS', en: 'FS' },
};

export const SIGNAL_COPY: Record<
  SignalId,
  { name: Localized; use: Localized; description: Localized }
> = {
  axial: {
    name: { es: 'Axial', en: 'Axial' },
    use: { es: 'fuerza normal', en: 'normal force' },
    description: {
      es: 'Tensión y compresión a lo largo del miembro.',
      en: 'Tension and compression along the member.',
    },
  },
  moment: {
    name: { es: 'Momento', en: 'Moment' },
    use: { es: 'flexión', en: 'bending' },
    description: {
      es: 'Diagramas de momento, giros y zonas dominadas por flexión.',
      en: 'Moment diagrams, rotations, and bending-dominated zones.',
    },
  },
  shear: {
    name: { es: 'Cortante', en: 'Shear' },
    use: { es: 'fuerza transversal', en: 'transverse force' },
    description: {
      es: 'Cortante y transferencia entre elementos.',
      en: 'Shear and transfer between elements.',
    },
  },
  deformed: {
    name: { es: 'Deformada', en: 'Deformed' },
    use: { es: 'geometría desplazada', en: 'displaced geometry' },
    description: {
      es: 'Distingue la forma desplazada de la geometría original.',
      en: 'Distinguishes displaced shape from original geometry.',
    },
  },
  yield: {
    name: { es: 'Fluencia', en: 'Yield' },
    use: { es: 'estado límite local', en: 'local limit state' },
    description: {
      es: 'Plastificación, líneas de fluencia y estados límite locales.',
      en: 'Plasticity, yield lines, and local limit states.',
    },
  },
  attention: {
    name: { es: 'Atención', en: 'Attention' },
    use: { es: 'dato incompleto', en: 'incomplete data' },
    description: {
      es: 'Pide revisión, marca supuestos y señala información faltante.',
      en: 'Requests review, marks assumptions, and flags missing information.',
    },
  },
};

export const SIGNAL_UNIT_COPY: Record<SignalId, Localized> = {
  axial: { es: 'kN', en: 'kN' },
  moment: { es: 'kN·m', en: 'kN·m' },
  shear: { es: 'kN', en: 'kN' },
  deformed: { es: 'mm', en: 'mm' },
  yield: { es: 'estado', en: 'state' },
  attention: { es: 'revisión', en: 'review' },
};

export const ARIA_COPY = {
  es: {
    clayReference: 'Referencia visual Clay–Minimal',
    brandMark: 'Marca de FusionStructure',
    themeToggle: 'Cambiar tema',
  },
  en: {
    clayReference: 'Clay–Minimal visual reference',
    brandMark: 'FusionStructure mark',
    themeToggle: 'Change theme',
  },
} as const;

export const SYSTEM_MATURITY = [
  {
    id: 'draft',
    label: { es: 'Borrador', en: 'Draft' },
    detail: { es: 'exploración visual', en: 'visual exploration' },
  },
  {
    id: 'preview',
    label: { es: 'Preview', en: 'Preview' },
    detail: { es: 'probado en Atlas', en: 'tested in Atlas' },
  },
  {
    id: 'stable',
    label: { es: 'Estable', en: 'Stable' },
    detail: { es: 'listo para reutilizar', en: 'ready to reuse' },
  },
  {
    id: 'deprecated',
    label: { es: 'Retirado', en: 'Deprecated' },
    detail: { es: 'no usar en trabajo nuevo', en: 'do not use for new work' },
  },
] as const;

export const EXPLORER_COPY = {
  es: {
    scene: 'Escena',
    viewport: 'Ancho de referencia',
    theme: 'Tema de la escena',
    project: 'pórtico-04',
    verified: 'equilibrio verificado',
    model: 'modelo',
    result: 'resultado',
    decision: 'decisión',
    signals: 'Señales',
    families: 'Familias',
    status: 'Estados',
    scales: 'Escala de color',
    details: 'Definiciones y guardas',
    glyphs: 'Inventario de glifos',
    drawing: 'Reglas de dibujo',
    mono: 'Monocromo',
    color: 'Color de familia',
    iconSize: 'Tamaño del icono',
    inspector: 'Inspector estructural',
    microcopy: 'Ejemplos de interfaz',
    identityClearspace: '48u · 8u de aire',
    canonicalMint: 'Verde canónico · AA 4.64:1',
    geometrySpec: 'Geometría estructural',
  },
  en: {
    scene: 'Scene',
    viewport: 'Reference width',
    theme: 'Scene theme',
    project: 'frame-04',
    verified: 'equilibrium verified',
    model: 'model',
    result: 'result',
    decision: 'decision',
    signals: 'Signals',
    families: 'Families',
    status: 'Status',
    scales: 'Color scale',
    details: 'Definitions and guardrails',
    glyphs: 'Glyph inventory',
    drawing: 'Drawing rules',
    mono: 'Monochrome',
    color: 'Family color',
    iconSize: 'Icon size',
    inspector: 'Structural inspector',
    microcopy: 'Interface examples',
    identityClearspace: '48u · 8u clear space',
    canonicalMint: 'Canonical mint · AA 4.64:1',
    geometrySpec: 'Structural geometry',
  },
} as const;

export const CLAY_SCENE_COPY = {
  cover: {
    title: { es: 'Identidad', en: 'Identity' },
    note: {
      es: 'Ficha de identidad de marca sobre arcilla física y proporciones seguras.',
      en: 'Brand identity specimen on physical clay and safe proportions.',
    },
    proof: { es: 'Cotas y aire', en: 'Bounds & clear space' },
  },
  spread: {
    title: { es: 'Editorial', en: 'Editorial' },
    note: {
      es: 'Ordena con retícula, cotas y aire.',
      en: 'Organize with grid, dimensions, and space.',
    },
    proof: { es: 'Jerarquía', en: 'Hierarchy' },
  },
  product: {
    title: { es: 'Producto', en: 'Product' },
    note: {
      es: 'Mantén dato, estado y procedencia al cambiar de tema.',
      en: 'Preserve data, status, and provenance across themes.',
    },
    proof: { es: 'Modo y estado', en: 'Mode and status' },
  },
} as const;
