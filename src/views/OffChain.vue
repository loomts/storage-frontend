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
      title: "链下文件存储",
      body: [
        {
          type: "html",
          html: `
            <h2>链下存储：直接将原始文件存储于链下分布式存储系统（Ceph 或 IPFS）。</h2>
            <div style='width: 100%; overflow-x: auto; text-align:center;'>
              <img src='offchain-intro.png' style='height:300px; width: auto;' />
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
            "url": "${storageType == 'ipfs' ? '/api/ipfsupload' : '/api/cephupload'}",
            "data": {
              "file": "${file}"
            },
            responseData: {
              id: "${id}"
            }
          },
          "body": [
            {
              "type": "select",
              "name": "storageType",
              "label": "存储类型",
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
              type: "select",
              name: "downloadStorageType",
              label: "存储类型",
              value: "ceph",
              options: [
                {
                  label: "Ceph S3",
                  value: "ceph"
                },
                {
                  label: "IPFS",
                  value: "ipfs"
                }
              ]
            },
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
              api: "get:${downloadStorageType == 'ipfs' ? '/api/ipfsdownload' : '/api/cephdownload'}?id=${id}",
            }
          ]
        },
        {
          type: "form",
          title: "存储健康检查",
          api: {
            method: "get",
            url: "${healthCheckStorageType == 'ipfs' ? '/api/ipfshealth' : '/api/cephhealth'}",
            responseData: {
              status: "${status}",
              message: "${message}"
            }
          },
          controls: [
            {
              type: "select",
              name: "healthCheckStorageType",
              label: "存储类型",
              value: "ceph",
              options: [
                {
                  label: "Ceph S3",
                  value: "ceph"
                },
                {
                  label: "IPFS",
                  value: "ipfs"
                }
              ]
            },
            {
              type: "button",
              label: "检查健康状态",
              actionType: "submit"
            },
            {
              type: "static",
              name: "status",
              label: "状态"
            },
            {
              type: "static",
              name: "message",
              label: "详细信息"
            }
          ]
        },
        {
          type: "form",
          title: "文件列表",
          controls: [
            {
              type: "select",
              name: "listStorageType",
              label: "存储类型",
              value: "ceph",
              options: [
                {
                  label: "Ceph S3",
                  value: "ceph"
                },
                {
                  label: "IPFS",
                  value: "ipfs"
                }
              ]
            },
            {
              type: "button",
              label: "查询文件列表",
              actionType: "ajax",
              api: {
                method: "get",
                url: "${listStorageType == 'ipfs' ? '/api/ipfslist' : '/api/cephlist'}",
                adaptor: "return {fileList: payload};"
              },
              target: "fileList"
            }
          ]
        },
        {
          type: "crud",
          name: "fileList",
          api: null, // 不自动加载，通过按钮触发
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
              name: "storage_type",
              label: "存储类型"
            },
            {
              name: "metadata",
              label: "元数据",
              type: "json"
            },
            {
              type: "operation",
              label: "操作",
              buttons: [
                {
                  type: "button",
                  label: "下载",
                  actionType: "download",
                  api: "get:${row.storage_type == 'ipfs' ? '/ipfsdownload' : '/cephdownload'}?id=${row.id}"
                },
                {
                  type: "button",
                  label: "删除",
                  actionType: "ajax",
                  confirmText: "确认要删除该文件吗？",
                  api: {
                    method: "delete",
                    url: "${row.storage_type == 'ipfs' ? '/ipfsdelete' : '/cephdelete'}?id=${row.id}"
                  },
                  reload: "fileList"
                }
              ]
            }
          ]
        },
      ],
    },
  }),
};
</script>

<style scoped></style>