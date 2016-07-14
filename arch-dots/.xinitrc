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
exec startxfce4
