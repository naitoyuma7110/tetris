<script lang="ts" setup>
import { ref } from 'vue';

let reactiveTest = ref({
  text: "Refテキスト"
})

const testObject = {
  damy: 10,
  text: reactiveTest.value.text
}

const notReactive = "普通のテキスト"

const notRefToRef = () => {
  reactiveTest.value.text = notReactive
}

let testA = {
  value: "渡される値"
}

let testB = testA
testB.value = "更新したB値"
testA.value = "更新したA値"

</script>

<template>
  <div>
    <v-text-field v-model="reactiveTest.text"></v-text-field>
    {{ reactiveTest.text }}
    <v-text-field v-model="testObject.text"></v-text-field>
    {{ testObject.text }}
    <v-text-field v-model="testObject.damy"></v-text-field>
    {{ testObject.damy }}
    <v-text-field v-model="notReactive"></v-text-field>
    {{ notReactive }}



    <v-btn v-on:click="notRefToRef">Refではない値をRefのオブジェクトへ</v-btn>
  </div>
  <div>
    {{ testA.value }}
  </div>
  <div>
    {{ testB.value }}
  </div>
</template>