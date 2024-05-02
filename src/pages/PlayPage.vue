<script lang="ts" setup>
import { Field } from '@/common/Field';
import { ref, watch, onMounted } from 'vue';
import type { TETROMINO_TYPE } from '@/common/Tetromino';
import { TetrominoManager } from '@/common/TetrominoManager';
import { getBlockClass } from '@/common/utils'
import TetrominoBox from '@/components/playPage/TetrominoBox.vue';

const field = ref(new Field())
const fieldWithFixed = ref(new Field())
const tetrominoManager = ref(new TetrominoManager)

/**
 * x,yに応じてテトリミノ位置を移動させる
 * 移動後のテトリミノが堆積タイルや壁に衝突する場合移動しない
 * また下方向に移動で衝突した場合、落下の判定としてフィールド上に固定され次テトリミノを出現させる
 * @param y 縦方向の座標移動
 * @param x 横方向の座標移動
 */
const handleShiftTetromino = (y: number, x: number) => {
  const newTetromino = tetrominoManager.value.createActiveCopy()
  newTetromino.shift(y, x)
  if (fieldWithFixed.value.isCollision(newTetromino)) {
    console.log("衝突!!")
    if (y > 0) {
      handleFixTetromino()
    }
    return
  }

  tetrominoManager.value.activeTetromino = newTetromino
  field.value = fieldWithFixed.value.copyInstance()
  field.value = field.value.createFieldWithRenderTetromino(newTetromino)
}

/**
 * テトリミノを回転させる
 * ロジックは移動とほぼ一緒だが落下判定がない
 */
const handleRotateTetromino = () => {
  const newTetromino = tetrominoManager.value.createActiveCopy()
  newTetromino.rotate()
  if (fieldWithFixed.value.isCollision(newTetromino)) {
    console.log("衝突!!")
    return
  }
  tetrominoManager.value.activeTetromino = newTetromino
  field.value = fieldWithFixed.value.copyInstance()
  field.value = field.value.createFieldWithRenderTetromino(newTetromino)
}

/**
 * テトリミノをフィールドに固定し新しいテトリミノを落下口に出現させる
 * 堆積したタイルを持つフィールドに落下中のテトリミノの位置を追加する事で固定したテトリミノ群を保持している
 */
const handleFixTetromino = () => {
  const newActiveTetromino = tetrominoManager.value.createActiveTetromino()
  fieldWithFixed.value = field.value.copyInstance(true)
  field.value = fieldWithFixed.value.copyInstance()
  field.value = field.value.createFieldWithRenderTetromino(newActiveTetromino)
  if (fieldWithFixed.value.isGameOver) {
    clearInterval(intervalId)
    alert("Game Over")
  }
}

// 落下スピード制御
const fallSpeed = ref<number>(500);

let intervalId: number = setInterval(() => {
  handleShiftTetromino(1, 0);
}, fallSpeed.value);

watch(fallSpeed, (newFallSpeed) => {
  clearInterval(intervalId)
  intervalId = setInterval(() => {
    handleShiftTetromino(1, 0);
  }, newFallSpeed);

  console.log(newFallSpeed)
})


// キーボードイベント登録
const handleKeyPress = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowUp':
      handleShiftTetromino(-1, 0)
      break;
    case 'ArrowDown':
      handleShiftTetromino(1, 0)
      break;
    case 'ArrowLeft':
      handleShiftTetromino(0, -1)
      break;
    case 'ArrowRight':
      handleShiftTetromino(0, 1)
      break;
  }

  if (event.key !== 'Space' && event.code === 'Space') {
    handleRotateTetromino()
  }
  if (event.key !== 'Enter' && event.code === 'Enter') {
    handleFixTetromino()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress);
  field.value = field.value.createFieldWithRenderTetromino(tetrominoManager.value.createActiveCopy())
});
</script>

<template>
  <p>プレイ画面</p>
  <p>ユーザ名: {{ $route.query.name }}</p>

  <div class="container">
    <div class="game-board">
      <div class="game-board-row" v-for="(row, y) in field.fieldData" :key="y">
        <span class="game-board-col" v-bind:class="getBlockClass(col as (TETROMINO_TYPE))" v-for=" (col, x) in row"
          :key="() => `${x}${y}`">
          {{ col }}
        </span>
      </div>
    </div>
    <div class="w-25 ms-5 d-flex flex-column">
      <div>
        <p class="">SCORE: {{ fieldWithFixed.score }}</p>
        <p>{{ tetrominoManager.nextTetrominos[0].tetrominoType }}</p>
        <p>
          Next
        </p>
        <span v-for="(tetromino, i) in tetrominoManager.nextTetrominos" :key="i">
          <TetrominoBox :tetromino=tetromino />
        </span>
        <p>Stocked {{ tetrominoManager.stockedTetromino }}</p>
      </div>
      <div class="mt-auto py-5">
        <div class="mt-10 mb-5">
          <p class="text-end">
            {{ `1 / ${fallSpeed} ms` }}
          </p>
          <v-slider v-model="fallSpeed" :max="1000" :min="1" step="10" hide-details />
        </div>
        <v-row class="align-center justify-center">
          <v-btn icon="mdi-arrow-left-bold-outline" v-on:click="handleShiftTetromino(0, -1)"></v-btn>
          <div class="d-flex flex-column">
            <v-btn class="mb-2" icon="mdi-arrow-up-bold-outline" v-on:click="handleShiftTetromino(-1, 0)"></v-btn>
            <v-btn class="mt-2" icon="mdi-arrow-down-bold-outline" v-on:click="handleShiftTetromino(1, 0)"></v-btn>
          </div>
          <v-btn icon="mdi-arrow-right-bold-outline" v-on:click="handleShiftTetromino(0, 1)"></v-btn>
        </v-row>
        <v-row class="align-center justify-center mt-5">
          <v-btn class="mx-2" icon="mdi-rotate-right" v-on:click="handleRotateTetromino"></v-btn>
          <v-btn class="mx-2" icon="mdi-check-circle-outline" v-on:click="handleFixTetromino"></v-btn>
        </v-row>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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
