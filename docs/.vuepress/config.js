const { getChildren } = require('./utils/autoSidebar');
const BASE_PATH = './docs'

module.exports = {
    title: '袁波',
    description: '技术清单文档',
    themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
        //   { text: 'Guide', link: '/guide/' },
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
                children: [
                    ['/react/初探React', '初探React'],
                    ['/react/React清单之生命周期', 'React清单之生命周期'],
                ]
            },
            {
                title: 'Node',   // 必要的
                path: '/node/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    ['/node/初探Node', '初探Node'],
                ]
            },
            {
                title: '算法',
                path: '/leetcode/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: getChildren(BASE_PATH + '/leetcode/')
            },
        ]
    },
    configureWebpack: {
        resolve: {
          alias: {
            '@alias': 'path/to/some/dir'
          }
        }
    }
}