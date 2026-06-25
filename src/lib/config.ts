/**
 * Tipos do config-driven CMS. Você descreve o modelo de conteúdo em
 * `src/config/cms.ts` — coleções e campos — e a UI do painel + a API pública
 * são geradas a partir disso, sem editar o "engine".
 */

export type Widget =
  | 'string' // input de texto curto
  | 'text' // textarea
  | 'markdown' // editor rico (EasyMDE)
  | 'image' // upload/seleção do Vercel Blob
  | 'select' // dropdown (use `options`)
  | 'boolean' // checkbox
  | 'number' // numérico
  | 'datetime' // data (YYYY-MM-DD)
  | 'url' // input type=url
  | 'email' // input type=email
  | 'color' // seletor de cor (#hex)
  | 'object' // grupo de subcampos (use `fields`) salvo como um objeto
  | 'relation' // referência a uma entrada de outra coleção (use `collection`)
  | 'list'; // repetidor (lista de strings, ou de objetos via `fields`)

export interface Field {
  name: string;
  label: string;
  widget: Widget;
  required?: boolean;
  hint?: string;
  /** Coloca o campo na coluna lateral do editor (em vez da principal). */
  sidebar?: boolean;
  /** Para `select`. */
  options?: string[];
  /** Para `list` de objetos e `object`: subcampos. */
  fields?: Field[];
  /** Para `relation`: nome da coleção referenciada. */
  collection?: string;
  /** Para `relation`: campo guardado (default 'slug') e exibido (default titleField). */
  valueField?: string;
  labelField?: string;
  /** Valor inicial em itens novos. */
  default?: unknown;
}

export interface Collection {
  /** id interno e nome na URL/banco (slug, sem espaços). */
  name: string;
  label: string; // plural, ex.: "Publicações"
  labelSingular?: string; // ex.: "Publicação"
  /** Campo usado como título nas listagens (default: 'title' se existir). */
  titleField?: string;
  /** Mostra o toggle "Destaque". */
  featurable?: boolean;
  /** Mostra o campo "Ordem" e ordena por ele. */
  orderable?: boolean;
  fields: Field[];
}

export interface Singleton {
  key: string;
  label: string;
  fields: Field[];
}

export interface CmsConfig {
  /** Nome exibido no topo do painel. */
  siteName?: string;
  /** URL pública do site (usada nos links "Ver no site"). Opcional. */
  siteUrl?: string;
  collections: Collection[];
  singletons?: Singleton[];
}

/** Helper de tipagem para `src/config/cms.ts`. */
export function defineConfig(config: CmsConfig): CmsConfig {
  return config;
}
