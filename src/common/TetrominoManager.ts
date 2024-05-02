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
    const activeTetromino = this.nextTetrominos[0].copyInstance()
    activeTetromino.setPointOnField = DROP_POINT
    this.activeTetromino = activeTetromino
    this.nextTetrominos.shift()
    const nextTetromino = Tetromino.createRandomTetromino()
    nextTetromino.setPointOnField = [0, 1]
    this.nextTetrominos.push(nextTetromino)
  }

  stockTetromino() {
    const newStockTetromino = this.getActiveCopy()
    newStockTetromino.setPointOnField = [0, 1]
    this.stockedTetromino = newStockTetromino
  }
}
