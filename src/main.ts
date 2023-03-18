import { createApp } from 'vue'
import icons from '@/global/registerIcons'
import App from './App.vue'

const app = createApp(App)
app.use(icons)

app.mount('#app')
