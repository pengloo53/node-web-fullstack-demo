# 后台管理系统入门 Demo

涉及的功能点：

1. 登录功能（支持邮箱、用户名两种登录方式）
2. 验证码登录，采用腾讯的验证码
3. 登录密码加密存储，MD5 加密
4. 后台首页
5. 在线表格
6. 查询功能
7. 批量上传功能
8. ......


### 启动项目
1. 打开命令行，进入项目目录，
2. 命令行，运行 `npm i` 安装依赖（前提是你已经安装了 node）
2. 命令行，运行 `bower i` 安装依赖（前提是你已经安装了 bower 包管理器）
2. 在 db/config 目录中，新建配置文件 `dev.js`
3. 配置文件 `dev.js` 的内容，复制自 `default.js`，修改其中 Mysql 的配置（前提是已经在本地准备好了数据库）
4. 命令行，运行 `npm run resetdb` 初始化数据库表，然后退出命令行
5. 命令行，运行 `npm run init` 新建管理员账号，然后退出命令行
6. 命令行，运行 `npm run dev` 启动项目
7. 浏览器，打开网址 `http://localhost:8080`，账号：90byte，密码：admin


### 页面展示

#### 登录页

![](./public/images/readme/login.jpg)

#### 后台首页

![](./public/images/readme/index.jpg)

#### 表格页

![](./public/images/readme/table.jpg)

#### 添加页

![](./public/images/readme/add.jpg)
