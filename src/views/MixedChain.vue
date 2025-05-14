<template>
  <amis-renderer :schema="schema" />
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
      title: "链上链下协同存储",
      body: [
        {
          type: "html",
          html: `
            <h2>链上链下协同存储：根据多模态数据内容，提取其特征、元数据、校验数据；将原始数据存储于链下分布式存储系统（Ceph），将特征等数据上链（Tendermint）。</h2>
            <div style='width: 100%; overflow-x: auto; text-align:center;'>
              <img src='mixed-intro.png' style='height:330px; width: auto;' />
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
            "url": "/api/costorage",
            "data": {
              "file": "${file}",
              "filetype": "${select}",
              "exMethod": "${exMethod}",
              "onChainType": "${chainStorage}",
              "offChainType": "${offchainStorage}"
            },
            "requestAdaptor": "if (!api.data.exMethod) { api.data.exMethod = 'Hash'; } return api;", // 确保exMethod不为空
            responseData: {
              id: "${id}"
            }
          },
          "body": [
            {
              "type": "select",
              "name": "chainStorage",
              "label": "链上存储",
              "value": "tendermint",
              "options": [
                {
                  "label": "Tendermint",
                  "value": "tendermint"
                }
              ]
            },
            {
              "type": "select",
              "name": "offchainStorage",
              "label": "链下存储",
              "value": "ceph",
              "options": [
                {
                  "label": "Ceph S3",
                  "value": "ceph"
                },
                {
                  "label": "IPFS",
                  "value": "ipfs"
                }
              ]
            },
            {
              "type": "select",
              "name": "select",
              "label": "文件类型",
              "required": true,
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
                  "label": "图像",
                  "value": "image"
                },
                {
                  "label": "序列",
                  "value": "sequence"
                },
                {
                  "label": "视频",
                  "value": "video" // 注意：保持拼写为"video"以与后端API保持一致，虽然正确拼写应为"video"
                }
              ]
            },
            {
              "type": "select",
              "name": "exMethod",
              "label": "特征提取方法",
              "value": "Hash",
              "visibleOn": "${select != null && select != ''}",
              "required": true,
              "clearable": false,
              "selectMode": "single",
              "source": {
                "method": "static",
                "data": {
                  "number": [
                    { "label": "数字字符串", "value": "NumberStr" },
                    { "label": "哈希", "value": "Hash" },
                    { "label": "默认", "value": "Default" }
                  ],
                  "text": [
                    { "label": "哈希", "value": "Hash" },
                    { "label": "词袋模型", "value": "WordBagModel" }
                  ],
                  "image": [
                    { "label": "哈希", "value": "Hash" },
                    { "label": "SIFT特征", "value": "SIFT" }
                  ],
                  "sequence": [
                    { "label": "哈希", "value": "Hash" },
                    { "label": "序列统计", "value": "SequenceStatistics" },
                    { "label": "序列默认", "value": "SequenceDefault" }
                  ],
                  "video": [
                    { "label": "哈希", "value": "Hash" },
                    { "label": "帧特征Base64", "value": "FrameFeatureBase64" }
                  ]
                },
                "responseData": {
                  "options": "${source[select] || [{label: '哈希', value: 'Hash'}]}"
                }
              },
              "description": "请选择适合当前文件类型的特征提取方法"
            },
            {
              "type": "input-file",
              "name": "file",
              "label": "上传文件",
              "accept": "*",
              "maxSize": 1048576000, // 最大 1000MB
              "asBlob": true,
              "description": "请先选择文件类型和特征提取方法，然后选择要上传的文件",
              "multiple": false,
              "useChunk": true,
              "chunkSize": 5242880, // 5MB分片
              "autoUpload": false
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
              api: "get:/api/codownload?id=${id}",
            }
          ]
        },
        {
          type: "crud",
          name: "fileList",
          label: "文件列表",
          api: "get:/api/colist",
          columns: [
            {
              name: "object_id",
              label: "文件ID"
            },
            {
              name: "size",
              label: "文件大小",
              type: "number",
              unitOptions: [
                { value: 1, label: "B" },
                { value: 1024, label: "KB" },
                { value: 1048576, label: "MB" }
              ]
            },
            {
              name: "name",
              label: "文件名",
              type: "text"
            },
            {
              name: "hash",
              label: "哈希值",
              type: "text",
              remark: "文件的哈希值"
            },
            {
              name: "on_chain_type",
              label: "链上存储"
            },
            {
              name: "off_chain_type",
              label: "链下存储"
            }
          ],
          autoLoad: true // 页面加载时自动载入数据
        },
      ],
    },
  }),
};
</script>

<style scoped></style>