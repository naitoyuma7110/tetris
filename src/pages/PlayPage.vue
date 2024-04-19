<script lang="ts" setup>
import { Tetromino } from '@/common/Tetromino';
import { Field } from '@/common/Field';

const tetromino = Tetromino.newRandomTetromino()

const field = new Field()
const fieldData = field.fieldData

fieldData[0][0] = 1;
fieldData[1][0] = 1;
fieldData[1][1] = 1;
fieldData[2][1] = 1;

fieldData[4][1] = 2;
fieldData[5][3] = 2;
fieldData[5][2] = 0;
fieldData[5][3] = 2;

fieldData[8][9] = 3;
fieldData[9][8] = 3;
fieldData[8][6] = 3;
fieldData[8][7] = 3;

console.log(fieldData)

const classBlockColor = (x: number, y: number): string => {
  const type = fieldData[y][x];
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
      <tr v-for="(row, y) in fieldData" :key="y">
        <td v-bind:class="classBlockColor(x, y)" v-for=" (col, x) in row" :key="() => `${x}${y}`">
          {{ col }}
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: stretch;
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
