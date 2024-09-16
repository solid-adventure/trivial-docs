// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';


export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {

    app.use(PrimeVue, {
        theme: {
            preset: Aura
        }
    });

  }
}
