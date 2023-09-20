import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Trivial JS",
  description: "Official documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/introduction' }
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
        ]
      },
      {
        text: 'Concepts',
        items: [
          { text: 'Actions', link: '/concepts/actions' },
          { text: 'Panels', link: '/concepts/panels' }
        ]
      },
      {
        text: 'Guides',
        items: [
          { text: 'Use Cases', link: '/guides/introduction' },
          { text: 'App Tags', link: '/guides/app-tags' },
          { text: 'Client API Keys', link: '/guides/client-api-keys' },
          { text: 'WMS Billing', link: '/guides/wms-billing' }
        ]
      }
    ],
    footer: {
      message: 'TrivialJS source code released under the MIT License. All rights to Trivial™ and TrivialJS™ trademarks reserved.',
      copyright: 'Copyright © 2021-present Trivial, Inc.'
    }
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
