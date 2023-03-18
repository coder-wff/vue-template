import { createApp } from 'vue'
import icons from '@/global/registerIcons'
import App from './App.vue'
import router from '@/routers'
// pinia store
import pinia from '@/stores/index'

const app = createApp(App)
app.use(icons)

app.use(router)
app.use(pinia)

app.mount('#app')
