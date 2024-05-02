# Vue3 Composition APIでテトリス

## メモ

> Vuetify3(デザインフレームワーク)
>
> - セットアップ：https://vuetifyjs.com/en/getting-started/installation/#using-vite
> - MDIの導入：https://mdizenn.dev/shachihoko/articles/44beb04a9ec02a

> chromeデバックツール：https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd

> Pinia(状態管理)
>
> - セットアップ：https://pinia.vuejs.org/introduction.html

> vue-router(ルーティング)
>
> - セットアップ：https://v3.router.vuejs.org/ja/installation.html

> オブジェクト指向
>
> - Vue3でTS使ってもクラスなんか使うなよ、という話：https://zenn.dev/tanukikyo/articles/40603fbdc88c05
>
> メモ：クラスインスタンスのリアクティブ化は注意点が多くコードの複雑化を招く旨を解説する記事だが現バージョンで検証したところref,reactiveによる定義で内部までリアクティブ化が可能で、呼び出しも記事に記載されたような特殊な点は見られない

> Vue3 computed/watch/watchEffect 使い分け調べてみた：https://zenn.dev/n4sh/articles/d51f505835d171
>
> メモ：returnが欲しいならcomputed,副作用が欲しいならwatchというように使い分ける

> リアクティブな値の分割代入
>
> Vue3でtoRefs()関数を使う：https://qiita.com/oinusama/items/9fc1755e8141fecd5650
> メモ：Vueにおいてリアクティブな値を分割代入するとリアクティブ性を失うためtoRefsを使用して分割する

## 構成

![整理図](https://github.com/naitoyuma7110/tetris/assets/128150297/0bf4e477-eece-449b-a2af-f1e090cd5e77)
