const nav = require('./config/nav.js')
const vssue = require('./config/vssue.js')
const moment = require('moment');
moment.locale("zh-cn");
module.exports = {
  base: "/myBlog/",
  title: "fizer的个人博客-分享技术记录生活",
  description: "个人博客，技术和教程分享，偶尔写写随笔",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: 'fizer' }],
    ['meta', { name: 'keywords', content: 'vuepress 介绍，fizer的个人博客' }],
  ],
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