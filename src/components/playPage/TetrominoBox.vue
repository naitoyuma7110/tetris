<script lang="ts" setup>
import { type Point, type TETROMINO_TYPE } from '@/common/Tetromino';
import { getBlockClass } from '@/common/utils';

const props = (defineProps(['tetromino']))

console.log(props.tetromino)

const boxField = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]]

props.tetromino.tilePoints.forEach((point: Point) => {
  boxField[point[0]][point[1]] = props.tetromino.tetrominoType
})

</script>

<template>
  <div>
    <div class="game-board-row" v-for="(row, y) in boxField" :key="y">
      <span class="game-board-col" v-bind:class="getBlockClass(col as (TETROMINO_TYPE))" v-for=" (col, x) in row"
        :key="() => `${x}${y}`">
        {{ col }}
      </span>
    </div>
  </div>
</template>
<style lang="scss"></style>