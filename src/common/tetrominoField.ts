export class TetrominoQiita {
  id = 1
  blocks = [
    [0, 0],
    [0, -1],
    [0, 1],
    [-1, 0]
  ]
  fieldPosition = {
    x: 5,
    y: 5
  }

  get blocksOnField() {
    const blocksOnField = []

    for (const block of this.blocks) {
      const pointOnField = [block[0] + this.fieldPosition.y, block[1] + this.fieldPosition.x]
      blocksOnField.push(pointOnField)
    }
    return blocksOnField
  }
}
