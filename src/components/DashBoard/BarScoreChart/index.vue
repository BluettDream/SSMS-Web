<template>
  <div
    ref="chart"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script setup name="BarScoreChart">
import { nextTick, watch } from "vue";
import { wrap } from "@/utils/string";

const props = defineProps({
  className: {
    type: String,
    default: "chart",
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "400px",
  },
  chartData: {
    type: Object,
    required: true,
  },
});

const echarts = inject("echarts");
const chart = ref(null);
let chartInstance = null;

watch(props, (newVal, oldVal) => {
  if (newVal && newVal.chartData) setOption(props.chartData);
});

function initChart() {
  nextTick(() => {
    chartInstance = echarts.init(chart.value, "macarons");
    setOption(props.chartData);
    window.onresize = () => chartInstance.resize();
  });
}

function setOption(data) {
  chartInstance.setOption({
    title: {
      text: "课程分数统计",
      left: "center",
      top: "2%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: data.xAxisData,
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          formatter: function (value) {
            return wrap(value);
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Score",
        type: "bar",
        data: data.seriesData,
        animationDuration: 3000,
        animationDurationUpdate: 500,
      },
    ],
  });
}

initChart();
</script>
