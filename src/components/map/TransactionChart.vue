<script setup>
// import { Bar } from "vue-chartjs";
import { ref, onUpdated, onBeforeMount } from "vue";
import { getAptTransaction } from "../../api/house";

const prop = defineProps(["apt"]);
// const data = ref({
//   labels: ["January", "February", "March", "January", "February", "March"],
//   datasets: [{ data: [40, 20, 12, 40, 60, 12] }],
// });
// const options = ref({
//   responsive: true,
// });

const list = ref([]);
let yearMonth = ref([]);
let deal = ref([]);

onBeforeMount(() => {
  getDetailInfo(prop.apt.aptCode);
  chartOptions.value = {
    colors: ["#A084E8", "#9D76C1", "#D0A2F7", "#E5CFF7", "#713ABE"],
    chart: {
      type: "line",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "아파트 거래량 변동 추이",
      align: "center",
    },
    xAxis: {
      categories: yearMonth.value,
      title: {
        text: null,
      },
      gridLineWidth: 1,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: "거래가",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
      gridLineWidth: 0,
    },
    series: [
      {
        name: "거래량 변동",
        data: deal.value,
      },
    ],
  };
}),
  onUpdated(() => {
    getDetailInfo(prop.apt.aptCode);
  });

const getDetailInfo = (code) => {
  getAptTransaction(code, ({ data }) => {
    setList(data);
  }),
    (err) => {
      console.log(err);
    };
};

const setList = (aptList) => {
  list.value = aptList;
  // list.value = aptList.splice(0, 6);

  yearMonth.value = [];
  deal.value = [];

  list.value.forEach((apt) => {
    if (apt) {
      const date = `${apt.dealYear}.${apt.dealMonth}`;
      yearMonth.value.push(date);
      deal.value.push(apt.dealAmount);
    }
  });

  deal.value = deal.value.map((str) => str?.replace(/,/g, ""));
  deal.value = deal.value.map((str) => parseInt(str, 10));
};

const chartOptions = ref([]);

onUpdated(() => {
  chartOptions.value = {
    colors: ["#A084E8", "#9D76C1", "#D0A2F7", "#E5CFF7", "#713ABE"],
    chart: {
      type: "line",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "아파트 거래량 변동 추이",
      align: "center",
    },
    xAxis: {
      categories: yearMonth.value,
      title: {
        text: null,
      },
      gridLineWidth: 1,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: "거래가",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
      gridLineWidth: 0,
    },
    series: [
      {
        name: "거래량 변동",
        data: deal.value,
      },
    ],
  };
});
</script>

<template>
  <div class="px-2">
    <highcharts class="h-72 w-full" :options="chartOptions" />
  </div>
</template>

<style scoped></style>
