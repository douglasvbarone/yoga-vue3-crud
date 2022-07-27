import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { apolloProvider } from './apolloProvider'

const app = createApp(App)

app.use(router).use(apolloProvider)

app.mount('#app')
