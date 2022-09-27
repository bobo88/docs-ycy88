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
                title: 'VUE',
                path: '/vue/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    ['/vue/初探VUE', '初探VUE']
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

        // sidebar: {
        //     '/': [
        //         '',
        //     ],
        //     '/foo/': [
        //         '',
        //         'one',
        //         'two'
        //     ],
        // }

        // sidebar: [
        //     '/foo',
        //     '/foo/one',
        //     '/foo/two',
        // ]
    },
    configureWebpack: {
        resolve: {
          alias: {
            '@alias': 'path/to/some/dir'
          }
        }
    }
}