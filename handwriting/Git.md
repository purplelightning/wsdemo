Git是一种版本控制系统，在现在的开发中应用广泛，掌握常用的命令，可以提高开发效率。

### 基本命令
git init：创建新文件  
git add readme.txt：把文件添加到仓库,其实是暂存区  
git commit -m "xxx"：提交命令，-m "..."本次提交的说明,commit一次可以提交多个文件  
git status：查看文件状态  
git diff xxx：查看文件具体的不同  
git log：查看历史记录  
git log --pretty=oneline：以一行格式查看历史记录  
git pull origin 分支名：拉取新的提交  
git pull --rebase origin 分支名：本地分支commit后，当别人的提交在你之前时，这条命令可以使你的这次提交在别人提交的记录后面，使提交历史对应提交顺序，更加清晰
git push origin 分支名：将提交推送到远程
git add把文件添加进去，实际上就是把文件修改添加到暂存区，git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支。
 
### 回退版本库
HEAD：当前版本	HEAD^：上一个版本 HEAD^^：上上个版本  
git reset --hard HEAD^：回退到上个版本  
git reset --hard 3628164：直接回到指定版本  
git reset --hard HEAD~N：回退N个版本  
git reflog：用来记录你的每一次命令，可以找到commit id，直接回到此版本  

### 分支管理
git checkout -b 分支名：从本分支创建新的分支  
git checkout 分支名：远程有对应分支时会拉取远程分支创建本地分支  
git checkout -b xxx origin/xxx：创建远程分支对应的本地分支  
git branch：查看本地分支  
git branch -a：查看本地和远程分支  
git branch -d 分支名：删除分支（非强制）  
git branch -D 分支名：强制删除分支  

### 撤销/修改提交
git checkout -- xxx：用于git add 之前的撤销  
git reset HEAD xxx：用于git add之后，git commit之前的撤销  
git commit --amend：commit之后，修改提交备注
git rebase -i HEAD~N：没用push前对本地最近N次提交进行操作，如改成一次commit等
 
### 删除文件的指令
git rm 用于删除一个文件
1.先普通删除  
2.git rm test.txt  
3.git commit -m "xxx"  

### 别名
#### 普通别名
git config --global alias.cv 'commit -v'，这样设置后git cv就相当于git commit -v
#### bash别名
在alias中配置： pr = "!f() { git push origin HEAD:refs/for/$1; }; f"，这样通过bash脚本设置后git pr 分支名就相当于 git push origin HEAD:refs/for/分支名，大大渐变了gerrit中的提交，不过这种方式只适用于Node10以上的环境中

### git全局配置
git config --list 查看git配置  
vi ~/.gitconfig 修改git配置 

### git查看/设置不同的用户名，邮箱
#### 1.查看全局用户名，邮箱
git config --global user.name
git config --global user.email
#### 2.全局设置
git config --global user.name xxx
git conifg --global user.email xxx@163.com
#### 3.当前项目目录设置
git config user.name xxx
git config user.email xxx@xxx.com
### 统计git提交代码
#### 1.统计全部
$ git log --author="$(git config --get user.name)" --pretty=tformat: --numstat | gawk '{ add += $1 ; subs += $2 ; loc += $1 - $2 } END { printf "added lines: %s removed lines : %s total lines: %s\n",add,subs,loc }' -
#### 2.统计时间段
git log --author="$(git config --get user.name)" --pretty=tformat: --after="2021-06-01" --numstat | gawk '{ add += $1 ; subs += $2 ; loc += $1 - $2 } END { printf "added lines: %s removed lines : %s total lines: %s\n",add,subs,loc }' -

#### 查看本地ssh key
文件夹方式查看，window系统打开目录文件：
C:/Users/user/.ssh/id_rsa.pub

#### github push时需要输入用户名密码：把https方式改成ssh方式
git remote rm origin
git remote add origin git@github.com:xxx/xxx.git

 