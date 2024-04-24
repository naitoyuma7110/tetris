<script lang="ts" setup>
import { Tetromino } from '@/common/Tetromino';
import { Field } from '@/common/Field';
import { ref } from 'vue';
import type { TETROMINO_TYPE } from '@/common/Tetromino';

let tetromino = Tetromino.newRandomTetromino()
let field = ref(new Field())
const fieldWithFixed = ref(new Field())


const handleShiftOnClick = (y: number, x: number) => {
  const newTetromino = tetromino.createCopy()
  newTetromino.shift(y, x)
  if (fieldWithFixed.value.isCollision(newTetromino)) {
    console.log("衝突!!")
    return
  }
  tetromino = newTetromino
  field.value = fieldWithFixed.value.createCopy()
  field.value = field.value.createFieldWithRenderTetromino(tetromino)
}

const handleRotateOnClick = () => {
  const newTetromino = tetromino.createCopy()
  newTetromino.rotate()
  if (fieldWithFixed.value.isCollision(newTetromino)) {
    console.log("衝突!!")
    return
  }
  tetromino = newTetromino
  field.value = fieldWithFixed.value.createCopy()
  field.value = field.value.createFieldWithRenderTetromino(tetromino)
}

const handleFixTetrominoOnClick = () => {
  fieldWithFixed.value = field.value.createCopy()
  tetromino = Tetromino.newRandomTetromino()
  field.value = field.value.createFieldWithRenderTetromino(tetromino)
}

const classBlockColor = (type: TETROMINO_TYPE): string => {
  if (type) {
    switch (type) {
      case 1:
        return "block-i";
      case 2:
        return "block-o";
      case 3:
        return "block-s";
      default:
        return "";
    }
  }
  return ""
}

</script>

<template>
  <h1>プレイ画面</h1>

  <h2>ユーザ名: {{ $route.query.name }}</h2>

  <div class="container">
    <table class="field me-5" style="border-collapse: collapse">
      <tr v-for="(row, y) in field.field" :key="y">
        <td v-bind:class="classBlockColor(col as TETROMINO_TYPE)" v-for=" (col, x) in row" :key="() => `${x}${y}`">
          {{ col }}
        </td>
      </tr>
    </table>
    <table class="field" style="border-collapse: collapse">
      <tr v-for="(row, y) in fieldWithFixed.field" :key="y">
        <td v-bind:class="classBlockColor(col as TETROMINO_TYPE)" v-for=" (col, x) in row" :key="() => `${x}${y}`">
          {{ col }}
        </td>
      </tr>
    </table>
    <div>
      <v-row class="d-flex align-center ms-5">
        <v-btn icon="mdi-arrow-left-bold-outline" v-on:click="handleShiftOnClick(0, -1)"></v-btn>
        <div class=" d-flex flex-column">
          <v-btn class="mb-2" icon="mdi-arrow-up-bold-outline" v-on:click="handleShiftOnClick(-1, 0)"></v-btn>
          <v-btn class="mt-2" icon="mdi-arrow-down-bold-outline" v-on:click="handleShiftOnClick(1, 0)"></v-btn>
        </div>
        <v-btn icon="mdi-arrow-right-bold-outline" v-on:click="handleShiftOnClick(0, 1)"> </v-btn>
        <div div class="ms-5">
          <v-btn class="mx-2" icon="mdi-rotate-right" v-on:click="handleRotateOnClick"></v-btn>
          <v-btn icon="mdi-check-circle-outline" v-on:click="handleFixTetrominoOnClick"></v-btn>
        </div>
      </v-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
}

.field {
  width: 400px;
  border: ridge 0.4em #2c3e50;
  border-top: none;
}

.block {
  color: red;
  border: 1px solid #95a5a6;

  &-i {
    background: #3498db;
  }

  &-o {
    background: #f1c40f;
  }

  &-t {
    background: #9b59b6;
  }

  &-j {
    background: #1e3799;
  }

  &-l {
    background: #e67e22;
  }

  &-s {
    background: #2ecc71;
  }

  &-z {
    background: #e74c3c;
  }
}
</style>
