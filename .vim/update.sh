#!/bin/zsh
for dir in ~/.vim/bundle/*; do
    pushd $dir
    git pull
    popd
done