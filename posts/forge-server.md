<!-- Title:"MinecraftのForgeサーバーをサクっと建てる"
     Tags:"Linux,minecraft,server"
     Date:"2025-09-27"
-->
# Forge(1.20.1)のmodサーバーをサクっと建てよう   

大まかなスクリプト↓ (ArchLinuxで動作)
```
mkdir forge && cd forge
sudo pacman -S wget unzip jdk17-openjdk
wget https://maven.minecraftforge.net/net/minecraftforge/forge/1.20.1-47.4.0/forge-1.20.1-47.4.0-installer.jar
wget -O mod.zip "https://drive.usercontent.google.com/download?id=1c7ArgNKT43yd9h716fiJRWN1ron-z4d4&export=download&authuser=0&confirm=t&uuid=23f09a2d-97d6-46e0-aec5-bb13dc371d91&at=AN8xHoqmeBBTO34aGJN1XkHh_FVT%3A1758898476233"
unzip mod.zip
echo "-Xmx3G" > user_jvm_args.txt
echo "eula=true" > eula.txt
java -jar forge-1.20.1-47.4.0-installer.jar --installServer
```
`-Xmx`で割り当てるメモリを調整する。   

オフラインアカウントで遊ぶ場合は`server.properties`の`online-mode`を`true`にする。ただしアカウントのスキンが反映されなくなる。   
mod.zipは各自用意。modernfix、ferritecore,memoryleakfixは必ず入れた方がいい。
