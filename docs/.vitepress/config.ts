import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Trivial",
  titleTemplate: "Data-Driven Ecommerce Ops",
  description: "3PL billing automation with data-driven efficiency",
  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-N3CYJ6RFDG' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-N3CYJ6RFDG');`
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/trivial-logo-on-light.svg',
      dark: '/trivial-logo-on-dark.svg'
    },
    siteTitle: false,
    nav: [
      { text: 'Use Cases', link: '/use-cases' },
      // { text: 'Features', link: '/features' },
      { text: 'Login', link: 'https://www.trivialapps.io/login' },
      // { text: 'Pricing', link: '/pricing' },
      // {
      //   text: 'Explore by Job Title',
      //   items: [
      //     { text: 'Bookkeepers & CPAs', link: '/bookkeepers' },
      //     { text: 'Finance Teams', link: '/finance-teams' },
      //     { text: 'Developers', link: '/developers' },
      //     { text: 'Business Owners', link: '/business-owners' }
      //   ]
      // }
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'How it Works', link: '/how-it-works'  },
          { text: 'Getting Started', link: '/getting-started'  },
          // { text: 'Pricing', link: '/pricing'  },
          // { text: 'FAQ', link: '/faq'  },
          // { text: 'Glossary', link: '/glossary'  },
        ]
      },
      {
        text: 'Simulators',
        items: [
          { text: 'D2C Lemonade Stand', link: '/simulators/inventory-reorder/' },
        ]
      },
      {
        text: 'Developer Guides', link: '/developers',
        items: [
          { text: 'Introduction', link: '/developers' },

          { text: 'Actions', link: '/developer-guides/actions' },
          // { text: 'API Reference', link: '/api-reference'  },
          { text: 'App Tags', link: '/developer-guides/app-tags' },
          { text: 'Audits', link: '/developer-guides/audits'},
          { text: 'Charts', link: '/developer-guides/charts' },
          { text: 'Client API Keys', link: '/developer-guides/client-api-keys' },
          { text: 'Cloud Staging API', link:'/developer-guides/cloud-staging-api'},
          { text: 'Conditional Actions', link: '/developer-guides/conditional-actions' },
          { text: 'Dashboards', link: '/developer-guides/Dashboards' },
          { text: 'Making Requests', link: 'developer-guides/requests', },
          { text: 'Organizations', link: '/developer-guides/organizations' },
          { text: 'Panels', link: '/developer-guides/panels' },
          { text: 'Passwords', link: 'developer-guides/passwords'},
          { text: 'Permissions', link: '/developer-guides/permissions' },
          { text: 'Registers', link: '/developer-guides/registers' },
          { text: 'Reports', link: '/developer-guides/reports' },
          { text: 'Self Hosting', link: '/developer-guides/self-hosting' },
          { text: 'Version Control Strategy',
            collapsed: true,
            link: '/developer-guides/version-control-strategy',
            items: [
              {
                text: 'Mirroring Repos',
                link: '/developer-guides/mirroring'
              }

            ]
          }
        ]
      }
    ],
    footer: {
      message: '<em style="font-size: 0.9em;">[0] Assuming manual invoices are sent on the 4th of each month, delivering on the 1st is 3 out of 4 days faster-- a 75% speed improvement.</em>',
      copyright: 'Copyright © 2021-present Trivial, Inc. <br /> All rights to Trivial™ and TrivialJS™ trademarks reserved.'
    }
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }, 
  ignoreDeadLinks: true,
  sitemap: {
    hostname: 'https://www.withtrivial.com'
  }
})