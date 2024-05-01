import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Trivial",
  description: "Automate your Bookkeeping",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/trivial-logo-on-light.svg',
      dark: '/trivial-logo-on-dark.svg'
    },
    siteTitle: false,
    nav: [
      { text: 'Use Cases', link: '/use-cases' },
      { text: 'Features', link: '/features' },
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
          { text: 'Introduction', link: '/introduction'  },
          { text: 'How it Works', link: '/how-it-works'  },
          { text: 'Getting Started', link: '/getting-started'  },
          // { text: 'Pricing', link: '/pricing'  },
          // { text: 'FAQ', link: '/faq'  },
          // { text: 'Glossary', link: '/glossary'  },
        ]
      },
      // {
      //   text: 'Accountants',
      //   items: [
      //   ]
      // },
      {
        text: 'Developer Guides', link: '/developers',
        items: [
          { text: 'Introduction', link: '/developers' },

          { text: 'Actions', link: '/developer-guides/actions' },
          // { text: 'API Reference', link: '/api-reference'  },
          { text: 'App Tags', link: '/developer-guides/app-tags' },
          { text: 'Audits', link: '/developer-guides/audits'},
          { text: 'Client API Keys', link: '/developer-guides/client-api-keys' },
          { text: 'Cloud Staging API', link:'/developer-guides/cloud-staging-api'},
          { text: 'Conditional Actions', link: '/developer-guides/conditional-actions' },
          { text: 'Organizations', link: '/developer-guides/organizations' },
          { text: 'Panels', link: '/developer-guides/panels' },
          { text: 'Passwords', link: 'developer-guides/passwords'},
          { text: 'Permissions', link: '/developer-guides/permissions' },
          { text: 'Registers', link: '/developer-guides/registers' },
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
      message: 'TrivialJS source code released under the MIT License. All rights to Trivial™ and TrivialJS™ trademarks reserved.',
      copyright: 'Copyright © 2021-present Trivial, Inc.'
    }
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }, 
  ignoreDeadLinks: true
})
