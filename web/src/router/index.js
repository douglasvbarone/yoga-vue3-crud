import { createRouter, createWebHistory } from 'vue-router'
import ProducstView from '../views/ProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      name: 'products',
      component: ProducstView
    }
  ]
})

export default router
