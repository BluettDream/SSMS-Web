<template>
  <div class="app-container dashboard-container">
    <div class="dashboard-editor-container">
      <el-row>
      <h1>成绩展示页面</h1>
    </el-row>
    <panel-group :courseCount="courseCount" :scoreMax="scoreMax"  :scoreMin="scoreMin" :scoreAvg="scoreAvg" />
    </div>
  </div>
</template>

<script setup name="Dashboard">
import PanelGroup from '@/components/PanelGroup/index';
import { getScoreDashBoardInfo } from "@/api/ssms/scoreDashBoard";


const scoreList = ref([]);
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
  }
});

const { queryParams } = toRefs(data);

function getScoreInfo(){
  getScoreDashBoardInfo(queryParams.value).then((res) => {
    courseCount.value = res.data.allCourse;
    scoreAvg.value = res.data.avgScore;
    scoreMax.value = res.data.maxScore;
    scoreMin.value = res.data.minScore;
    scoreList.value = res.data.scoreVoList;
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
  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>

