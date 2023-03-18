import { createRouter, createWebHistory } from 'vue-router'
import { staticRouter, errorRouter } from '@/routers/modules/staticRouter'

const router = createRouter({
	history: createWebHistory(),
	routes: [...staticRouter, ...errorRouter],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
