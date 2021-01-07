const nav = require('./config/nav.js')
const moment = require('moment');
module.exports = {
  title: "fizer",
  // base: "/myBlog/",
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
         
          moment.locale(lang)
          return moment(timestamp).format('YYYY-MM-DD')
        }
      }
    ]
  ],
  themeConfig: {
    logo: '/assets/img/pear.jpg',
    sidebarDepth: 2,
    lastUpdated: '最后更新时间',
    // blogConfig: {
    //   category: {
    //     location: 2,
    //     text: "Category"
    //   },
    //   tag: {
    //     location: 3,
    //     text: "Tag"
    //   }
      
    // },
    nav,
    sidebar: "auto",

  }
}