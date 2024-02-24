import { createRouter, createWebHistory } from 'vue-router'

// トップページとゲームページを読み込む
import TopPage from '../pages/TopPage.vue'
import PlayPage from '../pages/PlayerPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TopPage',
      component: TopPage
    },
    {
      path: '/play',
      name: 'PlayPage',
      component: PlayPage
    }
  ]
})

export default router
