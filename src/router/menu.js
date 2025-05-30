export default [
  {
    path: "/storage",
    name: "storage",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "多模态数据区块链存储子系统",
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
      {
        path: "multinodes",
        name: "multinodes",
        component: () => import("@/views/MultiNodes.vue"),
        meta: {
          title: "多种类节点轻量化存储",
        },
      },
    ]
  },
];
