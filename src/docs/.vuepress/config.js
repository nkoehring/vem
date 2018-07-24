module.exports = {
  title: 'VEM: Vue Easy Maps',
  description: 'OpenLayers integration for Vuejs',
  base: '/docs',
  dest: './dist',
  serviceWorker: false,
  theme: 'docs-sandbox',
  evergreen: true,

  markdown: {
    lineNumbers: true,
    toc: { includeLevel: [1, 2, 3] },
    config: md => {
      md.use(require('markdown-it-v'))
      md.use(require('markdown-it-v-codemirror-highlighter'))
    }
  }
}
