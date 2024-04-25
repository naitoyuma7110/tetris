import type { Tetromino } from '@/common/Tetromino'
export type FieldData = number[][]

const row = 20
const column = 10

export class Field {
  field: FieldData

  constructor(field?: FieldData) {
    if (field) {
      this.field = field
    } else {
      const fieldData = new Array<Array<number>>(row)

      for (let i = 0; i < row; i++) {
        const fieldColumn = new Array(column).fill(0)
        fieldData[i] = fieldColumn
      }

      this.field = fieldData
    }
  }
  private getFieldDeepCopy(): FieldData {
    const deepCopyField = this.field.map((row) => [...row])
    return deepCopyField
  }

  private columnVanish(field: FieldData) {
    // 列に0以外のcolを含むか判定し削除対象の列インデックスを保持
    const columnsToRemove: number[] = []

    for (let row = 0; row < field.length; row++) {
      let allTiles = true
      for (let col = 0; col < field.length; col++) {
        if (field[row][col] === 0) {
          allTiles = false
          break
        }
      }
      if (allTiles) {
        columnsToRemove.push(row)
      }
    }

    // 削除対象の列を削除し配列を下方にシフトする
    const fieldRemovedColum: number[][] = []

    for (let row = 0; row < field.length; row++) {
      let newRow: number[]
      if (!columnsToRemove.includes(row)) {
        newRow = field[row]
        fieldRemovedColum.push(newRow)
      }
    }

    for (let i = 1; i <= columnsToRemove.length; i++) {
      const blankRow: number[] = Array(column).fill(0)
      fieldRemovedColum.unshift(blankRow)
    }

    return fieldRemovedColum
  }

  createCopy(): Field {
    const field = this.getFieldDeepCopy()
    return new Field(field)
  }

  // 新しいTetrominoが現在のfieldに描画可能か(衝突しないか)判定する
  isCollision(newTetromino: Tetromino): boolean {
    const points = newTetromino.tilesOnfield
    const copyField = this.getFieldDeepCopy()
    let isCollision = false

    points.forEach((point) => {
      // copyField[row]の存在チェック後、copyField[row][col]のチェックを実行
      if (!copyField[point[0]] || copyField[point[0]][point[1]] !== 0) {
        isCollision = true
      }
    })

    return isCollision
  }

  createFieldWithRenderTetromino(tetromino: Tetromino): Field {
    const points = tetromino.tilesOnfield
    const copyField = this.getFieldDeepCopy()

    points.forEach((point) => {
      copyField[point[0]][point[1]] = tetromino.tetrominoType
    })

    const newField = this.columnVanish(copyField)

    return new Field(newField)
  }
}
