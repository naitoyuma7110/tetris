<script lang="ts" setup>
import { type Point, type TETROMINO_TYPE } from '@/common/Tetromino';
import { getBlockClass } from '@/common/utils';
import { computed, toRefs } from 'vue';


const props = defineProps(['tetromino'])
const { tetromino } = toRefs(props);


const tetrominoField = computed(() => {

  const field = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],]

  if (tetromino?.value) {
    tetromino.value.tilesOnfield.forEach((point: Point) => {
      field[point[0]][point[1]] = tetromino.value.tetrominoType
    })
  }

  return field
}
)

</script>

<template>
  <div>
    <div class="game-board-row" v-for="(row, y) in tetrominoField" :key="y">
      <span class="game-board-col" v-bind:class="getBlockClass(col as (TETROMINO_TYPE))" v-for=" (col, x) in row"
        :key="() => `${x}${y}`">
      </span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.block-blank {
  border: none;
}
</style>
