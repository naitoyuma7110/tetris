<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const state = reactive({ name: "Guests" });
const router = useRouter();

const startGame = () => {
  router.push({ name: "PlayPage", query: { name: state.name } });
};
</script>

<template>
  <v-row class="justify-center w-50">
    <v-text-field v-model="state.name" variant="underlined" label="Your name" maxlength="10" class="me-10" />
    <v-btn v-on:click="startGame()" variant="outlined"> Game Start </v-btn>
  </v-row>
</template>

<style scoped></style>
