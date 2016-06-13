#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return


PS1="\n\[\e[30;1m\]\[\016\]\[\017\](\[\e[1;96m\]\u\[\e[0m\]@\h\[\e[30;1m\])-(\[\e[30;1m\]\@ \d\[\e[30;1m\])-\[\e[30;1m\]\[\016\]\[\017\](\[\[\e[94;1m\]\w\[\e[30;1m\])\n\[\e[1;94m\] » \[\e[0m\]\[\e[0m\]"

alias ls="ls -h --color=auto --group-directories-first --time-style='+%d.%m.%y %H:%M'"
alias la="ls -a"
alias we="curl --silent http://wttr.in/78602 | head -7"
alias sb="source ~/.bashrc"
alias gs='git status'
alias tm='tmux'
alias xt='xterm'
alias bs='browser-sync start --server --files "assets/css/*.css"'
alias ..='cd ..'
alias c='printf "\033c"'
alias rb='reboot'
alias tmp=" sensors | egrep -i --color 'core |temp[1-9]' "
function acp() {
    git add -A
    git commit -a -m "$1"
    git push -u origin master
}
function res() {
	xrandr --newmode "1920x1080_60.00" 173.00 1920 2048 2248 2576 1080 1083 1088 1120 -hsync +vsync  
	xrandr --addmode VGA1 1920x1080_60.00 
	xrandr --output VGA1 --mode 1920x1080_60.00  
}
