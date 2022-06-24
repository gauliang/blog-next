npm run build
npm run export

rm -rf gauliang.github.io/_next/
cp -rf out/ gauliang.github.io/

cd gauliang.github.io/
git checkout master
git add -f .
git commit -m "Rebuilding site $(date)"
git push origin master

cd ..
git add .
git commit -m "Rebuilding site $(date)"
git push origin master