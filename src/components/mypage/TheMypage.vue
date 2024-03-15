<script setup>
import { ref } from "vue";

const chartOptions = ref({
  colors: [
    "#A084E8",
    "#9D76C1",
    "#D0A2F7",
    "#E5CFF7",
    "#713ABE",
  ],
  chart: {
    type: "line",
  },
  credits: {
    enabled: false,
  },
  title: {
    text: "가장 인기있는 동 Top 5",
    align: "center",
  },
  xAxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    title: {
      text: null,
    },
    gridLineWidth: 1,
    lineWidth: 0,
  },
  yAxis: {
    min: 0,
    title: {
      text: "조회수",
      align: "high",
    },
    labels: {
      overflow: "justify",
    },
    gridLineWidth: 0,
  },
  series: [
    {
      name: "Reggane",
      data: [
        16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2, 22.0, 17.8,
      ],
    },
    {
      name: "Tallinn",
      data: [
        -2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5, 2.0, -0.9,
      ],
    },
  ],
});
</script>

<template>
  <div class="h-full w-full">
    ddd

    <highcharts :options="chartOptions" />
  </div>
</template>

<style scoped>
#chart {
  width: 300px;
  height: 200px;
}
</style>
