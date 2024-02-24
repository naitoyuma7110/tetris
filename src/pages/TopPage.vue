<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const state = reactive({ name: "" });
const router = useRouter();

const startGame = () => {
  router.push({ name: "PlayPage", query: { name: state.name } });
}
</script>

<template>
  <div class="text-center">
    <h1 class="text-left">トップ画面</h1>
    <v-text-field v-model="state.name" placeholder="名前を入力してください (10文字以内)" maxlength="10"></v-text-field>
    <v-btn v-on:click="startGame()">
      Game Start
    </v-btn>
  </div>
</template>

<!-- state.name 確認用のタグのスタイルを指定する -->
<style scoped></style>

