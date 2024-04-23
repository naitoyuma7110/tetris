<script setup lang="ts">
const baseUrl = import.meta.env.BASE_URL;
console.log(baseUrl); // "/my-app/"
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Tetris</v-toolbar-title>
      <v-btn to="/" class="me-5 text-primary">
        TopPage
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer app>
      footer
    </v-footer>
  </v-app>
</template>