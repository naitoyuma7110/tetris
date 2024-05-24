import { createRouter, createWebHistory } from 'vue-router'

import TopPage from '@/pages/TopPage.vue'
import PlayPage from '@/pages/PlayPage.vue'
import PiniaTest from '@/pages/PiniaTest.vue'
import TestPage from '@/pages/TestPage.vue'
import TestPage2 from '@/pages/TestPage2.vue'
import QiitaDemo from '@/pages/QiitaDemo.vue'

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
      path: '/test2',
      name: 'TestPage2',
      component: TestPage2
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
    },
    {
      path: '/qiita',
      name: 'QiitaPage',
      component: QiitaDemo
    }
  ]
})

export default router
