<script setup lang="ts">
import { FieldQiita } from "@/common/fieldQiita";
import { reactive } from "vue";
import { TetrominoQiita } from "@/common/tetrominoField";

const field = reactive(new FieldQiita());
const tetromino = new TetrominoQiita();

// インスタンス化したテトリミノを描画する
field.renderTetromino(tetromino);
</script>

<template>
  <div class="field">
    <span class="field-row" v-for="(row, i) in field.renderField" :key="i">
      <span :class="`field-col block-${col}`" v-for="(col, j) in row" :key="j">
        {{ col }}
      </span>
    </span>
  </div>
</template>

<style lang="scss">
.field {
  display: inline-block;
  border: 5px solid #ccc;
  border-top: none;

  &-row {
    display: flex;
  }

  &-col {
    width: 2rem;
    height: 2rem;
    text-align: center;
    border: 0.1px solid #eee;
  }

  .block {
    &-0 {
      background: #ccc;
    }

    &-1 {
      background: #3498db;
    }
  }
}
</style>
