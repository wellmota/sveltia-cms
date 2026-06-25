import { defineConfig } from '@/lib/config';

/**
 * 👋 EDITE ESTE ARQUIVO para o seu projeto. É a única coisa que você precisa
 * mexer pra definir o conteúdo do CMS — o painel e a API são gerados a partir
 * daqui. Veja os widgets disponíveis em `src/lib/config.ts`.
 *
 * Exemplo: um blog ("posts") com autores ("authors") por referência, e uma
 * página única ("home"). Campos com `sidebar: true` vão pra coluna lateral.
 */
export default defineConfig({
  siteName: 'Meu site',
  // siteUrl: 'https://exemplo.com', // habilita os links "Ver no site"

  collections: [
    {
      name: 'authors',
      label: 'Autores',
      labelSingular: 'Autor',
      titleField: 'name',
      fields: [
        { name: 'name', label: 'Nome', widget: 'string', required: true },
        { name: 'avatar', label: 'Avatar', widget: 'image' },
        { name: 'bio', label: 'Bio', widget: 'text' },
      ],
    },
    {
      name: 'posts',
      label: 'Publicações',
      labelSingular: 'Publicação',
      titleField: 'title',
      featurable: true,
      fields: [
        { name: 'title', label: 'Título', widget: 'string', required: true },
        { name: 'excerpt', label: 'Resumo', widget: 'text', hint: 'Aparece no card e na meta description.' },
        { name: 'body', label: 'Conteúdo', widget: 'markdown' },

        // Coluna lateral
        { name: 'cover', label: 'Capa', widget: 'image', sidebar: true },
        { name: 'author', label: 'Autor', widget: 'relation', collection: 'authors', sidebar: true },
        { name: 'category', label: 'Categoria', widget: 'select', default: 'Geral', options: ['Geral', 'Notícias', 'Guias'], sidebar: true },
        { name: 'date', label: 'Data', widget: 'datetime', sidebar: true },
        { name: 'tags', label: 'Tags', widget: 'list', sidebar: true },

        // Objeto aninhado
        {
          name: 'seo',
          label: 'SEO',
          widget: 'object',
          fields: [
            { name: 'title', label: 'Título SEO', widget: 'string' },
            { name: 'description', label: 'Descrição SEO', widget: 'string' },
          ],
        },
        // Lista de objetos
        {
          name: 'metrics',
          label: 'Métricas',
          widget: 'list',
          fields: [
            { name: 'value', label: 'Valor', widget: 'string' },
            { name: 'label', label: 'Descrição', widget: 'string' },
          ],
        },
      ],
    },
  ],

  singletons: [
    {
      key: 'home',
      label: 'Home',
      fields: [
        { name: 'title', label: 'Título', widget: 'string' },
        { name: 'intro', label: 'Introdução', widget: 'text' },
        { name: 'accent', label: 'Cor de destaque', widget: 'color' },
      ],
    },
  ],
});
