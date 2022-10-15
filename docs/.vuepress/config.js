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
            { text: '前端工程化', link: '/tools/' },
            { 
                text: '前端框架系', 
                items: [
                    { text: 'VUE 系列', link: '/vue/' },
                    { text: 'React 系列', link: '/react/' },
                    { text: 'Typescript 系列', link: '/ts/' },
                    { text: 'Node 系列', link: '/node/' },
                    { text: '算法Leetcode', link: '/leetcode/' },
                ]
            },
            { text: '技术清单', link: '/tech-list/' },
            { text: '园博吧', link: 'http://ycy88.com' },
        ],
        sidebar: {
            '/vue/': [
                {
                    title: 'VUE系列',
                    path: '/vue/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: getChildren(BASE_PATH + '/vue/')
                },
            ],
            '/react/': [
                {
                    title: 'React系列',
                    path: '/react/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: getChildren(BASE_PATH + '/react/')
                },
            ],
            '/ts/': [
                {
                    title: 'Typescript系列',
                    path: '/ts/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: getChildren(BASE_PATH + '/ts/')
                },
            ],
            '/node/': [
                {
                    title: 'Node系列',
                    path: '/node/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: getChildren(BASE_PATH + '/node/')
                },
            ],
            '/tech-list/': [
                {
                    title: '技术清单',
                    path: '/tech-list/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: getChildren(BASE_PATH + '/tech-list/')
                },
            ],
            '/tools/': [
                {
                    title: '前端工程化',
                    path: '/tools/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: getChildren(BASE_PATH + '/tools/')
                },
            ],
            '/leetcode/': [
                {
                    title: '算法Leetcode',
                    path: '/leetcode/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: getChildren(BASE_PATH + '/leetcode/')
                },
            ],
        },
    },
    markdown: {
        lineNumbers: true,
    },
    configureWebpack: {
        resolve: {
          alias: {
            '@': '../.vuepress/images',
            '~': './.vuepress/images',
          }
        }
    }
}