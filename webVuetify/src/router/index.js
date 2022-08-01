import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '../views/ProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/products'
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
      children: [
        {
          path: 'new',
          name: 'newProduct',
          component: () => import('../views/NewProductView.vue')
        }
      ]
    }
  ]
})

export default router
