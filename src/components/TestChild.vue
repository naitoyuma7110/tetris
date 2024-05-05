<script setup lang="ts">
import { toRefs } from "vue";

/*
  分割代入はリアクティブ性を失うため注意
  そんため下記はNGパターン
  const { testClass, className, hasClassOnField } = defineProps(['testClass', 'className', 'hasClassOnField'])
  */

// toRefsを使用してpropsの
const props = defineProps(["testClass", "className", "hasClassOnField"]);
const { testClass, className, hasClassOnField } = toRefs(props);
</script>

<template>
  <div>
    <p>{{ className }}</p>
    <p>{{ testClass.field.text }}</p>
  </div>
  <div>
    <div v-for="(testA, i) in hasClassOnField.classes" :key="i">
      <p>{{ testA.field.text }}</p>
    </div>
  </div>
</template>
