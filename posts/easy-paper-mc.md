<!-- Title:"PaperMCで爆速でMinecraftサーバーを建てる"  
     Tags:"Linux,Minecraft,server"
     Date:"2025-08-01"
-->  
# Minecraftサーバーを爆速で建てることができた  

![](https://i.imgur.com/90uy0zY.png)  

## Javaの導入  

Minecraftバージョンは1.20.1です。現在デフォルトで入るJavaのバージョンで大丈夫です
```
sudo apt install default-jre
```
```
$ java --version
openjdk 17.0.15 2025-04-15
OpenJDK Runtime Environment (build 17.0.15+6-Debian-1deb12u1)
OpenJDK 64-Bit Server VM (build 17.0.15+6-Debian-1deb12u1, mixed mode, sharing)
```
最新版のPaperMC(1.21.8とか)を利用するには公式リポジトリにはないと思うので各自ダウンロードする必要がありそうです。   

## PaperMCのダウンロード  

適当にwgetなどでサーバーに配置してください。  
ちなみに過去のPaperMCのリンクは以下で確認できます。  
https://gist.github.com/osipxd/6119732e30059241c2192c4a8d2218d9  

# 起動  

```
java -server -Xms2G -Xmx2G -jar papermc.jar nogui
```
コマンドを実行した場所で設定ファイルやリソースファイルが作成されるので専用のディレクトリの中で実行することをおすすめします。
  
初回起動ではEulaの規約に同意しろと騒ぐので`eula.txt`の`eula=false`を`eula=true`にします。  

# プラグイン  

プラグインの導入も簡単です。プラグインファイルをコマンドを実行したディレクトリの中で作成される`plugins`というフォルダの中に設置するだけで良いです。  

# 簡単に鯖を建てることができた

![](https://i.imgur.com/n0MWPhr.png)
