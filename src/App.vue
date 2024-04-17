<script setup lang="ts">
const baseUrl = import.meta.env.BASE_URL;
console.log(baseUrl); // "/my-app/"
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Tetris</v-toolbar-title>
      <router-link to="/">TopPage</router-link>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- アプリケーションのコンポーネントに基づいてコンテンツのサイズを決定 -->
    <v-main>
      <!-- vue-routerを使用する場合 -->
      <router-view />
    </v-main>
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>