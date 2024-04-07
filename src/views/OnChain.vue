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
          api: "post:/api/upload",
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
          api: "get:http://10.68.104.103:8090/api/readKeyValue?key=key6",
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
        {
          type: "form",
          title: "结构体对象存储",
          api: "post:/api/store",
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
              label: "序列化特征",
            },
          ],
        },
        {
          type: "form",
          title: "结构体对象查询",
          api: "get:/api/retrieve",
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
              label: "序列化特征",
            },
          ],
        },
        {
          type: "crud",
          name: "keyValueList",
          api: "get:/api/list",
          columns: [
            {
              name: "key",
              label: "文件ID",
            },
            {
              name: "value",
              label: "文件特征",
            },
          ],
        },
      ],
    },
  }),
};
</script>