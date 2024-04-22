<script lang="ts" setup>
import { Tetromino } from '@/common/Tetromino';
import { Field } from '@/common/Field';
import { reactive } from 'vue';

const tetromino = Tetromino.newRandomTetromino()

const field = reactive(new Field())

const handleDownOnClick = (y: number, x: number) => {
  field.shiftTetromino(tetromino, y, x)
  console.log(field.fieldData)
}



const classBlockColor = (x: number, y: number): string => {
  const type = field.fieldData[y][x];
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
    <table class="field" style="border-collapse: collapse">
      <tr v-for="(row, y) in field.fieldData" :key="y">
        <td v-bind:class="classBlockColor(x, y)" v-for=" (col, x) in row" :key="() => `${x}${y}`">
          {{ col }}
        </td>
      </tr>
    </table>
    <div>
      <v-row class="d-flex align-center ms-5">
        <v-btn icon="mdi-arrow-left-bold-outline" v-on:click="handleDownOnClick(0, -1)"></v-btn>
        <div class=" d-flex flex-column">
          <v-btn class="mb-2" icon="mdi-arrow-up-bold-outline" v-on:click="handleDownOnClick(-1, 0)"></v-btn>
          <v-btn class="mt-2" icon="mdi-arrow-down-bold-outline" v-on:click="handleDownOnClick(1, 0)"></v-btn>
        </div>
        <v-btn icon="mdi-arrow-right-bold-outline" v-on:click="handleDownOnClick(0, 1)"> </v-btn>
        <div div class="ms-5">
          <v-btn icon="mdi-rotate-right"></v-btn>
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
