[[ -f ~/.Xresources ]] && xrdb merge ~/.Xresources
xrdb ~/.Xresources & 
xfce4-panel &
xbindkeys & 
xterm &
firefox &
franz-bin &
clementine &
nm-applet &
setxkbmap -option altwin:ctrl_win &
exec startxfce4
