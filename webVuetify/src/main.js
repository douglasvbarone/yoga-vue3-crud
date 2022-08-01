import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { apolloProvider } from './apolloProvider'

loadFonts()

createApp(App).use(router).use(vuetify).use(apolloProvider).mount('#app')
