<script lang="ts" setup>
import { Field } from '@/common/Field';
import { ref, watch, onMounted, reactive } from 'vue';
import type { TETROMINO_TYPE } from '@/common/Tetromino';
import { TetrominoManager } from '@/common/TetrominoManager';
import { getBlockClass } from '@/common/utils'
import TetrominoBox from '@/components/playPage/TetrominoBox.vue';

const field = ref(new Field())
const fieldWithFixed = ref(new Field())
const tetrominoManager = reactive(new TetrominoManager)

/**
 * x,yに応じてテトリミノ位置を移動させる
 * 移動後のテトリミノが堆積タイルや壁に衝突する場合移動しない
 * また下方向への移動で衝突した場合、落下としてフィールド上に固定され次テトリミノを出現させる
 * @param y 縦方向の座標移動距離
 * @param x 横方向の座標移動距離
 */
const handleShiftTetromino = (y: number, x: number) => {
  const newTetromino = tetrominoManager.getActiveCopy()
  newTetromino.shift(y, x)
  if (fieldWithFixed.value.isCollision(newTetromino)) {
    console.log("衝突!!")
    if (y > 0) {
      handleFixTetromino()
    }
    return
  }

  tetrominoManager.activeTetromino = newTetromino
  field.value = fieldWithFixed.value.copyInstance()
  field.value = field.value.createFieldWithRenderTetromino(newTetromino)
}

/**
 * テトリミノを回転させる
 * ロジックは移動とほぼ一緒だが落下判定がない
 */
const handleRotateTetromino = () => {
  const newTetromino = tetrominoManager.getActiveCopy()
  newTetromino.rotate()
  if (fieldWithFixed.value.isCollision(newTetromino)) {
    console.log("衝突!!")
    return
  }
  tetrominoManager.activeTetromino = newTetromino
  field.value = fieldWithFixed.value.copyInstance()
  field.value = field.value.createFieldWithRenderTetromino(newTetromino)
}

/**
 * テトリミノをフィールドに固定し新しいテトリミノを落下口に出現させる
 * 堆積したタイルを持つフィールドに落下中のテトリミノの位置を追加する事で固定したテトリミノ群を保持している
 */
const handleFixTetromino = () => {
  tetrominoManager.createActiveTetromino()
  const newActiveTetromino = tetrominoManager.getActiveCopy()
  fieldWithFixed.value = field.value.copyInstance(true)
  field.value = fieldWithFixed.value.copyInstance()
  field.value = field.value.createFieldWithRenderTetromino(newActiveTetromino)
  if (fieldWithFixed.value.isGameOver) {
    clearInterval(intervalId)
    alert("Game Over")
  }
}

const handleStockTetromino = () => {
  tetrominoManager.stockTetromino()
  const newActiveTetromino = tetrominoManager.getActiveCopy()
  field.value = fieldWithFixed.value.copyInstance()
  field.value = field.value.createFieldWithRenderTetromino(newActiveTetromino)

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
    case 'Space':
      handleRotateTetromino()
      break
    case 'Enter':
      handleFixTetromino()
      break
    case 'shiftKey':
      handleStockTetromino()
      break
  }

  if (event.key !== 'Space' && event.code === 'Space') {
    handleRotateTetromino()
  }
  if (event.key !== 'Enter' && event.code === 'Enter') {
    handleFixTetromino()
  }
  if (event.shiftKey || event.code === 'shiftKey') {
    handleStockTetromino()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress);
  field.value = field.value.createFieldWithRenderTetromino(tetrominoManager.getActiveCopy())
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
        </span>
      </div>
    </div>
    <div class="w-25 ms-5 d-flex flex-column">
      <div>
        <p class="text-subtitle-1 mb-4">SCORE: {{ fieldWithFixed.score }}</p>
        <div class="d-flex mb-4">
          <div class="me-4" v-for="(tetromino, i) in tetrominoManager.nextTetrominos" :key="i">
            <p class="text-subtitle-1">
              {{ i === 0 ? "Next" : "2nd" }}
            </p>
            <TetrominoBox :tetromino="tetromino" />
          </div>
        </div>
        <p class="text-subtitle-1">ストック</p>
        <span v-if="!tetrominoManager.stockedTetromino">なし</span>
        <TetrominoBox v-else :tetromino="tetrominoManager.stockedTetromino" />
      </div>
      <div class=" mt-auto py-5">
        <div class="mt-10 mb-5">
          <p class="d-flex justify-space-between px-2">
            <span>
              ゲームスピード
            </span>
            <span>
              {{ `1 / ${fallSpeed} ms` }}
            </span>
          </p>
          <v-slider v-model="fallSpeed" :max="1000" :min="1" step="10" hide-details />
        </div>
        <div class="d-flex">
          <div class="d-flex align-center justify-center">
            <v-btn icon="mdi-arrow-left-bold-outline" v-on:click="handleShiftTetromino(0, -1)"></v-btn>
            <div class="d-flex flex-column">
              <v-btn class="mb-2" icon="mdi-arrow-up-bold-outline" v-on:click="handleShiftTetromino(-1, 0)"></v-btn>
              <v-btn class="mt-2" icon="mdi-arrow-down-bold-outline" v-on:click="handleShiftTetromino(1, 0)"></v-btn>
            </div>
            <v-btn icon="mdi-arrow-right-bold-outline" v-on:click="handleShiftTetromino(0, 1)"></v-btn>
          </div>
          <div class="d-flex flex-column align-center mt-5 ms-5">
            <div>
              <v-btn class="mb-2" icon="mdi-rotate-right" v-on:click="handleRotateTetromino"></v-btn>
            </div>
            <div>
              <v-btn class="mx-2" icon="mdi-check-circle-outline" v-on:click="handleFixTetromino"></v-btn>
              <v-btn class="mx-2" icon="mdi-food-takeout-box-outline" v-on:click="handleStockTetromino"></v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex w-25 me-5">
        <div class="text-center">
          <div class="d-flex mx-4">
            <v-icon icon="mdi-arrow-left-bold-box-outline" size="x-large"></v-icon>
            <v-icon icon="mdi-arrow-down-bold-box-outline" size="x-large"></v-icon>
            <v-icon icon="mdi-arrow-right-bold-box-outline" size="x-large"></v-icon>
          </div>
          <span>移動</span>
        </div>
        <div class="text-center">
          <div class="mx-4">
            <p class="key-icon">SHIFT</p>
          </div>
          <span>ストック</span>
        </div>
        <div class="text-center">
          <div class="mx-4">
            <p class="key-icon">SPACE</p>
          </div>
          <span>回転</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.game-board {
  border: 5px solid #ccc;
  border-top: none;

  &-row {
    display: flex;
    width: 100%;
  }

  &-col {
    width: 35px;
    height: 35px;
    text-align: center;
    border: 0.1px solid #EEE;
  }
}

.next-box {
  display: flex;
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

.key-icon {
  font-weight: 600;
  padding: 2px 4px;
  border-radius: 4px;
  border: 2px solid #333;
}
</style>
