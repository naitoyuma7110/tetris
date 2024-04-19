type FieldData = number[][]

export class Field {
  private field: number[][]

  // field描画の度にfield情報を引き継ぎインスタンス化する
  constructor(fieldData?: FieldData) {
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
  }

  get fieldData(): FieldData {
    return this.field
  }

  update = (fieldData: FieldData, position: { x: number; y: number }): void => {
    for (let i = 0; i < fieldData.length; i++) {
      const cols = fieldData[i]
      for (let j = 0; j < cols.length; j++) {
        const block = cols[j]
        if (block > 0) {
          this.field[i + position.y][j + position.x] = block
        }
      }
    }
  }

  static deepCopy = (field: Field): Field => {
    const data = field.fieldData
    const newFieldData = new Array<Array<number>>(data.length)
    for (const [i, rows] of data.entries()) {
      newFieldData[i] = new Array(rows.length)
      for (const [j] of rows.entries()) {
        newFieldData[i][j] = data[i][j]
      }
    }

    return new Field(newFieldData)
  }
}
