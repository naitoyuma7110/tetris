import { DROP_POINT, Tetromino } from './Tetromino'

export class TetrominoManager {
  stockedTetromino: Tetromino | undefined

  nextTetrominos: Tetromino[]

  activeTetromino: Tetromino

  constructor() {
    const setCount = 2
    const nextTetrominos: Tetromino[] = []
    for (let i = 1; i <= setCount; i++) {
      const nextTetromino = Tetromino.createRandomTetromino()
      nextTetromino.setPointOnField = [0, 1]
      nextTetrominos.push(nextTetromino)
    }
    this.nextTetrominos = nextTetrominos
    this.activeTetromino = Tetromino.createRandomTetromino()
  }

  getActiveCopy() {
    return this.activeTetromino.copyInstance()
  }

  createActiveTetromino() {
    const newActiveTetromino = this.nextTetrominos[0].copyInstance()
    newActiveTetromino.setPointOnField = DROP_POINT
    this.activeTetromino = newActiveTetromino
    this.nextTetrominos.shift()
    const nextTetromino = Tetromino.createRandomTetromino()
    nextTetromino.setPointOnField = [0, 1]
    this.nextTetrominos.push(nextTetromino)
  }

  stockTetromino() {
    const newStockTetromino = this.activeTetromino.copyInstance()
    newStockTetromino.setPointOnField = [0, 1]
    this.stockedTetromino = newStockTetromino
    if (this.stockedTetromino) {
      const newActiveTetromino = this.stockedTetromino.copyInstance()
      newActiveTetromino.setPointOnField = DROP_POINT
      this.activeTetromino = newActiveTetromino
    } else {
      this.createActiveTetromino()
    }
  }
}
