# Vue3 でテトリス

「見ないでテトリスを書いてみよう」
ロジックは自己流のため適宜修正していく。

## 使用技術

- Vue3(Composition API, Typescript)
- Vuetify3(デザインFW)
- Scss
- vue-router

## アプリケーション構成

オブジェクト指向を参考にクラスでロジック部分の役割分担を行う。
テトリスに関する複雑化しやすい処理はカプセル化してクラスに閉じて定義する。

最終的にクラスはVueファイルでインスタンス化して、各クラスメソッドを利用しユーザー操作を実現する。  
またクラスフィールドをリアクティブ化し描画に利用する。

## 詳細ロジック

テトリスにメインとなり複雑化し易い処理についてのみ記載

## 開発メモ

Vuetify3(デザインフレームワーク)

- セットアップ：https://vuetifyjs.com/en/getting-started/installation/#using-vite
- MDIの導入：https://mdizenn.dev/shachihoko/articles/44beb04a9ec02a

デバック

- chromeデバックツール：https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd

Pinia(状態管理)

- セットアップ：https://pinia.vuejs.org/introduction.html

vue-router(ルーティング)

- セットアップ：https://v3.router.vuejs.org/ja/installation.html

クラスインスタンスのリアクティブ化

- Vue3でTS使ってもクラスなんか使うなよ、という話：https://zenn.dev/tanukikyo/articles/40603fbdc88c05

  > メモ：クラスインスタンスのリアクティブ化は注意点が多くコードの複雑化を招く旨を解説する記事だが現バージョンで検証したところref,reactiveによる定義で内部までリアクティブ化が可能で、呼び出しも記事 に記載されたような特殊な点は見られない

リアクティブな変数の再代入に関する注意点

- [Vue3] オブジェクトをリアクティブにするのに ref()、reactive() どちらにするかハマった話：https://qiita.com/sygnas/items/672709d6dad6bcfea43f

  > メモ：let(再代入前提) + reactiveで宣言して新しくnew classする際、Object.assign(target, source)を使う方法もあるらしいがコード記述が長くなるためrefを使用。

リアクティブな値の分割代入

- Vue3でtoRefs()関数を使う：https://qiita.com/oinusama/items/9fc1755e8141fecd5650

  > メモ：おそらくVue界の常識だがハマった。リアクティブな値を分割代入するとリアクティブ性を失うためtoRefsを使用して分割する
