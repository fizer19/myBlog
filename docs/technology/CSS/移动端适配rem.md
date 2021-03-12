---
title: 移动端rem适配方案
description: rem适配方案技术使用，第一次学的时候一遍学一边哭，搞明白后，白哭了。
categories: css
url: https://s3.ax1x.com/2021/03/10/6G4LDg.png
author: 梨先生
time: "2021-01-29"
---

&emsp;&emsp;使用百分比布局或flex布局在一定程度上都能很好的实现不同屏幕下的适配，但是这两种方式都是高度定死，宽度自适应。那么有没有方法让宽度也做等比例缩放呢？有，rem适配方案入场。

### 相关概念

#### rem

&emsp;&emsp;rem (root em)是一个相对单位，类似于em , em是父元素字体大小。不同的是rem的基准是相对于html元素的字体大小。比如，根元素 ( html)设置font-size=12px,非根元素设置width:2rem;则换成px表示就是24px。

#### 媒体查询

&emsp;&emsp;媒体查询( Media Query )是CSS3新语法。使用@media查询，可以针对不同的媒体类型定义不同的样式@media可以针对不同的屏幕尺寸设置不同的样式。用法主要有：
* link元素的media属性
* style元素的media属性
* @import声明的媒体描述符部分
* @media声明的描述符部分

#### less

&emsp;&emsp;CSS是一门非程序式语言，没有变量、函数、SCOPE(作用域）等概念。所以我们可以使用less，less是一门css扩展语言，它在CSS的语法基础之上，引入了变量，Mixin（混入），运算以及函数等功能，大大简化了CSS的编写，并且降低了CSS的维护成本，就像它的名称所说的那样，Less可以让我们用更少的代码做更多的事情。

### 两种方式使用rem

#### 1. less + rem + 媒体查询

主要思路：

&emsp;&emsp;通过媒体查询的方式，设置不同屏幕尺寸下的html元素字体大小，从而改变rem的值。元素在布局的时候，宽高就以rem作为单位布局，由于rem的值是根据屏幕尺寸变化的，所以也就实现了元素等比例缩放的效果。

&emsp;&emsp;那么，如何设置根元素(html)的字体大小呢？初始的元素尺寸又怎么设置呢？

&emsp;&emsp;首先，我们假设把屏幕划分成15等份，这个份数用来计算rem的值，划分为多少份完全取决于开发者，只需要用同一个份数值计算rem的大小就行。假设当前的设计尺寸为750px，750 / 15 = 50，那么就设置html字体大小为50px，也就是1rem = 50px。

```less
// 750 @no = 15
@media screen and (min-width:750px) {
    html {
        font-size: 750px / @no;
    }
}
```
同样使用媒体查询修改不同屏幕下的html元素字体大小。

```less
// 375 iphone 678
@media screen and (min-width:375px) {
    html {
        font-size: 375px / @no;
    }
}
// 540
@media screen and (min-width:540px) {
    html {
        font-size: 540px / @no;
    }
}
// ...
```

接下来设置元素的初始尺寸了。

&emsp;&emsp;假设在750px设计稿下有一个100px * 100px的元素。在750px屏幕尺寸下的html元素font-size为50px，那么该元素的尺寸为2rem * 2rem，实际大小为100px * 100px。如果是在375px屏幕尺寸下，html元素font-size为25px，那么2rem实际就为50px，元素实际大小为 50px * 50px，实现了等比例缩放的效果。

#### 2. flexible.js + rem 方式

##### flexible.js

&emsp;&emsp;手机淘宝团队出的简洁高效移动端适配库。它的原理是获取当前屏幕宽度，将其划分为10份，作为html字体大小。

```js
// set 1rem = viewWidth / 10
function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
}
```

&emsp;&emsp;引入`flexible.js`，我们不用自己使用媒体查询设置根元素字体大小了，我们要做的，就是确定好我们当前设备的html文字大小就可以了。比如当前设计稿是750px，那么我们只需要把html文字大小设置为75px(750px/10)就可以了。元素尺寸还是同样的设置方法。

flexible.js使用可以从外部引入，或者下载到项目中。

外部引入：

```html
<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>
```
下载地址：

[GitHub地址](https://github.com/amfe/lib-flexible/)



![rem](https://s3.ax1x.com/2021/03/05/6eYlpq.png) 
![rem2](https://s3.ax1x.com/2021/03/05/6eYMhn.png)

