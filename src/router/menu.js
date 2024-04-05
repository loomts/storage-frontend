export default [
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "海量多模态数据管理系统",
    },
    children: [
      {
        path: "mixedchain",
        name: "mixedchain",
        component: () => import("@/views/MixedChain.vue"),
        meta: {
          title: "协同存储",
        },
      },
      {
        path: "offchain",
        name: "offchain",
        component: () => import("@/views/OffChain.vue"),
        meta: {
          title: "链下文件存储",
        },
      },
      {
        path: "onchain",
        name: "onchain",
        component: () => import("@/views/OnChain.vue"),
        meta: {
          title: "链上键值存储",
        },
      },
    ]
  },
];
