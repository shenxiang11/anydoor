# wondergate
Node.js Static Web Server

## 安装

```
npm i -g wondergate
```

## 使用方法

```
wondergate # 把当前文件夹作为静态资源服务器根目录

wondergate -p 8080 # 设置端口号为 8080

wondergate -h localhost # 设置host 为 localhost

wondergate -d /usr # 设置跟目录为/usr
```

## Todo
- [x] 【feature】增加显示启动的本地服务的IP地址与二维码
- [ ] 【bug】命令行工具没有打包js
- [ ] 【feature】优化界面