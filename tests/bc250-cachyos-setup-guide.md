<!-- Title:"BC250 CachyOSセットアップガイド" 
     Tags:"Linux,Hardware"
     Date:"2026-10-27"
 -->
# BC250をCachyOSでセットアップする
## BC250って何だ？
BC250とはPS5の出来損ないみたいなものである。メモリ8GB、VRAM8GB、CPUとGPUが一緒になったiGPUボードであり、電源に挿すだけでGPUが使えるのが便利。欠点としてドライバーがマニアックであり、Linuxのみサポート（discordサーバーではWindowsやHackintoshへの移植が進んでいるのでチェックしてみるといい）。GPUのオーバークロックにも対応しており、電力消費と排熱制御を犠牲にすればCyberpunk2077のようなヘビーゲームが60-80FPSで動く。
## CachyOS
Archlinuxをベースにした最近流行りのディストロ。