const nav = require('./config/nav.js')
const vssue = require('./config/vssue.js')
const moment = require('moment');
moment.locale("zh-cn");
module.exports = {
  base: "/myBlog/",
  title: "fizer",
  // base: "/myBlog/",
  plugins: {
    '@vuepress/last-updated': {
      transformer: (timestamp) => {
        return moment(timestamp).format('YYYY-MM-DD')
      }
    },
    '@vuepress/back-to-top': true,
    '@vssue/vuepress-plugin-vssue': vssue,
    '@vuepress/blog': true,
    '@vuepress/search': {
      searchMaxSuggestions: 10
    }
     
  },
  
  themeConfig: {
    logo: '/assets/img/avatar.png',
    sidebarDepth: 2,
    lastUpdated: '更新时间',
    
    nav,
    sidebar: 'auto',
    // iconPrefix: ''

  }
}