<script setup>
import BoardFormItem from "./item/BoardFormItem.vue";
</script>

<template>
  <div class="w-screen h-[calc(100vh - 5rem)]">
    <div class="pt-20 m-auto flex flex-col justify-center items-center">
      <div class="">
        <h2 class="py-10 font-semibold">글수정</h2>
      </div>
      <div class="">
        <BoardFormItem type="modify" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
