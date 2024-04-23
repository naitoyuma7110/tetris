import { createRouter, createWebHistory } from 'vue-router'

// トップページとゲームページを読み込む
import TopPage from '@/pages/TopPage.vue'
import PlayPage from '@/pages/PlayPage.vue'
import PiniaTest from '@/pages/PiniaTest.vue'
import TestPage from '@/pages/TestPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TopPage',
      component: TopPage
    },
    {
      path: '/test',
      name: 'TestPage',
      component: TestPage
    },
    {
      path: '/play',
      name: 'PlayPage',
      component: PlayPage
    },
    {
      path: '/pinia',
      name: 'PiniaTest',
      component: PiniaTest
    }
  ]
})

export default router
