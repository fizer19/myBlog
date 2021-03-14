---
title: valine博客评论系统

categories: 教程
description: 记录valine使用方法。
author: 梨先生
time: "2021-03-11"
---

&emsp;&emsp;既然是知识技术的分享，那必须得有个评论功能，要不然就像一个人自娱自乐似的，哈哈。valine，一款快速、简洁且高效的无后端评论系统。多款博客系统都支持使用valine，而且使用方法也简单。

### 开始使用
更详细教程请移步[Valine](https://valine.js.org/)

请先[登录](https://console.leancloud.cn/apps)或注册 LeanCloud, 进入控制台后点击左下角创建应用：
![pic](https://i.loli.net/2019/06/21/5d0c995c86fac81746.jpg)

应用创建好以后，进入刚刚创建的应用，选择左下角的设置>应用Key，然后就能看到你的APP ID和APP Key了：

![key](https://i.loli.net/2019/06/21/5d0c997a60baa24436.jpg)

这里只介绍vuepress使用。

安装插件

```
yarn add vuepress-plugin-comment -D
```

接着在`.vuepress/config.js中配置插件项

```js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-comment',
      {
        choosen: 'valine', 
        // options选项中的所有参数，会传给Valine的配置
        options: {
          el: '#valine-vuepress-comment',
          appId: 'Your own appId',
          appKey: 'Your own appKey'
        }
      }
    ]
  ]
}
```
如果使用对象形式

```js
plugins: {
    'vuepress-plugin-comment':
    {
    choosen: 'valine', 
    // options选项中的所有参数，会传给Valine的配置
    options: {
        el: '#valine-vuepress-comment',
        appId: '',
        appKey: ''       
    }
    },
}

```
当然，还可以有更多[配置项](https://valine.js.org/configuration.html)，如placeholder，头像等等。

这里有一个坑，在本地开发模式下运行没有问题，但是打包部署的时候会报一个错误：

`Reason: ReferenceError: window is not defined`

看到这个window，有点眼熟，这是不是eslint语法校验的时候，不认识window、navigator等全局变量吗？

于是，在package.json中做以下配置，让eslint能处理window变量：

```js
"eslintConfig": {
    "env": {
        "browser": true
    }
}
```

果不其然，不报错了。

默认的评论组件样式上可能存在问题，右键检查元素，找到对应的元素类名，在`.vuepress/theme/styles/index.styl`内修改样式，直接在布局组件`Layout.vue`中修改的话，可能无效，因为优先级不够。

管理评论的话，登录LeanCloud，进入应用，找到`存储/结构化数据/Comment`，这里就是评论了，没有Comment的话，创建一个即可。












