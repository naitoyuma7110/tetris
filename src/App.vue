<script setup lang="ts">
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Tetris</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
.v-application__wrap {
  min-height: 80vh !important;
}

/* [data-vuetify] .v-application--wrap {
  min-height: 0vh !important;
} */
</style>