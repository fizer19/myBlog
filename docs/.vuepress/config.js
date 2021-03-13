const nav = require('./config/nav.js')
// const vssue = require('./config/vssue.js')
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
    'vuepress-plugin-comment':
      {
        choosen: 'valine', 
        // options选项中的所有参数，会传给Valine的配置
        options: {
          el: '#valine-vuepress-comment',
          appId: 'DkvmU0QRlpFCowVusMta5dKI-gzGzoHsz',
          appKey: 'LPW4MC1tpFdyvrIvXH9l8ojQ',
          visitor: true,
          enableQQ: true,
          placeholder: '想说点什么吗？',
        }
      },

    // '@vssue/vuepress-plugin-vssue': vssue,
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