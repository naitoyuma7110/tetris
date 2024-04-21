import type { Point, Tetromino } from '@/common/Tetromino'
type FieldData = number[][]

export class Field {
  private field: number[][]

  private tetrominoPoint: Point

  constructor(tetrominoPoint?: Point, fieldData?: FieldData) {
    if (fieldData) {
      this.field = fieldData
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

    if (tetrominoPoint) {
      this.tetrominoPoint = tetrominoPoint
    } else {
      this.tetrominoPoint = [0, 5]
    }
  }

  get fieldData(): FieldData {
    return this.field
  }

  get tetrominoData(): Point {
    return this.tetrominoPoint
  }

  shiftTetrominoPoint(y: number, x: number) {
    const currentY = this.tetrominoPoint[0]
    const currentX = this.tetrominoPoint[1]
    this.tetrominoPoint = [currentY + y, currentX + x]
  }

  renderTetromino(Tetromino: Tetromino) {
    const tilePoints = Tetromino.tiles

    const newTilePoints = []

    for (const point of tilePoints) {
      const newPoint = [point[0] + this.tetrominoPoint[0], point[1] + this.tetrominoPoint[1]]
      newTilePoints.push(newPoint)
    }

    newTilePoints.forEach((point) => {
      this.field[point[0]][point[1]] = Tetromino.tetrominoType
    })
  }

  static deepCopy = (field: Field): Field => {
    // Vueコンポーネントが変更を感知するために新しいメモリ領域に更新データを作成
    const newFieldData = field.fieldData.map((rows) => rows.slice())
    const newTetrominoPoint = { ...field.tetrominoData }
    return new Field(newTetrominoPoint, newFieldData)
  }
}
