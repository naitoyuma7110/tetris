import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// counter-storeの定義
export const useCounterStore = defineStore('counter', () => {
  // 管理対象の値
  const count = ref(0)

  const message = ref('HELLO')

  // computedも利用可能
  const doubleCount = computed(() => count.value * 2)

  // Actions(状態を変更する関数)
  function increment() {
    count.value++
  }

  function setSeven() {
    count.value = 7
  }

  return { count, message, doubleCount, increment, setSeven }
})
