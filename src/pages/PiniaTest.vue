<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()


// 管理対象に対してミュータブルで直接的な操作
const handlCountIsTen = () => {
  counter.count = 10
  console.log(counter.count)
}

// 管理対象に対してディスパッチで操作
const handlCountIsFive = () => {
  counter.$patch({ count: 5 })
  console.log(counter.count)
}

// 管理対象に対してアクションで操作
const handlCountIsSeven = () => {
  counter.setSeven()
  console.log(counter.count)
}

</script>

<template>
  <!-- Access the state directly from the store -->
  <v-btn v-on:click="handlCountIsTen()">Count = 10</v-btn>
  <v-btn v-on:click="handlCountIsFive()">Count = 5</v-btn>
  <v-btn v-on:click="handlCountIsSeven()">Count = 7</v-btn>

  <div>Current Count: {{ counter.count }}</div>
  <div>Current Message: {{ counter.message }}</div>
</template>