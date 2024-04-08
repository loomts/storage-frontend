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
          html: "<h2>链上链下协同存储文件：根据多模态文件内容，提取其特征，将文件内容存储到链下（Ceph）的同时将其特征上链（Tendermint）。</h2>"
        },
        {
          type: "html",
          html: "<div style='text-align:center;'><img src='mixed.png' style='width:20%;' /></div>"
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