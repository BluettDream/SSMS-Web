<template>
  <div>
    <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-course">
          <svg-icon icon-class="book" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">全部课程</div>
          <count-to
            :startVal="0"
            :endVal="userCourseCount"
            :duration="3"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-max">
          <svg-icon icon-class="max" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">最高分数</div>
          <count-to
            :startVal="0"
            :endVal="userScoreMax"
            :duration="3"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-min">
          <svg-icon icon-class="min" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">最低分数</div>
          <count-to
            :startVal="0"
            :endVal="userScoreMin"
            :duration="3"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-avg">
          <svg-icon icon-class="avg" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">平均分数</div>
          <count-to
            :startVal="0"
            :endVal="userScoreAvg"
            :duration="3"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script setup name="PanelGroup">
import CountTo from "vue-countup-v3";
import {} from "@/api/ssms/scoreDashBoard"

const { proxy } = getCurrentInstance();

const userCourseCount = ref(0);
const userScoreAvg = ref(0);
const userScoreMax = ref(0);
const userScoreMin = ref(0);

function getPanelInfo(){
  userCourseCount.value = 100
  userScoreAvg.value = 80
  userScoreMax.value = 85
  userScoreMin.value = 78
}

getPanelInfo()
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-course {
        background: #40c9c6;
      }
      .icon-max {
        background: #36a3f7;
      }
      .icon-min {
        background: #f4516c;
      }
      .icon-avg {
        background: #34bfa3;
      }
    }
    .icon-course {
      color: #40c9c6;
    }
    .icon-max {
      color: #36a3f7;
    }
    .icon-min {
      color: #f4516c;
    }
    .icon-avg {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
