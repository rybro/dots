##########
# .ZSHRC #
##########
ZSH_THEME="candy"
COMPLETION_WAITING_DOTS="true"


 
##########
# Source #
##########
source ~/.oh-my-zsh/antigen.zsh



###########
# Antigen #
###########
antigen use oh-my-zsh
antigen bundle zsh-users/zsh-syntax-highlighting
antigen apply
antigen theme candy


##########
# Setopt #
##########
setopt autocd
setopt correctall


###########
# Exports #
###########
export EDITOR='gvim'
export LANG=en_US.UTF-8
export PATH="/usr/local/sbin:/usr/local/bin:/usr/bin:/usr/bin/site_perl:/usr/bin/vendor_perl:/usr/bin/core_perl"
export ZSH=$HOME/.oh-my-zsh
export GOPATH=~/go
export PATH="$(ruby -e 'print Gem.user_dir')/bin:$PATH"
 

###########
# Aliases #
###########
alias ls="ls -h --color=auto"
alias la="ls -a"
alias we="curl --silent http://wttr.in/78602 | head -7"
alias sz="source ~/.zshrc"
alias gs='git status'
alias tm='tmux'
alias bs='browser-sync start --server --files "assets/css/*.css"'
alias ..='cd ..'
alias c='printf "\033c"'
alias rb='reboot'
alias tmp=" sensors | egrep -i --color 'core |temp[1-9]' "
alias ts='tmux source-file ~/.tmux.conf'
alias df='df -h'
alias tmpc='sudo find /tmp -ctime +10 -exec rm -rf {} +'
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
function extract() {
     if [ -f $1 ] ; then
         case $1 in
            *.tar.bz2)   
                tar xvjf $1     
                ;;
            *.tar.gz)    
                tar xvzf $1     
                ;;
            *.bz2)       
                bunzip2 $1      
                ;;
            *.rar)
                unrar x $1      
                ;;
            *.gz)
                gunzip $1       
                ;;
            *.tar)
                tar xvf $1      
                ;;
            *.tbz2)
                tar xvjf $1     
                ;;
            *.tgz)
                tar xvzf $1     
                ;;
            *.zip)
                unzip $1        
                ;;
            *.Z)
                uncompress $1   
                ;;
            *.7z)
                7z x $1         
                ;;
            *)  
                echo "'$1' cannot be extracted via extract" 
                ;;
        esac
    else
        echo "'$1' is not a valid file"
    fi
}
