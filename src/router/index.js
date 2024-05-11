import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/cute-bunny-privacy',
      name: 'Cute Bunny Privacy',
      component: () => import('../views/CuteBunnyPrivacy.vue')
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/tag/:id',
      name: 'tag',
      component: () => import('../views/TagView.vue')
    }
  ]
})

export default router
