---
title: webpack更多配置

categories: 前端
description: 除了简单的将各种资源打包，还有压缩优化兼容性处理等配置。
url: https://s3.ax1x.com/2021/03/10/6GDMTO.png
author: 梨先生
time: "2021-02-02"
---

### 1. devServer

&emsp;&emsp;开发服务器 devServer:用来自动化（自动编译，自动打开浏览器，自动刷新浏览器)

特点：只会在内存中编译打包，不会有任何输出，一但终止，会删除，不会留下东西，相当于为webpack提前测试。

安装：

```shell
npm i webpack-dev-serve -D
```
配置：
```js
devServer: {
    //构建后的路径
    contentBase: resolve(__dirname,'build'),
    //启动gzip压缩
    compress: true,
    //端口号
    port: 3000,
    //自动打开浏览器
    open: true
}
```

启动服务器：
```shell
npx webpack-dev-server
```
webpack5指令为 

```shell
npx webpack server
```
### 2. 提取css成单独文件

&emsp;&emsp;当文件体积过大时，势必影响加载速度，默认情况下，css文件合并到了js文件中。要将css文件提取出来，可以使用一个插件`mini-css-extract-plugin`，先下载包，loader和插件分别需要配置。

```js
use: [
    //这个loader取代style-loader，作用：提取js中的css成单独文件
    MiniCssExtractPlugin.loader,
    'css-loader'
]
```
plugins中：
```js
new MiniCssExtractPlugin({
    // 对输出的css重命名
    filename: 'css/built.css'
})
    
```

### 3. css兼容性处理

&emsp;&emsp;不同浏览器厂商有些实验性或专属的值，不同版本对css某些属性的支持程度也不同，所以，css兼容性处理非常有必要。
首先在package.json中配置browserslist。

```json
"browserslist": {
    "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
    ],
    "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
    ]
}
```
这里用到两个包`postcss-loader postcss-preset-env`，做如下配置：

```js
rules: [
    {
        test: /\.css$/,
        use: [

            MiniCssExtractPlugin.loader,
            'css-loader',
            //如果使用默认配置，只需要添加'postcss-loader'
            //'postcss-loader',

            //修改loader配置
            {
                loader:'postcss-loader'
            }
            /*修改loader的配置,需要新建postcss.config.js文件，内容                   
            module.exports = {
                plugins: [
                    require('postcss-preset-env')
                ]
            }
                */
            
        ]
    }

]
```

### 4. css压缩

 下载插件 `optimize-css-assets-webpack-plugin`

引入
```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
```

plugins中创建
```js
new OptimizeCssAssetsWebpackPlugin()
```

### 5. eslint语法检查

&emsp;&emsp;不同开发者都有自己的编程习惯，如果是在多人协作开发中，每个人的代码风格不一致会带来一些阅读上的麻烦。代码遵循一个共同的规范，那么多人协作的时候会轻松许多。eslint正是这样一种帮助规范代码的工具。

&emsp;&emsp;下载包： `eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import`。airbnb风格，是一种比较流行的代码规范，我们使用airbnb风格来规范js代码。

packge.json中eslintConfig中设置

```json
"eslintConfig": {
    "extends": "airbnb-base"
}
```

loader配置：

```js
rules: [
    {
        test: /\.js$/,
        exclude: /node_modules/, //只检查自己的代码，不检查第三方库
        loader: 'eslint-loader',
        options: {}
    }
]
```
### 6. js兼容性处理

&emsp;&emsp;有些浏览器不支持es6语法，需要降级处理。使用到的包 `babel-loader @babel/core`。如果制作基本的js兼容性处理，可以只使用`@babel/preset-env`，但是高级语法如promise就不能做兼容性处理了，所以我们还需使用core-js

```js
{
    test: /\.js/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        //预设：指示babel做怎样的兼容性处理
        presets: [
            [
            '@babel/preset-env',
            {
                //按需加载
                useBuiltIns: 'usage',
                //指定core-js版本
                corejs: {
                    version: 3
                },
                targets: {
                    chrome: '60',
                    firefox: '60',
                    ie: '9',
                    safari: '10',
                    edge: '17'
                }
            }
            ]
        ]
    }
}
```
