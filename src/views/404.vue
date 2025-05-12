<template>
  <div class="page-404">
    <div class="container">
      <h1>404</h1>
      <h2>页面不存在</h2>
      <p>抱歉，您访问的页面不存在或已被移除</p>
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404'
}
</script>

<style scoped>
.page-404 {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f5f7fa;
}

.container {
  padding: 30px;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 80px;
  margin-bottom: 10px;
  color: #409EFF;
}

h2 {
  font-size: 30px;
  margin-bottom: 20px;
}

p {
  color: #606266;
  margin-bottom: 30px;
}
</style>
