[[ -f ~/.Xresources ]] && xrdb merge ~/.Xresources
xrdb ~/.Xresources & 
xfce4-panel &
xbindkeys & 
xterm &
chromium &
skype &
discord &
clementine &
nm-applet &
exec startxfce4
