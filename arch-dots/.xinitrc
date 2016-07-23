[[ -f ~/.Xresources ]] && xrdb merge ~/.Xresources
xrdb ~/.Xresources & 
xfce4-panel &
xbindkeys & 
xterm &
chromium &
ghetto-skype &
discord &
clementine &
nm-applet &
setxkbmap -option altwin:ctrl_win &
exec startxfce4
