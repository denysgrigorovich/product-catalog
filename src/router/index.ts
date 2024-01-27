import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Products',
    component: () => import('@/views/Products.vue')
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: () => import('@/views/ProductDetails.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
