<template>
  <div class="app-container dashboard-container">
    <div class="dashboard-editor-container">
      <el-row>
        <h1>成绩展示页面</h1>
      </el-row>
      <panel-group
        :courseCount="courseCount"
        :scoreMax="scoreMax"
        :scoreMin="scoreMin"
        :scoreAvg="scoreAvg"
      />
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <pie-score-chart :chartData="pieData"/>
      </el-row>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <bar-score-chart :chartData="barData" />
      </el-row>
    </div>
  </div>
</template>

<script setup name="Dashboard">
import PanelGroup from "@/components/PanelGroup/index";
import { getScorePanelInfo } from "@/api/ssms/score";
import BarScoreChart from "@/components/DashBoard/BarScoreChart/index";
import PieScoreChart from "@/components/DashBoard/PieScoreChart/index";

const courseCount = ref(0);
const scoreMax = ref(0);
const scoreMin = ref(0);
const scoreAvg = ref(0);

const data = reactive({
  queryParams: {
    userName: undefined,
    nickName: undefined,
    courseName: undefined,
    credit: undefined,
    startTime: undefined,
    finishTime: undefined,
    score: undefined,
  },
  barData: {
    xAxisData: undefined,
    seriesData: undefined,
  },
  pieData: []
});

const { queryParams, barData, pieData } = toRefs(data);

function getScoreInfo() {
  getScorePanelInfo(queryParams.value).then((res) => {
    courseCount.value = res.data.courseCount;
    scoreAvg.value = res.data.scoreAvg;
    scoreMax.value = res.data.scoreMax;
    scoreMin.value = res.data.scoreMin;
    let keys = Object.keys(res.data.scoreData);
    let values = Object.values(res.data.scoreData);
    barData.value.xAxisData = keys;
    barData.value.seriesData = values;
    pieData.value = values.map((value, index) => ({value, name: keys[index]}));
  });
}

getScoreInfo();
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
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
