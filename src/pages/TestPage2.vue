<script lang="ts" setup>
import TestChild from "@/components/TestChild.vue";
import { testA, testB, testC, testD, testE } from "@/common/test"
import { reactive, ref } from 'vue';

const defaultA = new testA

const reactiveA = reactive(new testA)

const refA = ref(new testA)

const updateText = () => {
  defaultA.field.text = "アップデート"
  reactiveA.field.text = "アップデート"
  refA.value.field.text = "アップデート"
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
  </div>
  <TestChild class="testChild" :testClass="defaultA" :className="'defaultA'"></TestChild>
  <TestChild class="testChild" :testClass="reactiveA" :className="'reactiveA'"></TestChild>
  <TestChild class="testChild" :testClass="refA" :className="'refA'"></TestChild>
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