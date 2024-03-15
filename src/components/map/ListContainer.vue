<script setup>
import ListItem from "./ListItem.vue";
import { useSidebarStore } from "@/stores/sidebar";
// import { storeToRefs } from "pinia";

const store = useSidebarStore();
const { toggleSidebar } = store;
// const { toggle, toggleSidebar } = storeToRefs(store);

const emit = defineEmits(["openDetail"]);
const prop = defineProps(["aptlist"]);

const openDetail = (apt) => {
  emit("openDetail", apt);
  toggleSidebar(apt.aptCode);
};
</script>

<template>
  <!-- @TODO: scroll 디자인 바꾸기
  css에서 hidden 설정 후 vue ref로 객체 가져와서 조정하는 방식으로 수정 -->
  <div id="list" class="absolute z-10 top-56 left-5 px-5 py-4 overflow-auto hide-scrollbar">
    <div v-for="apt in prop.aptlist" :key="apt" class="slide-in-container">
      <!-- @TODO key값 하나씩 전달하는 방법 -->
      <ListItem :apt-item="apt" class="slide-in-item" @open-detail="openDetail" />
    </div>
  </div>
</template>

<style scoped>
#list {
  width: 20vw;
  min-width: 20rem;
  max-height: calc(100vh - 25vh);
}
.slide-in-item {
  opacity: 0; /* 초기에는 투명하게 설정 */
  transform: translateX(-100%); /* 초기에 왼쪽으로 이동한 상태로 설정 */
  animation: slideIn 0.5s forwards; /* 0.5초 동안 slideIn 애니메이션을 수행하고 상태를 유지 */
}

@keyframes slideIn {
  to {
    opacity: 1; /* 최종적으로 불투명하게 만듭니다. */
    transform: translateX(0); /* 최종적으로 원래 위치로 이동하게 만듭니다. */
  }
}

/* 각 자식 요소에 다른 지연 시간을 주기 위해 nth-child 선택자를 사용합니다. */
.slide-in-container .slide-in-item:nth-child(1) {
  animation-delay: 0.5s; /* 첫 번째 아이템은 0.5초 후에 애니메이션을 시작합니다. */
}

.slide-in-container .slide-in-item:nth-child(2) {
  animation-delay: 1s; /* 두 번째 아이템은 1초 후에 애니메이션을 시작합니다. */
}

.slide-in-container .slide-in-item:nth-child(3) {
  animation-delay: 1.5s; /* 세 번째 아이템은 1.5초 후에 애니메이션을 시작합니다. */
}

.hide-scrollbar {
  overflow: hidden;
}

.hide-scrollbar::-webkit-scrollbar {
  width: 0.5em;
}

.hide-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.hide-scrollbar::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
