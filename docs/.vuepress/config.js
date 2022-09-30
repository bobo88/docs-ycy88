const { getChildren } = require('./utils/autoSidebar');
const BASE_PATH = './docs'

module.exports = {
    title: '袁波',
    description: '技术清单文档',
    head: [
        ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/favicon.ico` }]
    ],
    themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: '算法Leetcode', link: '/leetcode/' },
          { text: '园博吧', link: 'http://ycy88.com' },
        ],
        sidebar: [
            {
                title: 'VUE',
                path: '/vue/',
                collapsable: false,
                sidebarDepth: 2,
                children: getChildren(BASE_PATH + '/vue/')
            },
            {
                title: 'React', 
                path: '/react/', 
                collapsable: false,
                sidebarDepth: 2,
                children: getChildren(BASE_PATH + '/react/')
            },
            {
                title: 'Node',   // 必要的
                path: '/node/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: getChildren(BASE_PATH + '/node/')
            },
            {
                title: 'Typescript',
                path: '/ts/',
                collapsable: false,
                sidebarDepth: 2,
                children: getChildren(BASE_PATH + '/ts/')
            },
            {
                title: '技术清单',
                path: '/tech-list/',
                collapsable: false,
                sidebarDepth: 2,
                children: getChildren(BASE_PATH + '/tech-list/')
            },
            {
                title: '工具类',
                path: '/tools/',
                collapsable: false,
                sidebarDepth: 2,
                children: getChildren(BASE_PATH + '/tools/')
            },
            {
                title: '算法',
                path: '/leetcode/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: getChildren(BASE_PATH + '/leetcode/')
            },
        ]
    },
    markdown: {
        lineNumbers: true,
    },
    configureWebpack: {
        resolve: {
          alias: {
            '@': '../.vuepress/images'
          }
        }
    }
}