" ---------------------------------- Plugins ----------------------------------

execute pathogen#infect()

let g:airline#extensions#tabline#enabled = 1
let g:airline_powerline_fonts = 1

"let g:airline_theme='amdi'
let g:airline_theme='molokai'



" Autocomplete HTML
autocmd FileType html set omnifunc=htmlcomplete#CompleteTags

" Autocomplete HTML tags in all of the following extensions
let g:closetag_filenames = "*.html,*.xhtml,*.phtml,*.php"

" Syntastic stuff
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0

"let jshint2_command = '~/path/to/node_modules/.bin/jshint'
" Lint after saving
let jshint2_save = 1
" Skip lint confirmation for non js files
let jshint2_confirm = 0

" NERDTree stuff
let NERDTreeIgnore = ['\.pyc$', '\.class$', '\.exe$', '\.obj$', '\.gch$', '\.o$']

if has("win32") || has("win64")
    let g:NERDTreeDirArrowExpandable = '>'
    let g:NERDTreeDirArrowCollapsible = 'V'
elseif has("gui_running")
    let g:NERDTreeDirArrowExpandable = '▸'
    let g:NERDTreeDirArrowCollapsible = '▾'
else
    let g:NERDTreeDirArrowExpandable = '>'
    let g:NERDTreeDirArrowCollapsible = 'V'
endif

" Start latex live preview with ctrl p
map <silent> <C-p> :LLPStartPreview<CR>

" Start nerdtree when vim is opened
"autocmd vimenter * NERDTree

" Turn off automatic comments on new lines for all file formats
autocmd FileType * setlocal formatoptions-=c formatoptions-=r formatoptions-=o

" Don't let font size changer timeout
let g:fontsize#timeout = 0

" ---------------------------------- Compatibility ----------------------------------

set nocompatible        " use vim defaults instead of vi
set encoding=utf-8      " always encode in utf-8

if has("win32") || has("win64")
    set clipboard=unnamed
else
    set clipboard=unnamedplus
endif

filetype plugin indent on
syntax on

" ---------------------------------- General ----------------------------------

set fileformat=unix     " set unix line endings
set fileformats=unix,dos  " when reading files try unix line endings then dos, also use unix for new buffers
set hidden              " hide when switching buffers, don't unload
set lazyredraw          " don't update screen when executing macros
set noshowmode          " don't show mode; using powerline plugin
set wildmenu            " enhanced cmd line completion
set wildmode=list:longest,full
set wildignore=*.swp,*.bak,*.pyc,*.class
set backspace=2         " enable <BS> for everything
set backspace=indent,eol,start
set laststatus=2        " always show status line
set showmatch           " show bracket matches
set spelllang=en_us     " spell check with american english
set textwidth=0         " don't break lines after some maximum width
set title               " use filename in window title
set modelines=0		    " prevents security exploit involving modelines
set ttyfast		        " indicates fast terminal connection
set synmaxcol=2048	    " disables syntax highlighting for lines that are too long
set vb			        " disable beep
set so=14		        " enable smart scrolling
set showcmd             " Show partial commands in the last line of the screen
set wrap                " wrap lines
set nostartofline       " stop certain movements from always going to first char of a line
set confirm             " raise a dialogue asking if you wish to save changed files
set mouse=a             " enable mouse for all modes
set pastetoggle=<F11>   " Use <F11> to toggle between 'paste' and 'nopaste'
set pastetoggle=<F4>	" sets F2 to paste mode toggle
set showmode            " show the mode
"let mapleader = ","	    "  sets leader to ,

" Number Line
set number		                 " show line numbers

if has("gui_running")
    set cmdheight=5
endif

" Saving
"set backup	         	        " enables backups
"set backupdir=~/.vim/backups    " sets backup save folder
set noswapfile		            " disables swapfiles
set nobackup
set nowritebackup
set history=1000	            " remember more commands and search history
set undofile		            " enables undo file
set undolevels=1000	            " adds more undo levels
set undoreload=10000	        " meximum number lines to save for undo on a buffer reload
set undodir=~/.vim/undo         " sets undo save folder

" Tabs
set autoindent          " copy indent from previous line
set smartindent
set smarttab            " smart handling of tab key
set sw=4		        " set number of space character inserted for indentation
set ts=4		        " set how many columns a tab counts for
set sts=4		        " set how many columns a soft tab counts for
set expandtab		    " hitting tab in insert mode will produce appropriate number of spaces

" Searches
set hlsearch            " highlight search results
set incsearch           " search whilst typing
set ignorecase          " case insensitive searching
set smartcase           " override ignorecase if upper case typed
set gdefault		    " applies substitutions globally, add the /g to revert to previous behavior

" Folding
set foldlevelstart=99   " no folds closed on open
set foldmethod=marker   " collapse code using markers

" GUI Vim
set guioptions-=m  "remove menu bar
set guioptions-=T "remove toolbar
set guioptions-=r "remove right-hand scroll bar
set guioptions-=L "remove left-hand scroll bar. Fix for TagBar.

" Colors

if has("gui_running")
else
    set t_Co=256                            " enable 256 colors in vim
    "set t_AB=^[[48;5;%dm
    "set t_AF=^[[38;5;%dm
endif
"set background=dark
"colorscheme amdikai
"colorscheme dejavu
"colorscheme lovekai
"colorscheme molokai
"colorscheme neverness
"colorscheme mvimhut
"colorscheme mdejavu
"colorscheme mirodark
"colorscheme marussian
"colorscheme mirodark
colorscheme stereokai


" Fonts
set guifont=Meslo\ LG\ M\ for\ Powerline\ 10

" ---------------------------------- Mappings ----------------------------------

" insert mode movement
"inoremap <C-h> <left>
"inoremap <C-j> <down>
"inoremap <C-k> <up>
"inoremap <C-l> <right>

" tab management

" like firefox
"nnoremap <C-S-tab> :tabprevious<CR>
nnoremap <C-tab>   :tabnext<CR>
nnoremap <C-t>     :tabnew<CR>
"inoremap <C-S-tab> <Esc>:tabprevious<CR>i
"inoremap <C-tab>   <Esc>:tabnext<CR>i
"inoremap <C-t>     <Esc>:tabnew<CR>

" with > and <
"nnoremap , :tabprevious<CR>
"nnoremap . :tabnext<CR>
"nnoremap <C-t>     :tabnew<CR>
"inoremap <C-S-tab> <Esc>:tabprevious<CR>i
"inoremap <C-tab>   <Esc>:tabnext<CR>i
"inoremap <C-t>     <Esc>:tabnew<CR>
"
"nnoremap <silent> <leader>w :tabprevious<cr>
"nnoremap <silent> <leader>q :tabnext<cr>
"nnoremap <silent> <leader>e :tabnew<cr>
"nnoremap <silent> <leader>r :tabclose<cr>

" Save with ctrl s
nmap <c-s> :w<CR>
imap <c-s> <Esc>:w<CR>a

" remap j and k to move by screen line
nnoremap j gj
nnoremap k gk

" remap ; as :
nnoremap ; :

" remove F1 help and set it to switch to previously modified buffer when in normal mode
nnoremap <F1> <C-^>
inoremap <F1> <nop>
vnoremap <F1> <nop>

" remap jj as escape inside normalmode
inoremap jj <ESC>

" open ~/.vimrc

" source ~/.vimrc
nmap <silent> <leader>sv :so $MYVIMRC<cr>:noh<cr>

" Save session with f2
map <F2> :mksession! ~\.vim_session <cr> " Quick write session with F2

" Load session with f3
map <F3> :source ~\.vim_session <cr>     " And load session with F3

" toggle nerd tree
nmap <silent> <leader>l :NERDTreeToggle<cr>
let NERDTreeShowHidden=1

" Toggle explore menu
nmap <silent> <leader>e :Explore<cr>

" Toggle file tags
nmap <silent> <leader>t :TagbarToggle<cr>

" Fuzzy finder for buffers
map <silent> <leader>b :FufBuffer<cr>

" Fuzzy finder for files
map <silent> <leader>f :FufFile<cr>

" clear search highlighting
noremap <silent> <Space> :silent noh<Bar>echo<CR>

" remap vim regex to be more like perl regex
"nnoremap / /\v
"vnoremap / /\v

" remap % functionality to tab
nnoremap <tab> %
vnoremap <tab> %

" buffer management
noremap <silent> [ :bd<cr>
noremap <silent> ] :buffers<cr>
nnoremap , :bp<CR>
nnoremap . :bn<CR>

" window management
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l
noremap <C-w>s <C-w>v
noremap <C-w>v <C-w>s
ca sp vsp
ca vsp sp

" Move to different windows with alt up down left right
nmap <silent> <C-Up> :wincmd k<CR>
nmap <silent> <C-Down> :wincmd j<CR>
nmap <silent> <C-Left> :wincmd h<CR>
nmap <silent> <C-Right> :wincmd l<CR>

"resize horizontally split windows with - and +
map - <C-W>-
map + <C-W>+

"resize vertically split windows with alt-shift-[><]
map <M-<> <C-W><
map <M->> <C-W>>

" SaveSession() binding
"noremap <silent> <leader>s :call SaveSession()<cr>

