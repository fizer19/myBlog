---
title: webpack资源打包

categories: 前端
description: webpack详细笔记，哪里不会看哪里，看完了的你：妙啊！
url: https://s3.ax1x.com/2021/03/10/6GDMTO.png
author: 梨先生
time: "2021-02-01"
---

&emsp;&emsp;习惯了用脚手架搭建项目，对于一些基础的配置会忘记。就像随着各种各样的工具发明，人们往往忽视了自身的潜力，就比如吉尼斯世界纪录水下憋气最长22分钟，而我不到两分钟。

## 1. webpack概念

&emsp;&emsp;Webpack是一种前端资源构建工具，一个静态模块打包期(module bundler)。开发过程中，为了便于编写代码和资源管理，往往建立起各种文件层级关系，但是浏览器运行代码不需要这种层级关系，它只需要将各种资源建立依赖关系。Webpack就是能够将这些资源压缩精简和优化，从而使项目运行更流畅。整个过程大致为：从入口文件开始，将依赖文件引入形成chunk(块)，将这些文件处理成浏览器能识别的东西就是打包过程，最后形成bundle文件。要了解更详细信息，可访问[webpack官网](https://webpack.docschina.org/)。好的学习方式是，仔细阅读官方文档。

&emsp;&emsp;说到入口文件，这里引出Webpack的5个重要概念，但不限于这5个。

## 2. 5个重要概念

### entry

&emsp;&emsp;入口，指示Webpack以哪个文件为入口起点开始打包，分析构建内部依赖图。`entry: '.src/index.js'`

### output

&emsp;&emsp;输出，指示Webpack打包后的资源bundles输出到哪里去，以及如何命名文件。
```js
 output: {
    //输出文件名
    filename: 'built.js',
    //输出路径
    //__dirname是nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname,'build') //resolve需要引入 const {resolve} = require('path');
},
```

### Loader

&emsp;&emsp;Loader让Webpack能够处理哪些非js文件。
```js
module: {
    rules: [
        //详细loader配置
        {
            //匹配哪些文件
            test: /\.css$/,
            //使用哪些loader进行处理
            //多个loader使用use，单个loader直接：loader: 'css-loader'
            use: [
                //use数组中的loader执行顺序：从右到左，从下到上依次执行
                //创建style标签，将js中的样式资源插入进去，添加到head中生效
                'style-loader',
                //将css文件变成commonjs模块加载到js中，里面内容是样式字符串
                'css-loader'
            ]
        }
    ]
},
```

### Plugins

&emsp;&emsp;插件，可以用于执行范围更广的任务，包括从打包优化和压缩，到重新定义环境中的变量等。

```js
plugins: [
    //需要引入 const HtmlWebpackPlugin = require('html-webpack-plugin');
    //功能：默认会创建一个空的html，自动引入打包输出的所有资源(js/css)
    //需求：需要有结构的html文件
    new HtmlWebpackPlugin({
        //复制./src/index.html 文件，并自动引入打包输出的所有资源(js/css)
        template: './src/index.html'
    })
],
```
### Mode

&emsp;&emsp;用于指定Webpack使用哪种模式的配置，分别为development(开发模式)和production(生产模式)。
```js
mode: 'development'//mode: 'production'
```

## 3. 如何使用

初始化包管理文件

npm init 生成package.json文件

npm i webpack webpack-cli -g 先全局安装

npm i webpack webpack-cli -D 本地安装，会将webpack添加到开发依赖

此时可以通过webpack指令进行简单的打包了
```
webpack ./src/index.js -o ./build/built.js --mode=development
```

webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
整体打包环境，是开发环境。

```
webpack ./src/index.js -o ./build/built.js --mode=production
```
webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js 整体打包环境，是生产环境。

一个项目会的文件结构比较复杂，所以需要一个配置文件来指示webpack干哪些活。

项目根目录下新建 `webpack.config.js`配置文件

先写上基本的配置，然后按实际需求配置文件。

```js
// resolve用来拼接绝对路径的方法
const {resolve} = require('path');
 module.exports = {
    //  webpack配置
    //入口起点
    entry: '.src/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'built.js',
        //输出路径
        //__dirname是nodejs的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname,'build')
    },
    // loader的配置
    module: {
        rules: [
            //详细loader配置
            
        ]
    },
    //plugins的配置
    plugins: [
        //详细plugins的配置
    ],
    //模式
    mode: 'development',
    // mode: 'production'
 }
```
无论是loader还是plugins，首先都是要下载对应的包。

### 3.1 打包css/less文件

下载css-loader style-loader
```
npm i css-loader style-loader -D
```

```js
// loader的配置
module: {
    rules: [
        //详细loader配置
        {
            //匹配哪些文件
            test: /\.css$/,
            //使用哪些loader进行处理
            use: [
                //use数组中的loader执行顺序：从右到左，从下到上依次执行
                //创建style标签，将js中的样式资源插入进去，添加到head中生效
                'style-loader',
                //将css文件变成commonjs模块加载到js中，里面内容是样式字符串
                'css-loader'
            ]
        }
    ]
},
```
配置好后直接输入命令`webpack`就行了

配置less资源,下载less  和 less-loader
```
npm i  less less-loader -D  
```
```js
{
    test: /\.less$/,
    //要使用多个loader用use，单个直接loader：‘’
    use: [
        'style-loader',
        'css-loader',
        'less-loader'
    ]
},
```
### 3.2 打包HTML资源
下载插件：
```
npm i html-webpack-plugin -D
```
引入：
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
```
配置：

```js
plugins: [
    //html-webpack-plugin
    //功能：默认会创建一个空的html，自动引入打包输出的所有资源(js/css)
    //需求：需要有结构的html文件
    new HtmlWebpackPlugin({
        //复制./src/index.html 文件，并自动引入打包输出的所有资源(js/css)
        template: './src/index.html'
    })
],
```

### 3.3 打包图片资源

使用url-loader 处理通过url引入的图片，html-loader处理img插入图片

下载包 `url-loader  file-loader  html-loader`

```js
{
    //默认处理不了html中的img图片
    test: /\.(jpg|png|gif)$/,
    //下载url-loader  file-loader，url-loader依赖于file-loader
    loader: 'url-loader',
    options: {
        //图片大小小于10kb，就会被base64处理
        //优点：减少请求数量（减轻服务器压力）
        //缺点：图片体积会更大（文件请求速度更慢）
        limit: 10 * 1024，
        
        //给图片重命名
        // [hash:10]取图片hash的前10位
        //[ext]取文件原来的扩展名
        name: '[hash:10].[ext]',
        outputPath: 'imgs',//打包目录
    }

},
{
    test:/\.html$/,
    //负责html文件的img图片（引入img，从而能被url-loader进行处理
    loader: 'html-loader'
}
```

### 3.4 打包其它资源

```js
 //打包其它资源
{
    //排除（css|js|html）资源，打包其它资源
    exclude: /\.(css|js|html|png|jpg|gif)$/,
    loader:'file-loader'
}
```

