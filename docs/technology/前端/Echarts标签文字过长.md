---
title: Echarts标签文字过长以及在app端formatter函数失效问题
description: 在微信小程序中使用Echarts，柱状图横坐标标签文字太长解决方案以及formatter回调函数失效。
categories: 前端
url: https://s3.ax1x.com/2021/02/02/yn6g1I.jpg

author: 梨先生

time: "2021-02-1"
---

### Echarts标签文字过长以及在app端formatter函数失效问题

&emsp;&emsp;在使用uniapp写微信小程序时，使用到了echarts，在使用柱状图的时候发现横坐标数据太多的时候标签文字会重叠。


![文字重叠](https://s3.ax1x.com/2021/02/02/ymwu0s.png)

&emsp;&emsp;当然，可以选择旋转文字的方式解决。
```js
axisLabel: {
    rotate: -30,
    show: true,
    interval: 0,
},
```

&emsp;&emsp;但是我想让文字换行，文字过长自动换行显示。开搞，网上的方案是利用formatter回调函数的方式实现。

```js
xAxis: {
    type: "category",
    data: this.xAxisData,
    axisLabel: {
        show: true,
        interval: 0,
        formatter: function (value) {
            var ret = "";//拼接加\n返回的类目项  
            var maxLength = 4;//每项显示文字个数  
            var valLength = value.length;//X轴类目项的文字个数  
            var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
            if (rowN > 1)//如果类目项的文字大于4,  
            {
                for (var i = 0; i < rowN; i++) {
                    var temp = "";//每次截取的字符串  
                    var start = i * maxLength;//开始截取的位置  
                    var end = start + maxLength;//结束截取的位置  
                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                    temp = value.substring(start, end) + "\n";
                    ret += temp; //凭借最终的字符串  
                }
                return ret;
            }
            else {
                return value;
            }
        },
        
    }
}
```
#### formatter函数失效问题

&emsp;&emsp;妙啊！我开心的放在我的小程序代码里后，然而，并没有任何改变。web上没有问题，但是在uniapp微信小程序中不生效。[Github](https://github.com/apache/echarts/pull/8612)上有大佬发现是因为源码配置错误，新版好像也已经解决了这个bug。不过我去echarts官网下载了最新的echarts.js替换了项目中的echarts.js，结果还是一样的，而且还导致了项目中其它图表的样式发生了改变，还是先使用原来的吧。那么怎么样解决呢？

&emsp;&emsp;只需要在setOption之前，手动设置xAxis.axisLabel.formatter = function(value) {...}。问题是，我的项目中是通过标签挂载option的形式配置的，没有setOption。

&emsp;&emsp;不慌，在引入的库文件中修改，我引入的文件中，包含<code>echarts.js,uni-ec-canvas.vue,wx-canvas.js</code>这三个文件，其中<code>uni-ec-canvas.vue</code>就有setOption的一项。

```js
initChart(canvas, width, height, canvasDpr) {
    this.$curChart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: canvasDpr,
    });
    canvas.setChart(this.$curChart);
    
    this.$curChart.setOption(this.ec.option);//here
    this.$emit("inited", this.$curChart);
    return this.$curChart;
},
```
&emsp;&emsp;在setOption之前，手动设置formatter回调函数就可以了。

```js
initChart(canvas, width, height, canvasDpr) {
    this.$curChart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: canvasDpr,
    });
    canvas.setChart(this.$curChart);
    this.ec.option.xAxis.axisLabel.formatter = function (value) {
    var ret = ""; //拼接加\n返回的类目项
    var maxLength = 2; //每项显示文字个数
    var valLength = value.length; //X轴类目项的文字个数
    var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
    if (rowN > 1) {
        //如果类目项的文字大于4,
        for (var i = 0; i < rowN; i++) {
        var temp = ""; //每次截取的字符串
        var start = i * maxLength; //开始截取的位置
        var end = start + maxLength; //结束截取的位置
        //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
        temp = value.substring(start, end) + "\n";
        ret += temp; //凭借最终的字符串
        }
        return ret;
    } else {
        return value;
    }
    };
    this.$curChart.setOption(this.ec.option);
    this.$emit("inited", this.$curChart);
    return this.$curChart;
},
```
&emsp;&emsp;这样就可以了，总的来说，找到源码中setOption的位置，在这之前手动设置formatter的回调函数。

![修改后的结果](https://s3.ax1x.com/2021/02/02/ym56iT.png)

&emsp;&emsp;最后，可能大家在使用的时候都是最新的了，不会有这个问题了，但是，这让我意识到，有时候修改源码，未尝不可。











