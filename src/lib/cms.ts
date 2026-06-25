/** Config resolvido + helpers. Lê `src/config/cms.ts`. */
import userConfig from '@/config/cms';
import type { Collection, Singleton } from './config';

export const config = userConfig;
export const collections = config.collections;
export const siteUrl = (config.siteUrl ?? '').replace(/\/+$/, '');

export const getCollection = (name: string): Collection | undefined =>
  config.collections.find((c) => c.name === name);

export const getSingletonDef = (key: string): Singleton | undefined =>
  config.singletons?.find((s) => s.key === key);

/** Texto-título de uma entrada, a partir do `titleField` (ou 'title'). */
export function titleOf(col: Collection, data: Record<string, unknown>): string {
  const f = col.titleField ?? 'title';
  const v = data?.[f];
  return v ? String(v) : '(sem título)';
}

/** Avisos de sanidade no config (não quebra o build; só console.warn). */
function validateConfig() {
  const seen = new Set<string>();
  for (const c of config.collections) {
    if (seen.has(c.name)) console.warn(`[cms] coleção duplicada: "${c.name}"`);
    seen.add(c.name);
    for (const f of c.fields) {
      if (f.widget === 'relation' && f.collection && !config.collections.some((x) => x.name === f.collection)) {
        console.warn(`[cms] "${c.name}.${f.name}" (relation) aponta para coleção inexistente: "${f.collection}"`);
      }
      if (f.widget === 'select' && !f.options?.length) {
        console.warn(`[cms] "${c.name}.${f.name}" (select) sem options.`);
      }
      if (f.widget === 'object' && !f.fields?.length) {
        console.warn(`[cms] "${c.name}.${f.name}" (object) sem fields.`);
      }
    }
  }
}
validateConfig();
