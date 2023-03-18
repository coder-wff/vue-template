import { createApp } from 'vue'
import icons from '@/global/registerIcons'
import App from './App.vue'
import router from '@/routers'

const app = createApp(App)
app.use(icons)

app.use(router)

app.mount('#app')
