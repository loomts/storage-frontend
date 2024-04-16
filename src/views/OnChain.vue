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
          html: `
            <h2>链上存储：存储子系统提供链上（Tendermint）键值存储接口，支持上层应用按需存储。</h2>
            <div style='width: 100%; overflow-x: auto; text-align:center;'>
              <img src='onchain-intro.png' style='height:268px; width: auto;' />
            </div>
            <br>
            <br>
          `
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
        {
          type: "form",
          title: "Base64 编码",
          submitText: "编码",
          api: "get:http://10.68.104.103:8090/api/base64Encode?key=${key}",
          controls: [
            {
              type: "text",
              name: "key",
              label: "输入字符串",
            },
            {
              type: "static",
              name: "value",
              label: "Base64 编码结果",
            },
          ],
        },
        {
          type: "form",
          title: "Base64 解码",
          submitText: "解码",
          api: "get:http://10.68.104.103:8090/api/base64Decode?key=${key}",
          controls: [
            {
              type: "text",
              name: "key",
              label: "Base64 编码字符串",
            },
            {
              type: "static",
              name: "value",
              label: "解码结果",
            },
          ],
        }
      ],
    },
  }),
};
</script>