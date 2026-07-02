set -e

ROOT_DIR=$(pwd)
SUBMODULE_DIR="$ROOT_DIR/gauliang.github.io"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# 检查子模块是否存在且已初始化
if [ ! -e "$SUBMODULE_DIR/.git" ]; then
    echo "[deploy] 初始化子模块..."
    git submodule update --init --recursive
fi

echo "[deploy] 构建静态站点..."
npm run build

echo "[deploy] 创建 .nojekyll 以禁用 GitHub Pages Jekyll 处理..."
touch out/.nojekyll

echo "[deploy] 同步静态文件到子模块..."
rsync -a --delete --exclude='.git' out/ "$SUBMODULE_DIR/"

cd "$SUBMODULE_DIR"

# 确保在 master 分支（从分离头状态切换）
git checkout master 2>/dev/null || git checkout -b master

git add -A

if ! git diff --cached --quiet; then
    git commit -m "Rebuilding site $TIMESTAMP"
    git push origin master
else
    echo "[deploy] 子模块无变更，跳过提交"
fi

cd "$ROOT_DIR"

git add gauliang.github.io

if ! git diff --cached --quiet; then
    git commit -m "Rebuilding site $TIMESTAMP"
    git push origin master
else
    echo "[deploy] 主仓库无变更，跳过提交"
fi

echo "[deploy] 部署完成"
