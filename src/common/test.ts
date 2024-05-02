import { reactive, ref } from 'vue'

// デフォルト オブジェクト型のフィールド
export class testA {
  field = {
    text: ''
  }
  constructor(text?: string) {
    if (!text) {
      this.field.text = 'hello'
    } else {
      this.field.text = text
    }
  }
}

// デフォルト プリミティブ型のフィールド
export class testB {
  text = ''
  constructor() {
    this.text = 'hello'
  }
}

// フィールドをオブジェクト形式で各要素をref
export class testC {
  private field = {
    text: ref<string>('')
  }

  constructor() {
    this.field.text.value = 'hello'
  }
}

// フィールドをreactive
export class testD {
  field = reactive({
    text: ''
  })
  constructor() {
    this.field.text = 'hello'
  }
}

// フィールドの要素をref
export class testE {
  field = {
    text: ref('')
  }
  constructor() {
    this.field.text.value = 'hello'
  }
}

// フィールドに他クラスを持つクラスを定義
export class HasClassOnField {
  classes: testA[] = []

  getClassLength() {
    return this.classes.length
  }
}
