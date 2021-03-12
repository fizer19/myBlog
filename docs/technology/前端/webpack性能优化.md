---
title: webpack性能优化

categories: 前端
description: webpack性能优化
author: 梨先生
time: "2021-02-03"
---

### 1. source-map

&emsp;&emsp;一种提供源代码到构建后代码映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误）

只需要在`webpack.config.js`中配置即可

```js
devtool: 'source-map'
```
source-map还可以带上前缀，表示不同的方式

* inline-source-map: 内联，只生成一个内联source-map，错误代码的准确信息和源代码错误位置
* eval-source-map: 内联，每一个文件都生成对应的source-map，都在eval中，错误代码的准确信息和源代码错误位置
* hidden-source-map：外部，错误代码错误原因，但是只能定位到构建后代码错误的位置
* nosources-source-map：外部,错误代码的准确信息但是没有任何源代码，和hidden一样用于隐藏源代码
* cheap-source-map：外部,错误代码的准确信息和源代码错误位置，只能精确到行
* cheap-module-source-map: 外部，错误代码的准确信息和源代码错误位置，module会将loader的source-map加入

内联和外部区别： 外部生成了文件，内联没有，内联构建速度更快

那么如何选择呢？

开发环境需要速度快，调试更友好

        速度快(eval>inline>cheap>...) 
            eval-cheap-source-map
            eval-source-map
        调试更友好
            source-map
            cheap-module-source-map
            cheap-source-map
            推荐使用-->eval-source-map(脚手架默认使用方式)

生产环境，源代码要不要隐藏，调试要不要更友好，内联会让代码体积变大，所以生产环境不用内联。

        nosources-source-map 全部隐藏
        hidden-source-map 隐藏源代码，会提示构建后代码错误信息
        推荐使用--> source-map / cheap-moudle-source-map

### 2. oneOf （生产环境性能优化）

&emsp;&emsp;每个文件在配置loader中只会匹配一个，比如css文件匹配到了.css 的loader就不会再匹配后面的loader。

```js
{
    oneOf: [
        {
            test: /\.css/,
            use: [...commonCssLoader]
        },
        {
            test: /\.less/,
            use: [
                ...commonCssLoader,
                'less-loader'
            ]
        },
        //...
    ]
}

```

> 需要注意的是，不能有两个配置处理同一个类型文件，不会执行后面那个配置，所以需要单独提取到oneOf外部

当一个文件要被多个loader处理，一定要指定loader执行的顺序，先执行eslint再执行babel
```js
//语法校验
{
    test: /\.js$/,
    exclude: /node_modules/,
    //优先执行
    enforce: 'pre',
    loader: 'eslint-loader',
    options: {
        fix: true
    }
},
```
### 3. 缓存

缓存有babel缓存和文件资源缓存。

(1) babel缓存：在babel配置中 cacheDirectory: true

```js
//开启babel缓存，第二次构建时会读取之前的缓存
cacheDirectory: true
```

(2) 文件资源缓存：服务器对资源进行缓存处理，用户第二次访问速度会更快。

&emsp;&emsp;只对资源做缓存处理会带来一个问题，如果资源更新，用户访问到的还是之前的缓存。这是应为重新打包后文件名称没有变，所以加载的还是之前的缓存。所以得在输出文件的名字上做点手脚，文件名用上hash值。

**hash：** 每次webpack构建时会生成一个唯一的hash值
```js
output: {
    filename: 'js/built.[hash:10].js',
    path: resolve(__dirname, 'build')
},
    new MiniCssExtractPlugin({
    filename: 'css/built.[hash:10].css'
}),
```
 > 问题：因为js和css同时使用一个hash值，所以重新打包会导致所有缓存失效（即使只改变了一个文件）

**chunkhash：** 还有一个hash值，chunkhash，根据chunk生成的hash值，如果打包资源来自同一个chunk，hash值就一样。chunkhash也有问题：js和css的hash还是同一个，因为css是在js中引入的，同属于一个chunk。
  
**contenthash：** 根据文件的内容生成hash值，不同文件的hash值一定不一样，也就是说，哪个文件被修改了，该文件打包后输出的名字也会改变。


```js
output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build')
},
```
最终的解决方案：contenthash。

### 4. code split 代码分割

&emsp;&emsp;不同的文件，不做配置时可能会打包成一个chunk，导致请求文件体积太大，影响相应速度。所以需要将不同模块分割成单独的chunk，可以从一下方式入手：

多入口
```js
entry: {
    //多入口: 一个入口对应输出一个bundle  一般应用于多页面应用
    index: './src/js/index.js',//这里的值也可以是数组或对象，数组方式只会形成一个chunk
    test: './src/js/test.js'
},
```
配置：

```js
/* 
    1.可以将node_modules中引入的代码单独打包成一个chunk最终输出
    2. 多入口中，自动分析有没有公共文件，如果有会打包成一个单独的chunk
*/
optimization: {
    splitChunks: {
        chunks: 'all'
    }
},
```

动态引入：

```js
/* 
  通过js代码，让某个文件被单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包
*/
//webpackChunkName: 'test' 打包文件命名
import(/* webpackChunkName: 'test' */'./test')
  .then(({mul,count}) => {
    //文件加载成功
    // eslint-disable-next-line
    console.log(mul(2,4));
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败');
  })
```
动态引入很懒加载是一样的原理。

* 懒加载: 当文件需要用的时候才被加载
* 预加载：`webpackPrefetch: true`会在使用之前，提前加载js文件，正常加载可以认为是并行加载，暂时不需要的也加载了，影响加载速度，而预加载则是等浏览器空闲了，再偷偷的加载资源
> 预加载兼容性问题大，在移动端和ie有较大兼容性问题

```js
document.getElementById('btn').onclick = function() {
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({mul}) => {
    console.log(mul(3, 4));
  })
}
```

### 5. externals

&emsp;&emsp;忽略通过cdn方式引入的库。

```js
externals: {
 //忽略库名 --npm包名
 //不打包jquery
 jquery: 'jQuery'
}
```

### 6. 多进程打包

包：`thread-loader`

```js
{
    loader: 'thread-loader',
    options: {
        workers: 2 //开启2个进程
    }
},
```
> 进程启动大概600ms，进程通信也有开销，只有工作消耗时间比较长，才需要多进程打包，不能滥用