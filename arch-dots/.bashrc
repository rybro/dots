#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return


PS1="\n\[\e[30;1m\]\[\016\]\[\017\](\[\e[1;96m\]\u\[\e[0m\]@\h\[\e[30;1m\])-(\[\e[30;1m\]\@ \d\[\e[30;1m\])-\[\e[30;1m\]\[\016\]\[\017\](\[\[\e[94;1m\]\w\[\e[30;1m\])\n\[\e[1;94m\] » \[\e[0m\]\[\e[0m\]"

export EDITOR="atom"
alias ls="ls -h --color=auto --group-directories-first --time-style='+%d.%m.%y %H:%M'"
alias la="ls -a"
alias we="curl --silent http://wttr.in/78602 | head -7"
alias sb="source ~/.bashrc"
alias gs='git status'
alias tm='tmux'
alias bs='browser-sync start --server --files "assets/css/*.css"'
alias ..='cd ..'
function acp() {
    git add -A
    git commit -a -m "$1"
    git push -u origin master
}
