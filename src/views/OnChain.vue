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
      title: "链上键值存储",
      body: [
        {
          type: "html",
          html: "<h2>链上键值存储：根据多模态文件的特征，将文件ID和特征分别作为键值上链（Tendermint）。</h2>"
        },
        {
          type: "html",
          html: "<div style='text-align:center;'><img src='tendermint.jpg' style='width:40%;' /></div>"
        },
        {
          type: "form",
          title: "键值上传",
          api: {
            method: "post",
            dataType: "form-data",
            url: "http://10.68.104.103:8090/api/writeKeyValue",
            data: {
              key: "${key}",
              value: "${value}"
            }
          },
          submitText: "上传",
          controls: [
            {
              type: "text",
              name: "key",
              label: "文件ID",
            },
            {
              type: "textarea",
              name: "value",
              label: "文件特征",
            },
          ],
        },
        {
          type: "form",
          title: "键值查询",
          api: "get:http://10.68.104.103:8090/api/readKeyValue?key=${key}",
          submitText: "查询",
          controls: [
            {
              type: "text",
              name: "key",
              label: "文件ID",
            },
            {
              type: "static",
              name: "value",
              label: "文件特征",
            },
          ],
        },
       // {
       //   type: "form",
       //   title: "结构体对象存储",
       //   title: "结构体对象存储",
       //   api: {
       //     method: "post",
       //     dataType: "form-data",
       //     url: "http://10.68.104.103:8090/api/writeKeyValue",
       //     data: {
       //       key: "${key}",
       //       value: "${value}"
       //     }
       //   }, 
       //   submitText: "上传",
       //   controls: [
       //     {
       //       type: "text",
       //       name: "key",
       //       label: "文件ID",
       //     },
       //     {
       //       type: "textarea",
       //       name: "value",
       //       value: "{'name': 'gdb-13.1.tar.xz', 'size': '23665472', 'date': '2023-02-19', 'etag': '115ad5c18d69a6be2ab15882d365dda2a2211c14f480b3502c6eba576e2e95a0'}",
       //       label: "序列化特征",
       //     },
       //   ],
       // },
       // {
       //   type: "form",
       //   title: "结构体对象查询",
       //   api: "get:http://10.68.104.103:8090/api/readKeyValue?key=${key}",
       //   submitText: "查询",
       //   controls: [
       //     {
       //       type: "text",
       //       name: "key",
       //       label: "文件ID",
       //     },
       //     {
       //       type: "static",
       //       name: "value",
       //       label: "序列化特征",
       //     },
       //   ],
       // },
      ],
    },
  }),
};
</script>