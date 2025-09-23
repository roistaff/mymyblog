<!-- Title:"広告ブロッカーでもう二度と広告を見ない"  
     Tags:"Internet,free"
     Date:"2025-09-24"
-->

## Web初心者向けです
[Ublock Origin](https://ublockorigin.com/jp) 世界最高級の広告ブロッカー。  
ブラウザに導入することでウェブサイトのあらゆる広告(Youtube,niconico等)をブロックできる。
推奨ブラウザはFirefox。拡張機能のページから普通に追加することができる。  
以前はChromeといったChromiumベースのブラウザでも利用できたが、ChromiumがManifestV2からv3に移行しv2を段階的に廃止する方針に転換したため、そのままでは使えなくなった。  
ちなみに[Chrome Web Store](https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=ja)にあるこちらは使えない。  
また公式がManifestV3に対応したUblock origin Liteをリリースしているが、本当にLiteなので本家のような抑止力は持ち合わせていない。

ブラウザで言えばBraveなどに乗り換えることもおすすめ。

## ChromiumベースのブラウザにUblock Originを導入する方法
Chromiumベースのブラウザではいくつかのflagsを有効化してデベロッパーモードでパッケージ化されていないものを公式githubリポからダウンロードしてインポートする。

[Ublock Origin Github](https://github.com/gorhill/uBlock)
[Githubのリリース](https://github.com/gorhill/uBlock/releases/)からublock ???.chromium.zipをダウンロードしてそこら辺に解凍

![](https://i.imgur.com/m268Gvt.png)
ブラウザで拡張機能のページからデヴェロッパーモードをオンにしてload unpacked (パッケージ化されていない拡張機能を読み込む) > 解凍したフォルダを選択する

# 2025 9/24 追記:Chromium 140ではそもそも読み込もうとしない
![](https://i.imgur.com/P3Uy9NY.png)
以下の方法で再度有効にできる。   
chrome://flags で一番上に出てくるこの二つを有効にする
![](https://i.imgur.com/yzQTuEN.png)
また「manifest」で検索、出てくる「Allow legacy extensions...」を有効にする   
![](https://i.imgur.com/u9usvkK.png)
これで拡張機能を読み込むことができる。   
ちなみにこれらのflagsは近い内に削除される予定なのでFirefoxへの速やかな移行をおすすめする。  

![](https://i.imgur.com/0GRxGgq.png)
エラーが出るが無視

### Flagsを有効化

chrome://flags →manifest v2を検索し以下のように設定
![](https://i.imgur.com/umdiWBm.png)

→ allow legacy
![](https://i.imgur.com/LoIQbDG.png)

以上でブラウザを再起動すれば広告がブロックされるようになります。
![](https://i.imgur.com/YoEPnku.png)
