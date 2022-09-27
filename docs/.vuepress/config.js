module.exports = {
    title: '袁波',
    description: '技术清单文档',
    themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },
          { text: 'External', link: 'https://google.com' },
        ],
        sidebar: [
            {
                title: '算法',
                path: '/leetcode/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    ['/leetcode/异或的用法', '异或的用法'],
                    ['/leetcode/异或用法之消消乐', '异或用法之消消乐'],
                    ['/leetcode/选择排序的实现', '选择排序的实现'],
                    ['/leetcode/冒泡排序的实现', '冒泡排序的实现'],
                    ['/leetcode/插入排序的实现', '插入排序的实现'],
                    ['/leetcode/二分法的详解与拓展', '二分法的详解与拓展'],
                ]
            },
            {
                title: 'VUE',
                path: '/vue/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    ['/vue/初探VUE', '初探VUE'],
                    ['/vue/VUE全家桶之Axios', 'VUE全家桶之Axios'],
                    ['/vue/VUE全家桶之Pinia', 'VUE全家桶之Pinia'],
                    ['/vue/VUE全家桶之VUE-Router路由', 'VUE全家桶之VUE-Router路由'],
                    ['/vue/VUE全家桶之Vuex', 'VUE全家桶之Vuex'],
                    ['/vue/VUE全家桶之Nuxt', 'VUE全家桶之Nuxt'],
                    ['/vue/VUE全家桶之ElementUI', 'VUE全家桶之ElementUI'],
                ]
            },
            {
                title: 'React',   // 必要的
                path: '/react/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
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
            }
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