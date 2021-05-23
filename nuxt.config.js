module.exports = {
  router: {
    linkActiveClass: "active",
    extendRoutes(routes, resolve) {
      //清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0);
      //添加自己的路由规则
      //...展开数组
      routes.push(
        ...[
          {
            path: "/",
            component: resolve(__dirname, "pages/layout/"),
            children: [
              {
                path: "", //默认子路由
                name: "home",
                component: resolve(__dirname, "pages/home/"),
              },
              {
                path: "/login",
                name: "login",
                component: resolve(__dirname, "pages/login/"),
              },
              {
                path: "/register",
                name: "register",
                component: resolve(__dirname, "pages/login/"),
              },
              {
                path: "/profile/:username",
                name: "profile",
                component: resolve(__dirname, "pages/profile/"),
              },
              {
                path: "/settings",
                name: "settings",
                component: resolve(__dirname, "pages/settings/"),
              },
              {
                path: "/editor",
                name: "editor",
                component: resolve(__dirname, "pages/editor/"),
              },
              {
                path: "/article/:slug",
                name: "article",
                component: resolve(__dirname, "pages/article/"),
              },
            ],
          },
        ]
      );
    },
  },
  // server: {
  //   //设置成这个就可以监听所有的网卡地址,外网就可以访问
  //   host: "0.0.0.0",
  //   port: 3000,
  // },
  //注册插件
  plugins: ["~/plugins/request.js", "~/plugins/dayjs.js"],
};
