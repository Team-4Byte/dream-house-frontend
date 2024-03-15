<script setup>
import BoardFormItem from "./item/BoardFormItem.vue";
</script>

<template>
  <div class="w-screen h-[calc(100vh-5rem)]">
    <div class="pt-20 flex flex-col justify-center items-center">
      <h2 class="pt-10 font-semibold">글쓰기</h2>
      <div class="flex shadow-md px-16 rounded-[3rem] pt-10">
        <BoardFormItem type="regist" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
