<script setup>
import { ref } from "vue";
defineProps({ selectOption: Array });
const emit = defineEmits(["onKeySelect"]);

const key = ref("");

const onSelect = () => {
  // console.log(key.value + "선택!!!");
  emit("onKeySelect", key.value);
};
</script>

<template>
  <select v-model="key" class="h-10" @change="onSelect">
    <option
      v-for="option in selectOption"
      :key="option.value"
      :value="option.value"
      :disabled="option.value === '' ? true : false"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<style scoped>
select {
  /* 모든 브라우저에서 기본 스타일 초기화 */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  /* 추가적인 스타일링을 원하는 경우 아래에 원하는 스타일을 추가하세요 */
  /* 예: */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
  color: #333;
  font-size: 14px;
}
select:focus {
  /* 클릭 시 테두리 제거 */
  outline: none;
}
</style>
