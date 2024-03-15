<script setup>
import { computed } from "vue";

const props = defineProps({ currentPage: Number, totalPage: Number });
const emit = defineEmits(["pageChange"]);

const navigationSize = parseInt(10);

const startPage = computed(() => {
  return (
    parseInt((props.currentPage - 1) / navigationSize) * navigationSize + 1
  );
});

const endPage = computed(() => {
  let lastPage =
    parseInt((props.currentPage - 1) / navigationSize) * navigationSize +
    navigationSize;
  return props.totalPage < lastPage ? props.totalPage : lastPage;
});

const endRange = computed(() => {
  return (
    parseInt((props.totalPage - 1) / navigationSize) * navigationSize <
    props.currentPage
  );
});

function range(start, end) {
  const list = [];
  for (let i = start; i <= end; i++) list.push(i);
  return list;
  //   return Array(end - start + 1)
  //     .fill()
  //     .map((val, i) => start + i);
}

function onPageChange(pg) {
  console.log(pg + "로 이동!!!");
  emit("pageChange", pg);
}
</script>

<template>
  <div class="pt-10 pb-24">
    <ul class="flex py-5 justify-center items-center gap-4">
      <li class="page-item shadow-sm bg-point text-white px-3 py-1 rounded-xl">
        <a class="page-link" @click="onPageChange(1)">최신</a>
      </li>
      <li class="page-item shadow-sm border-point border-[1px] text-point px-3 py-1 rounded-xl">
        <a
          class="page-link"
          @click="onPageChange(startPage == 1 ? 1 : startPage - 1)"
          >이전</a
        >
      </li>
      <template v-for="pg in range(startPage, endPage)" :key="pg">
        <li :class="currentPage === pg ? 'page-item active' : 'page-item'">
          <a class="page-link" @click="onPageChange(pg)">{{ pg }}</a>
        </li>
      </template>
      <li class="page-item shadow-sm border-point border-[1px] text-point px-3 py-1 rounded-xl">
        <a
          class="page-link"
          @click="onPageChange(endRange ? totalPage : endPage + 1)"
          >다음</a
        >
      </li>
      <li class="page-item shadow-sm bg-point text-white px-3 py-1 rounded-xl">
        <a class="page-link" @click="onPageChange(totalPage)">마지막</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
a {
  cursor: pointer;
}
/* 
.button-like-text {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  background-color: #3498db;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.button-like-text:hover {
  background-color: #2980b9;
} */


</style>
