<script setup>
import { ref } from "vue";
import CategoryBtn from "./CategoryBtn.vue";

const categories = ref(["은행", "마트", "약국", "주유소", "카페", "편의점"]);
</script>

<template>
  <div class="flex" v-for="(cate, index) in categories" :key="index">
    <CategoryBtn :category="cate" :data-order="index" />
  </div>
</template>

<style scoped></style>
