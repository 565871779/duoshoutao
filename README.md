# duoshoutao
基于Vue + EXpress的电商APP
> * 基于Vue + EXpress + MySql的电商APP
> * 客户端基本功能包括浏览商品、搜索商品、查看商品详情、购买商品、添加到购物车等。
> * 管理后台包括了商家对商品、店铺、订单的管理，以及管理员对商家和店铺的管理


# 项目运行
## 环境：
> nodejs(在nodejs官网http://nodejs.cn/download/中下载安装)

> MySql 5.6(在https://dev.mysql.com/downloads/mysql/5.6.html中下载，然后根据https://blog.csdn.net/qq_33028695/article/details/80489655中的步骤安装)。安装成功后打开SQLyog软件，将数据库文件duoshoutao.sql导入到计算机

> 浏览器：除ie外的所有主流浏览器（推荐chrome），在浏览客户端时需要按F12进入控制台后按下ctrl + shift + m进入手机调试模式后才能正常浏览（推荐机型选择iPhone 6/7/8 plus）


## 运行步骤
> git clone git@github.com:565871779/duoshoutao.git (如果没有安装GIT也可以在https://github.com/565871779/duoshoutao中直接下载压缩包解压) 

> 以下命令均在window系统的cmd环境下运行

> 在duoshoutao_server中打开cmd窗口，然后运行命令npm install安装所需依赖，在安装完成后运行命令node app.js启动服务器

> 在duoshoutao_vue中打开cmd窗口，然后运行命令npm install安装所需依赖，在安装完成后运行命令npm run dev启动客户端

> 在duoshoutao_admin中打开cmd窗口，然后运行命令npm install安装所需依赖，在安装完成后运行命令npm run dev启动后端管理

------
在各部分均成功启动后，访问http://localhost:8080/home 可进入到客户端首页；
访问http://localhost:8081/login 可进入到后端管理系统。
在后端管理系统中测试商家的用户名为a123456，密码为a123456。测试的管理员用户名为admin，密码为admin
