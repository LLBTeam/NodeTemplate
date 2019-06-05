# Node-Template
Node template project

## 服务端启动
``` shell
npm i
npm run start
```

## 客户端打包
我们需要先提前安装hey-cli

``` shell
npm i -g hey-cli
```

``` shell
cd public
npm i
hey dev
```

## 服务端说明

### 服务端文件结构

### 全局Config

config 文件

### 全局await async

### 统一返回结构

成功返回
``` javascript
{
  code: 1,
  body: data,
  meta
}
```

失败返回
``` javascript
{
  code: 0,
  msg
}
```


### 全局报错的处理

异步报错处理

### Router, Dao 定义与分层


### 数据库调用

#### 正常使用mysql2处理数据

#### 事务的处理