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
  private getFieldDeepCopy(): FieldData {
    const deepCopyField = this.field.map((row) => [...row])
    return deepCopyField
  }

  createCopy(): Field {
    const field = this.getFieldDeepCopy()
    return new Field(field)
  }

  // 新しいTetrominoが現在のfieldに描画可能か(衝突しないか)判定する
  isCollision(newTetromino: Tetromino) {
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

  createFieldWithRenderTetromino(tetromino: Tetromino) {
    const points = tetromino.tilesOnfield
    const copyField = this.getFieldDeepCopy()

    points.forEach((point) => {
      copyField[point[0]][point[1]] = tetromino.tetrominoType
    })

    return new Field(copyField)
  }
}
