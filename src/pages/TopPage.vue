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
  <h1>トップ画面</h1>
  <p>{{ state.name }}</p>
  <input v-model="state.name" placeholder="名前を入力してください (10文字以内)" maxlength="10"><br><br>
  <button v-on:click="startGame()">
    ゲームスタート！
  </button>
</template>

<!-- state.name 確認用のタグのスタイルを指定する -->
<style scoped>
input {
  width: 18em;
  font-size: 1.1em;
  text-align: center;
}

p {
  font-size: 1.6em;
  font-weight: bold;
  height: 5vh;
}
</style>

