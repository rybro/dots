[[ -f ~/.Xresources ]] && xrdb merge ~/.Xresources
xrdb ~/.Xresources & 
xfce4-panel &
xbindkeys & 
xterm &
chromium &
discord &
clementine &
ghetto-skype &
nm-applet &
setxkbmap -option altwin:ctrl_win &
scudcloud &
exec startxfce4

