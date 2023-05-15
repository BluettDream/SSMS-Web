<template>
  <div
    ref="chart"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script setup name="PieScoreChart">
import { nextTick, onMounted } from "vue";
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
    type: Array,
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
      trigger: "item",
    },
    legend: {
      left: "center",
      top: "7%",
      formatter: (value) => {return wrap(value,2,1,"...","");},
    },
    series: [
      {
        type: "pie",
        top: "18%",
        selectedMode: 'single',
        radius: [0, "70%"],
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        animationDuration: 1000,
        animationDurationUpdate: 500,
      },
    ],
  });
}

initChart();
</script>
