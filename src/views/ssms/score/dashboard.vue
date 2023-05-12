<template>
  <div class="app-container dashboard-container">
    <div class="dashboard-editor-container">
      <el-row>
      <h1>成绩展示页面</h1>
    </el-row>
    <panel-group />
    </div>
  </div>
</template>

<script setup name="Dashboard">
import PanelGroup from '@/components/PanelGroup/index'

</script>

<style scoped lang="scss">
.dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>

