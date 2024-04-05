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
      title: "链下文件存储",
      body: [
        {
          type: "html",
          html: "<h2>链上链下协同存储文件：根据多模态文件内容，提取其特征，将文件内容存储到链下（Ceph）。</h2>"
        },
        {
          type: "html",
          html: "<div style='text-align:center;'><img src='ceph.png' style='width:40%;' /></div>"
        },
        {
          type: "form",
          title: "上传",
          target: "fileList",
          api: "post:https://your-backend-endpoint/upload",
          // debug: true,
          body: [
            {
              type: "input-file",
              name: "file",
              // label: "上传文件",
              accept: "*",
              // maxSize: 10485760, // 例如最大 10MB
              // asBlob: true
            }
          ],
          onSaveSuccess: {
            type: 'toast',
            level: 'success',
            message: '文件上传成功'
          },
          reload: "fileList" // 指定上传后重新加载的目标组件
        },
        {
          type: "form",
          title: "下载",
          api: "get:https://your-backend-endpoint/download/${id}",
          controls: [
            {
              type: "text",
              name: "id",
              label: "文件ID",
              required: true
            },
            {
              type: "button",
              label: "下载",
              level: "primary",
              actionType: "ajax",
              api: "get:https://your-backend-endpoint/download/${id}",
              onSuccess: (data, throwl, response) => {
                if (response.status === 200) {
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', response.filename || 'downloaded-file'); // 使用后端提供的文件名或默认名字
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }
            }
          ]
        },
        {
          type: "crud",
          name: "fileList",
          label: "文件列表",
          api: "get:https://your-backend-endpoint/file/list",
          columns: [
            {
              name: "filename",
              label: "文件名"
            },
            {
              name: "ID",
              label: "文件ID"
            },
            {
              name: "size",
              label: "文件大小"
            },
            {
              name: "lastModified",
              label: "最后修改时间"
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