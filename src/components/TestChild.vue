<script setup lang="ts">
const { testClass, className, hasClassOnField } = defineProps(['testClass', 'className', 'hasClassOnField'])

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

<style></style>