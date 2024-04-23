import type { Tetromino } from '@/common/Tetromino'
export type FieldData = number[][]

export class Field {
  field: FieldData

  constructor(field?: FieldData) {
    if (field) {
      this.field = field
    } else {
      const row = 20
      const column = 10

      const fieldData = new Array<Array<number>>(row)

      for (let i = 0; i < row; i++) {
        const fieldColumn = new Array(column).fill(0)
        fieldData[i] = fieldColumn
      }

      this.field = fieldData
    }
  }

  isCollision(newField: FieldData) {
    newField.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (this.field[rowIndex][colIndex] !== 0 && col !== 0) {
          return true
        }
      })
    })
    return false
  }

  fieldDeepCopy() {
    const deepCopyField = this.field.map((row) => [...row])
    return deepCopyField
  }

  getFieldWithRenderTetromino(tetromino: Tetromino) {
    const points = tetromino.tilesOnfield

    const copyField = this.fieldDeepCopy()

    points.forEach((point) => {
      copyField[point[0]][point[1]] = tetromino.tetrominoType
    })

    return copyField
  }
}
