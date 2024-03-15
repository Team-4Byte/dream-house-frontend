<script setup>
defineProps({
  aptItem: {
    aptCode: Number,
    aptName: String,
    avgAmount: Number,
    buildYear: Number,
    dongCode: String,
    dongName: String,
    jibun: String,
    lat: String,
    lng: String,
  },
});
defineEmits(["openDetail"]);

// function panTo() {
//     // 이동할 위도 경도 위치를 생성합니다 
//     var moveLatLon = new kakao.maps.LatLng(33.450580, 126.574942);
    
//     // 지도 중심을 부드럽게 이동시킵니다
//     // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
//     map.panTo(moveLatLon);            
// }    
</script>

<template>
  <div
    id="item"
    class="w-60 h-32 rounded-xl px-5 py-4 relative mb-3"
    @click="$emit('openDetail', aptItem) "
  >
    <section class="absolute h-24">
      <div class="text-lg font-medium">{{ aptItem.aptName }}</div>
      <div class="text-gray-600 text-xs">{{ `${aptItem.dongName} ${aptItem.jibun}`}}</div>
      <span class="text-xs font-bold text-white bg-point rounded-full px-2 py-1"
        >{{ aptItem.buildYear }}년</span
      >
    </section>
    <section class="absolute h-24 right-5 flex flex-col items-end">
      <div class="h-14"></div>
      <div class="text-xs text-gray-400">평균 거래가</div>
      <div class="font-bold text-xl">
        {{ aptItem.avgAmount.toLocaleString()
        }}<span class="text-xs text-gray-500 font-normal">(만원)</span>
      </div>
    </section>
  </div>
</template>

<style scoped>
#item {
  /* box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15); */

  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 32px 0 rgba(113, 114, 127, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.596);
}
</style>
