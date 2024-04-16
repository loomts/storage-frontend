<template>
  <div style="padding: 20px">
    {{/*  多模态数据区块链存储子系统  */}}
    <router-view></router-view>
  </div>
</template>
<script>
import HomeApi from "@/api/modules/HomeApi";
export default {
  components: {},
  computed: {},
  data: () => ({}),
  beforeCreate() { },
  created() { },
  beforeMount() { },
  mounted() { },
  beforeUpdate() { },
  updated() { },
  activated() { }, //when keep-alive
  deactivated() { }, //when keep-alive
  beforeDestroy() { },
  destroyed() { },
  methods: {
    getDatList(){
      HomeApi.getDatList()
    }
  },
};
</script>
