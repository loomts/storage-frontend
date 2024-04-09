<template>
  <amis-renderer :schema="schema" />
</template>

<script>
import AMISRenderer from "@/components/AMISRenderer";

export default {
  name: "FileOperation",
  components: {
    "amis-renderer": AMISRenderer,
  },
  data: () => ({
    schema: {
      type: "page",
      title: "链上链下协同存储",
      body: [
        {
          type: "html",
          html: `
            <h2>链上链下协同存储：根据多模态数据内容，提取其特征、元数据、校验数据；将原始数据存储于链下分布式存储系统（Ceph），将特征等数据上链（Tendermint）。</h2>
            <div style='width: 100%; text-align:center;'>
              <img src='mixed-intro.png' style='width:100%;' />
            </div>
            <br>
            <br>
          `
        },
        {
          "type": "form",
          "title": "上传",
          "api": {
            "method": "post",
            "dataType": "form-data",
            "url": "http://10.68.104.103:8090/api/coStorage",
            "data": {
              "file": "${file}"
            },
            responseData: {
              id: "${id}"
            }
          },
          "body": [
            {
              "type": "list-select",
              "name": "select",
              "label": "文件类型",
              "clearable": true,
              "options": [
                {
                  "label": "数值",
                  "value": "number"
                },
                {
                  "label": "文本",
                  "value": "text"
                },
                {
                  "label": "序列",
                  "value": "sequence"
                },
                {
                  "label": "视频",
                  "value": "vedio"
                }
              ]
            },
            {
              "type": "input-file",
              "name": "file",
              "accept": "*",
              "maxSize": 1048576000, // 例如最大 1000MB
              "asBlob": true
            },
            {
              type: "static",
              name: "id",
              label: "文件ID",
            },
          ],
        },
        {
          type: "form",
          title: "下载",
          controls: [
            {
              type: "text",
              name: "id",
              label: "文件ID",
              required: true
            },
            {
              type: "button",
              label: "下载文件",
              actionType: "download",
              api: "get:http://10.68.104.103:8090/api/coDownload?id=${id}",
            }
          ]
        },
        {
          type: "crud",
          name: "fileList",
          label: "文件列表",
          api: "get:http://10.68.104.103:8090/api/listObjects",
          columns: [
            {
              name: "id",
              label: "文件ID"
            },
            {
              name: "size",
              label: "文件大小"
            },
            {
              name: "last_modified",
              label: "最后修改时间"
            },
            {
              name: "etag",
              label: "ETag"
            },
            {
              name: "storage_class",
              label: "存储类别"
            },
            {
              name: "metadata",
              label: "元数据",
              type: "json" // 如果元数据是一个JSON对象，你可能需要设置列的类型为"json"
            }
          ],
          autoLoad: true // 页面加载时自动载入数据
        },
      ],
    },
  }),
};
</script>

<style scoped>
.mid-image {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  margin-bottom: 20px;
  margin-left: 120px;
}
</style>