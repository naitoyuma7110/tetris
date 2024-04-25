<script lang="ts" setup>
import { Tetromino } from '@/common/Tetromino';
import { Field } from '@/common/Field';
import { ref, watch } from 'vue';
import type { TETROMINO_TYPE } from '@/common/Tetromino';

let tetromino = Tetromino.newRandomTetromino()
let field = ref(new Field())
field.value = field.value.createFieldWithRenderTetromino(tetromino)

const fieldWithFixed = ref(new Field())

const handleShiftOnClick = (y: number, x: number) => {
  const newTetromino = tetromino.createCopy()
  newTetromino.shift(y, x)
  if (fieldWithFixed.value.isCollision(newTetromino)) {
    console.log("衝突!!")
    if (y > 0) {
      handleFixTetrominoOnClick()
      return
    }
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
  tetromino = Tetromino.newRandomTetromino()
  fieldWithFixed.value = field.value.createCopy()
  field.value = field.value.createFieldWithRenderTetromino(tetromino)
}

const fallSpeed = ref<number>(500);

let intervalId: number = setInterval(() => {
  handleShiftOnClick(1, 0);
}, fallSpeed.value);

watch(fallSpeed, (newFallSpeed) => {
  clearInterval(intervalId)
  intervalId = setInterval(() => {
    handleShiftOnClick(1, 0);
  }, newFallSpeed);

  console.log(newFallSpeed)
})

const classBlockColor = (type: TETROMINO_TYPE): string => {
  if (type) {
    switch (type) {
      case 1:
        return "block-i";
      case 2:
        return "block-o";
      case 3:
        return "block-s";
      case 4:
        return "block-z";
      case 5:
        return "block-j";
      case 6:
        return "block-l";
      case 7:
        return "block-t";
      default:
        return "block-blank";
    }
  }
  return "block-blank";
}

</script>

<template>
  <p>プレイ画面</p>
  <p>ユーザ名: {{ $route.query.name }}</p>

  <div class="container">
    <div class="game-board">
      <div class="game-board-row" v-for="(row, y) in field.field" :key="y">
        <span class="game-board-col" v-bind:class="classBlockColor(col as (TETROMINO_TYPE))" v-for=" (col, x) in row"
          :key="() => `${x}${y}`">
          {{ col }}
        </span>
      </div>
    </div>
    <div class="w-25">
      <v-row class="align-center justify-center">
        <v-btn icon="mdi-arrow-left-bold-outline" v-on:click="handleShiftOnClick(0, -1)"></v-btn>
        <div class="d-flex flex-column">
          <v-btn class="mb-2" icon="mdi-arrow-up-bold-outline" v-on:click="handleShiftOnClick(-1, 0)"></v-btn>
          <v-btn class="mt-2" icon="mdi-arrow-down-bold-outline" v-on:click="handleShiftOnClick(1, 0)"></v-btn>
        </div>
        <v-btn icon="mdi-arrow-right-bold-outline" v-on:click="handleShiftOnClick(0, 1)"></v-btn>
      </v-row>
      <v-row class="align-center justify-center mt-5">
        <v-btn class="mx-2" icon="mdi-rotate-right" v-on:click="handleRotateOnClick"></v-btn>
        <v-btn class="mx-2" icon="mdi-check-circle-outline" v-on:click="handleFixTetrominoOnClick"></v-btn>
      </v-row>
      <v-row class="mt-10">
        <v-slider v-model="fallSpeed" :max="1000" :min="0" step="10" class="mx-5" hide-details>
        </v-slider>
        {{ `1 / ${fallSpeed} ms` }}
      </v-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
  display: flex;
  justify-content: center;

  .game-board {
    border: 5px solid #ccc;
    border-top: none;

    &-row {
      display: flex;
      width: 100%;
    }

    &-col {
      width: 30px;
      height: 30px;
      text-align: center;
      border: 0.1px solid #EEE
    }
  }
}

.block {
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
