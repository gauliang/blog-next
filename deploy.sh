npm run build
npm run export

# 把生成的静态文件复制到子模块目录
rm -rf gauliang.github.io/_next/
cp -rf out/ gauliang.github.io/

cd gauliang.github.io/
# 切换到主分支并添加所有变更
git checkout master
git add -A
# 仅在存在变更时提交与推送
if ! git diff --cached --quiet; then
    git commit -m "Rebuilding site $(date)"
    git push origin master
fi
# 清理未跟踪文件，保持工作树干净
# 避免下次运行时出现大量未提交更改
git clean -fdx

cd ..
# 父仓库记录子模块的新 SHA
git add gauliang.github.io
if ! git diff --cached --quiet; then
    git commit -m "Rebuilding site $(date)"
    git push origin master
fi
