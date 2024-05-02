<script setup lang="ts">
const { testClass, className } = defineProps(['testClass', 'className'])

</script>

<template>
  <div>
    <p>{{ className }}</p>
    <p>{{ testClass.field.text }}</p>
  </div>
</template>

<style></style>