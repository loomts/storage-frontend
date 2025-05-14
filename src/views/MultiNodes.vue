<template>
  <amis-renderer :schema="schema" ref="amisRenderer" />
</template>

<script>
import AMISRenderer from "@/components/AMISRenderer";

export default {
  components: {
    "amis-renderer": AMISRenderer,
  },
  data: () => ({
    schema: {
      type: "page",
      title: "多种类节点轻量化存储",
      css: {
        ".row": {
          "display": "flex",
          "flex-wrap": "wrap",
          "justify-content": "center",
          "align-items": "center",
        },
        ".col-md-6": {
          "flex": "0 0 50%",
          "max-width": "50%",
        },
        ".btn": {
          display: "block",
          margin: "0 auto",
        }
      },
      body: [
        {
          type: "html",
          html: `
            <h2>多种类节点轻量化存储，展示多种类节点区块高度。</h2>
            <br>
            <br>
          `
        },
        {
          type: "wrapper",
          className: "row",
          body: [
            {
              type: "service",
              name: "ecInfo",
              id: "ecInfo", // 设置名称，用于后面的reload
              className: "col-md-6",
              api: "/api/ecinfo",
              interval: 3000,
              initFetch: false,
              body: [
                {
                  type: "chart",
                  trackExpression: "${nodeBlockNum},${allBlockNum}",
                  config: {
                    title: {
                      text: "纠删码",
                    },
                    xAxis: {
                      type: "category",
                      name: '节点',
                      data: ["0", "1", "2", "3"],
                      axisLabel: {
                        color: '#333',
                        fontSize: 14,
                      },
                    },
                    yAxis: {
                      type: 'value',
                      name: '区块数量',
                    },
                    series: [
                      {
                        data: '${nodeBlockNum || []}',
                        type: 'bar',
                        barWidth: '25%',
                        name: 'Node Block Number',
                      },
                      {
                        data: '${allBlockNum || []}',
                        type: 'bar',
                        barWidth: '25%',
                        name: 'All Block Number',
                      },
                    ],
                  },
                },
                {
                  type: 'button',
                  level: "primary",
                  className: "btn",
                  label: '启动',
                  actionType: 'reload',
                  target: ['ecInfo'],
                },
              ],
            },
            {
              type: "service",
              name: "partitionInfo", // 设置名称，用于后面的reload
              id: "partitionInfo", // 设置名称，用于后面的reload
              className: "col-md-6",
              api: "/api/partitioninfo", // 设置API地址
              interval: 3000, // 设置刷新间隔为3秒
              initFetch: false, // 初始不启动
              body: [
                {
                  type: "chart",
                  trackExpression: "${nodeBlockNum1},${allBlockNum1}",
                  config: {
                    title: {
                      text: "数据分区",
                    },
                    xAxis: {
                      type: "category",
                      name: '节点',
                      data: ["0", "1", "2", "3"],
                      axisLabel: {
                        color: '#333',
                        fontSize: 14,
                      },
                    },
                    yAxis: {
                      type: 'value',
                      name: '区块数量',
                    },
                    series: [
                      {
                        data: '${nodeBlockNum1 || []}', // 节点块数量
                        type: 'bar',
                        barWidth: '25%',
                        itemStyle: {
                          color: '#ff7f50' // 调整柱状图的颜色
                        },
                        name: 'Node Block Number',
                      },
                      {
                        data: '${allBlockNum1 || []}', // 所有块数量
                        type: 'bar',
                        barWidth: '25%',
                        itemStyle: {
                          color: '#87cefa' // 调整柱状图的颜色
                        },
                        name: 'All Block Number',
                      },
                    ],
                  },
                },
                {
                  type: 'button',
                  level: "primary",
                  className: "btn",
                  label: '启动',
                  actionType: 'reload',
                  target: ['partitionInfo'],
                },
              ],
            },
          ],
        },
      ],
    },
  }),
};
</script>

<style scoped></style>
