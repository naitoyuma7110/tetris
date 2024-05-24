import type { TetrominoQiita } from './tetrominoField'

export class FieldQiita {
  private row = 20
  private col = 10

  renderField: number[][]

  constructor() {
    const field = new Array<Array<number>>(this.row)

    for (let i = 0; i < this.row; i++) {
      const fieldColumn = new Array(this.col).fill(0)
      field[i] = fieldColumn
    }

    this.renderField = field
  }

  renderTetromino(tetromino: TetrominoQiita) {
    const blocks = tetromino.blocksOnField
    blocks.forEach((block) => {
      this.renderField[block[0]][block[1]] = tetromino.id
    })
  }
}
