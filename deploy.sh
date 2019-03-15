# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下
cd dist

git add -A
git commit -m 'deploy'

# 部署到 github
git push -f git@yangseas.com:yangseas/admin-system master:gh-pages

cd -