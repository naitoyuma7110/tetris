# Vue3 でテトリス

「見ないでテトリスを書いてみよう」  
ロジックは自己流のため適宜修正していく。

アプリURL：https://naitoyuma7110.github.io/tetris/

※構成やロジックの整理：[/ドキュメント/整理.drawio](https://github.com/naitoyuma7110/tetris/blob/main/%E3%83%89%E3%82%AD%E3%83%A5%E3%83%A1%E3%83%B3%E3%83%88/%E6%95%B4%E7%90%86%E5%9B%B3.drawio)
## 使用技術

- Vue3(Composition API, Typescript)
- Vuetify3(デザインFW)
- Scss
- vue-router

## UI・見た目

![2024-05-05_03h28_53](https://github.com/naitoyuma7110/tetris/assets/128150297/0943763c-46a5-40fc-b680-5ef6f3584fd0)

## アプリケーション構成

オブジェクト指向を参考にクラスでロジック部分の役割分担を行う。
テトリスに関する複雑化しやすい処理はカプセル化してクラスに閉じて定義する。

最終的にクラスはVueファイルでインスタンス化して、各クラスメソッドを利用しユーザー操作を実現する。  
またクラスフィールドをリアクティブ化し描画に利用する。

### クラス図

![image](https://github.com/naitoyuma7110/tetris/assets/128150297/250405d6-ae0d-4f9c-b3c9-4d7b01dacdeb)

## 詳細ロジック

テトリスの処理の中でメインとなり複雑化し易いもについてのみ図を作成して整理

- フィールド上にテトリミノを描画する、テトリミノを移動、回転する

![image](https://github.com/naitoyuma7110/tetris/assets/128150297/9307f8de-8180-4a1d-a12d-ded0231d0030)

- 堆積したテトリミノをフィールドに保持する

![image](https://github.com/naitoyuma7110/tetris/assets/128150297/844ee910-66e0-4f85-bd98-4df1b513e59a)

- テトリミノの移動や回転時に壁や堆積タイルとの衝突を判定する

![image](https://github.com/naitoyuma7110/tetris/assets/128150297/356c639d-a746-4760-8c78-bb57896164ee)

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

Vite Build設定

- Vite + Vueでビルドしたが真っ白：https://qiita.com/fwzis/items/18fe1475f820b39142f5

  > GithubPage公開のため"/docs"下に静的ファイルをnpm buildしたい時の参考。設定ファイルはvite.config.tsとなっている

クラスインスタンスのリアクティブ化

- Vue3でTS使ってもクラスなんか使うなよ、という話：https://zenn.dev/tanukikyo/articles/40603fbdc88c05

  > メモ：クラスインスタンスのリアクティブ化は注意点が多くコードの複雑化を招く旨を解説する記事だが現バージョンで検証したところref,reactiveによる定義で内部までリアクティブ化が可能で、呼び出しも記事 に記載されたような特殊な点は見られない

リアクティブな変数の再代入に関する注意点

- [Vue3] オブジェクトをリアクティブにするのに ref()、reactive() どちらにするかハマった話：https://qiita.com/sygnas/items/672709d6dad6bcfea43f

  > メモ：let(再代入前提) + reactiveで宣言して新しくnew classする際、Object.assign(target, source)を使う方法もあるらしいがコード記述が長くなるためrefを使用。

リアクティブな値の分割代入

- Vue3でtoRefs()関数を使う：https://qiita.com/oinusama/items/9fc1755e8141fecd5650

  > メモ：おそらくVue界の常識だがハマった。リアクティブな値を分割代入するとリアクティブ性を失うためtoRefsを使用して分割する
