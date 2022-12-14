const { getChildren } = require("./utils/autoSidebar");
const BASE_PATH = "./docs";

module.exports = {
  title: "Frontend 技术指南",
  description: "技术清单文档",
  head: [
    [
      "link",
      { rel: "shortcut icon", type: "image/x-icon", href: `/favicon.ico` },
    ],
  ],
  themeConfig: {
    nav: [
      // { text: "前端规范", link: "/frontend/" },
      // { text: "前端工程化", link: "/tools/" },
      {
        text: "前端",
        items: [
          { text: "前端规范", link: "/frontend/" },
          { text: "前端工程化", link: "/tools/" },
          { text: "效率提升", link: "/efficiency/" },
        ],
      },
      {
        text: "前端框架系",
        items: [
          { text: "VUE 系列", link: "/vue/" },
          { text: "React 系列", link: "/react/" },
          { text: "Typescript 系列", link: "/ts/" },
          { text: "Node 系列", link: "/node/" },
          { text: "小程序 系列", link: "/mp/" },
          { text: "算法(Algorithm)", link: "/algorithm/" },
          { text: "算法Leetcode", link: "/leetcode/" },
        ],
      },
      {
        text: "思维训练",
        items: [
          { text: "技术思维", link: "/think/" },
          { text: "管理思维", link: "/mgt/" },
        ],
      },
      {
        text: "技术片段",
        items: [{ text: "技术清单", link: "/tech-list/" }],
      },
      {
        text: "其他链接",
        items: [
          { text: "园博吧", link: "https://ycy88.com" },
          { text: "Github", link: "https://github.com/bobo88" },
        ],
      },
    ],
    sidebar: {
      "/vue/": [
        {
          title: "VUE系列",
          path: "/vue/",
          collapsable: false,
          sidebarDepth: 2,
          children: getChildren(BASE_PATH + "/vue/"),
        },
      ],
      "/react/": [
        {
          title: "React系列",
          path: "/react/",
          collapsable: false,
          sidebarDepth: 2,
          children: getChildren(BASE_PATH + "/react/"),
        },
      ],
      "/ts/": [
        {
          title: "Typescript系列",
          path: "/ts/",
          collapsable: false,
          sidebarDepth: 2,
          children: getChildren(BASE_PATH + "/ts/"),
        },
      ],
      "/node/": [
        {
          title: "Node系列",
          path: "/node/",
          collapsable: false,
          sidebarDepth: 2,
          children: getChildren(BASE_PATH + "/node/"),
        },
      ],
      "/mp/": [
        {
          title: "小程序系列",
          path: "/mp/",
          collapsable: false,
          sidebarDepth: 2,
          children: getChildren(BASE_PATH + "/mp/"),
        },
      ],
      "/tech-list/": [
        {
          title: "技术清单",
          path: "/tech-list/",
          collapsable: false,
          sidebarDepth: 2,
          children: getChildren(BASE_PATH + "/tech-list/"),
        },
      ],
      "/tools/": [
        {
          title: "前端工程化",
          path: "/tools/",
          collapsable: false,
          sidebarDepth: 2,
          children: getChildren(BASE_PATH + "/tools/"),
        },
      ],
      "/algorithm/": [
        {
          title: "算法Algorithm",
          path: "/algorithm/",
          collapsable: false,
          sidebarDepth: 2,
          children: getChildren(BASE_PATH + "/algorithm/"),
        },
      ],
      "/leetcode/": [
        {
          title: "算法Leetcode",
          path: "/leetcode/",
          collapsable: false,
          sidebarDepth: 2,
          children: getChildren(BASE_PATH + "/leetcode/"),
        },
      ],
      "/frontend/": [
        {
          title: "前端规范",
          path: "/frontend/",
          collapsable: false,
          sidebarDepth: 2,
          children: getChildren(BASE_PATH + "/frontend/"),
        },
      ],
      "/think/": [
        {
          title: "技术思维",
          path: "/think/",
          collapsable: false,
          sidebarDepth: 2,
          children: getChildren(BASE_PATH + "/think/"),
        },
      ],
      "/mgt/": [
        {
          title: "管理思维",
          path: "/mgt/",
          collapsable: false,
          sidebarDepth: 2,
          children: getChildren(BASE_PATH + "/mgt/"),
        },
      ],
      "/efficiency/": [
        {
          title: "效率提升",
          path: "/efficiency/",
          collapsable: false,
          sidebarDepth: 2,
          children: getChildren(BASE_PATH + "/efficiency/"),
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
        "@": "../.vuepress/images",
        "~": "./.vuepress/images",
      },
    },
  },
};
