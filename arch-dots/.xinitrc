
[[ -f ~/.Xresources ]] && xrdb merge ~/.Xresources
xrdb ~/.Xresources & 
xfce4-panel &
xbindkeys & 
uxterm &
sleep 10 &
google-chrome-stable &
discord &
clementine &
exec startxfce4

