
[[ -f ~/.Xresources ]] && xrdb merge ~/.Xresources
xrdb ~/.Xresources & 
xfce4-panel &
xbindkeys & 
xterm &
google-chrome-stable &
discord &
clementine &
exec startxfce4

