<!-- Title:"全学生に知ってもらいたいChromebookにlinuxをクリーンインストールする方法"  
     Tags:"Linux,chromebook"
     Date:"2025-06-08"
-->
みなさんChromebookをお持ちでしょうか。  
我が国では2019年からGIGAスクール構想が始まり生徒のPC所持が必須になりました。その過程でChromebookを所持する事になった学生の方も多いと思います。  
いろいろ酷評の多いChromebookですが、最大の難点は機能が限られているということです。Androidアプリが(なんとか)動くとはいえ、ほとんどのアプリはブラウザだけで動かされ、拡張性のかの字もありません。~~はっきり言ってゴミです~~  
そんなChromebookを、Ultrabookにする方法が一つあります。それはLinuxをインストールすることです。  
実はChromeOSでは開発環境としてLinuxをインストールする事ができます。しかしこれはあくまでも仮想環境であり、遅いのに加えデスクトップなどが変るわけではないのであまり実用性がありません。そこでChromebookにLinuxやその他のOS(Windowsなど)をインストール可能にする方法を紹介したいと思います。  
是非ChromebookにLinuxをインストールして自由世界への一歩を踏み出しましょう。  

## なぜChromebookにカスタムOSを入れることが難しいのか  
実際、そこまで難しくありません。システム構造的に入れることが難しいというだけの話です。  
ChromebookはデフォルトでUEFIブートをサポートしていなく、これをを可能にするためにBIOSをROMに書き込む必要があります。問題はカスタムROMを書き込むことが多くの場合ハードウェアレベルで制限されており、ハードウェアレベルでの操作が必要になるということです。  
ただChromebookにカスタムOSをインストールする手順はすでに有志の方によって開拓されており、マニュアルを見ながら簡単に挑戦することができます。 
 
## [mrchromebox.tech](https://mrchromebox.tech)  
ChromeOSからの脱却の道を示してくれた有志の方です。感謝感謝です。  

# 打倒ChromeOSまでの流れ  
1. デバイスをデベロッパーモードに移行
2. ハードウェアロックの除去
3. ソフトウェアロックの解除
4. ファイルシステムへの書き込みの権限を取得
5. MrChromebox.techのスクリプトを実行
6. USBブートでOSをインストール!

### 事前準備  
- Chromebook(管理対象ではなく、個人のアカウントでログインしているものが必要です。ゲストモードで起動しようとするとデベロッパーモードの権限が上書きされないので注意する必要があります)
- USB(できれば2つ)一つはOSイメージのブート用、もう一つはROMのバックアップ
- 電源ケーブル
- ドライバー
今回浄化していくデバイスはこちら  
Acer R752TG2
![](https://storage.googleapis.com/zenn-user-upload/1f8d2f649f32-20250607.png)
Lenovo 300e 2nd Gen
![](https://storage.googleapis.com/zenn-user-upload/95bfe65e256c-20250607.png)

## デベロッパーモードへの移行  

※データが全て吹っ飛びます  
定番のやつです。  
基本的に`Esc`+`リフレッシュポタン`を押しながら起動「OSが破損しているうんたらかんたら」  
`Ctrl` + `D` 「OSの確認機能をオフにするようんたらかんたら」`Enter`  
しばらく待つとデベロッパーモードで起動、そのまま自分のアカウントでログイン  
※デベロッパーモードで起動するたびに「OSの確認機能がオフになっています」みたいな感じでオンにするように催促がでてきますがしばらく待てば勝手に起動しますのでスルー。  

## ハードウェアブロックの解除  

機種によってハードウェアブロックの種類が異なりますが大抵は以下の四つのどれかでできます。

- 保護ネジの除去(Write Protect Screw) 
- バッテリーの取り外し(Unplag battery)
- Jumper(基盤の二つの穴をショートさせる)
- SuzyQケーブル(CCD closed case debugging)

SuzyQケーブルについては実際に入手していないのでわからないのですが、ChromeOSデバイスをデバッグするために作られた専用のケーブルらしいです。詳しくは本家を参照してみてください  
https://docs.mrchromebox.tech/docs/firmware/wp/disabling.html  
デバイス別のハードウェアブロックの一覧表は以下を参照してください。  
https://docs.chrultrabook.com/docs/devices.html

今回のデバイスの場合以下が該当します。
![](https://storage.googleapis.com/zenn-user-upload/bfac71846c58-20250607.png)
![](https://storage.googleapis.com/zenn-user-upload/17cd80ee848c-20250607.png)

両デバイスともバッテリーの一時除去によってハードウェアロックの解除が可能です。  

## ソフトウェアブロックの解除  

デベロッパーモードでログイン後、`Ctrl` + `Alt` + `→(リフレッシュキーの隣の右矢印)`でVT2ターミナルを開く`root`でログイン(パスワードはデフォルトで設定されていない)
```
flashrom --wp-disable
```
実行後、`crossystem | grep wpsw`で
```
wpsw_cur                = 0
```
となっていれば成功。おめでとうございます。   

 ※2023年以降の多くのChromeOSデバイスではセキュリティチップにTi50を使用しており、別のコマンドを使用します。

```
gsctool -a -o
```
Chromebookが再起動しデベロッパーモードが解除されるので再びデベロッパーモードで入る
```
gsctool -a -I AllowUnverifiedRo:always
```
電源ボタン押して確認を取る
```
flashrom --wp-disable
```
詳しくは以下を参照
https://www.chromium.org/chromium-os/developer-library/guides/device/ro-firmware-unlock/  


## ファイルシステムの書き込み権限の変更  

`root`でログインしたまま書き込み動作を行おうとうすると`Read only file system`と省かれてしまいます。このままだと後に実行するスクリプトもダウンロードできないので
```
sudo /usr/share/vboot/bin/make_dev_ssd.sh --remove_rootfs_verification --partitions 2
```
で権限を変更します。再起動後、書き込みが可能になっているはずです(別にrootじゃなくてlocalhostでログインすれば書き込みできるっぽい？)  
※うまくいかない場合は--forceオプションをつけるとよいらしい
```
sudo /usr/share/vboot/bin/make_dev_ssd.sh --force -remove_rootfs_verification
```

## スクリプトの実行  

[MrChromebox.techのスクリプト](https://docs.mrchromebox.tech/docs/fwscript.html)です。感謝感謝。
```
curl -LOk mrchromebox.tech/firmware-util.sh
```
```
sudo bash firmware-util.sh
```
こんな感じ※lenovo 300e 2nd gen
![](https://storage.googleapis.com/zenn-user-upload/4c871c08df29-20250607.jpg)
2を選択、後はスクリプトの指示通り。
途中でROMのバックアップを取らされるのでUSBが必要です。**FAT32**でフォーマットして差す。
![](https://storage.googleapis.com/zenn-user-upload/96d97279f7ab-20250607.jpg)

全て終れば再起動するとCustomSeaBIOSが入りUEFIブートが可能になります。
![](https://storage.googleapis.com/zenn-user-upload/9d183979ca15-20250608.jpg)

USBでArch Linuxを起動↓

![](https://storage.googleapis.com/zenn-user-upload/fdffa2871234-20250607.jpg)
(archinstallを使う際は先にストレージを手動でフォーマットしないといけない)

**お疲れ様でした。おめでとうございます。**
インストールが完了したらバッテリーを戻してあげましょう。
ArchLinuxをぶちこんだ学校のChromebook × 4
![](https://storage.googleapis.com/zenn-user-upload/114257ba3256-20250607.png)

## OS,ドライバなどについて  

学校で使用されるChromeOSデバイスの平均スペックはあまり高くありません。メモリ4GBの32GBストレージ、そんなところが平均です。よってUbuntuみたいな重いOSで良い体験ができるとは思いません。
低スペックかつ初心者ならLinux Mintが一番良いと思われます。かなりサクサクだし、いろんなものがデフォルトで揃っています。サポートもまぁまぁ。
ドライバに関してはなんやかんや対応されています。Wifi、オーディオに関してはあまりトラブルはありませんでした。
Windowsは？ そんなもん知らん(一応入る)

## 役に立つサイトなど  

https://docs.mrchromebox.tech/

https://docs.chrultrabook.com/

https://shimota.app/chromebook_to_developmode/

https://www.chromium.org/chromium-os/developer-library/guides/device/ro-firmware-unlock/

https://shivankaul.com/blog/editing-read-only-files-chromebook

https://chromium.googlesource.com/chromiumos/docs/+/master/write_protection.md

## これで君も自由世界の一員だ!

