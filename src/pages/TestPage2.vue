<script lang="ts" setup>
import TestChild from "@/components/TestChild.vue";
import { testA, testB, testC, testD, testE, HasClassOnField } from "@/common/test"
import { reactive, ref } from 'vue';

const defaultA = new testA()

const reactiveA = reactive(new testA())

const refA = ref(new testA())

// const hasClassOnField = reactive(new HasClassOnField())
// hasClassOnField.classes.push(new testA("最初のクラスA"))
// hasClassOnField.classes.push(new testA("2番目のクラスA"))
// hasClassOnField.classes.push(new testA("3番目のクラスA"))

const hasClassOnField2 = ref(new HasClassOnField())
hasClassOnField2.value.classes.push(new testA("最初のクラスA"))
hasClassOnField2.value.classes.push(new testA("2番目のクラスA"))
hasClassOnField2.value.classes.push(new testA("3番目のクラスA"))


const updateText = () => {
  defaultA.field.text = "アップデート"
  reactiveA.field.text = "アップデート"
  refA.value.field.text = "アップデート"
  hasClassOnField2.value.classes[0] = new testA("new testA")
  hasClassOnField2.value.classes[1].field.text = "アップデート"
  hasClassOnField2.value.classes[2].field.text = "アップデート"
}



</script>

<template>
  <div class="test">
    <v-btn v-on:click="updateText">TEXTアップデート</v-btn>
    <p>素のクラス定義:値の変化に伴ってDOMの再描画は発生しない</p>
    <div>
      <input text v-model="defaultA.field.text" />
      <p>{{ defaultA.field.text }}</p>
    </div>
    <p>Reactiveを使用したクラス定義:値の変化に伴ってDOMの再描画される</p>
    <div>
      <input v-model="reactiveA.field.text">
      <p>{{ reactiveA.field.text }}</p>
    </div>
    <p>Refを使用したクラス定義:値の変化に伴ってDOMの再描画される</p>
    <div>
      <input v-model="refA.field.text">
      <p>{{ refA.field.text }}</p>
    </div>


    <div v-for="(testA, i) in hasClassOnField2.classes" :key="i">
      <input v-model="testA.field.text">
      <p>{{ testA.field.text }}</p>
    </div>
    <TestChild :testClass="defaultA" :className="'defaultA'" :hasClassOnField="hasClassOnField2">
    </TestChild>
    <!-- <TestChild class="testChild" :testClass="reactiveA" :className="'reactiveA'"></TestChild> -->
    <!-- <TestChild class="testChild" :testClass="refA" :className="'refA'"></TestChild> -->
  </div>
</template>

<style sass scoped>
.test>div {
  display: flex;
  margin-bottom: 40px;
  align-items: center;

  input {
    border: 1px solid #CCC;
    margin-right: 10px;
  }
}

.testChild {
  margin-bottom: 40px;
}
</style>