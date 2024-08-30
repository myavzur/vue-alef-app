import ProfileView from '@/views/ProfileView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ProfileView
    },
    {
      path: '/edit',
      component: () => import('@/views/ProfileEditView.vue')
    }
  ]
})

export default router
