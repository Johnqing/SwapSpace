书籍资源线下交换系统
=========

> 这是一个基于nodejs，来生成相关读书信息的系统

## 如何添加资源 ?

1. 推荐使用数据添加系统
```
node add.js
```
打开`http://127.0.0.1:1337/`,添加相关信息
2. 新建一个Issue, 格式如下
```
贡献者: xx
书籍名称: xx
豆瓣图书地址: xx
```
3. 运行`node build.js`生成文件
