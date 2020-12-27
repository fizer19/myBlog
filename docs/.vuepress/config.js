const nav = require('./config/nav.js')

module.exports = {
  title: "fizer",
  
  themeConfig: {
    logo: '/assets/img/pear.jpg',
    sidebarDepth: 2,
    lastUpdated: '最后更新时间',
    blogConfig: {
      category: {
        location: 2,
        text: "Category"
      },
      tag: {
        location: 3,
        text: "Tag"
      }
      
    },
    nav,
    sidebar: "auto",

  }
}