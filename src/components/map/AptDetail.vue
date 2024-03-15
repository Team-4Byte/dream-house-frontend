<script setup>
import { PhHeart } from "@phosphor-icons/vue";
import { ref, onMounted, watch, defineEmits } from "vue";
import TransactionList from "./TransactionList.vue";
import { getAptTransaction } from "../../api/house";
import { useSidebarStore } from "@/stores/sidebar";

const emit = defineEmits(["updateMap"]);

const onChangeLocation = (val) => {
  emit("updateMap", val);
};

const store = useSidebarStore();

const props = defineProps({
  apt: {
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

// console.log("찐도착: ", props.apt);
// console.log("pinia sidebar store.toggle: ", store.toggle);

let roadview = null;
let roadviewClient = null;
onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initLoadViewMap();
  } else {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(initLoadViewMap);
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }`;
    document.head.appendChild(script);
  }

  // getDetailInfo(props.apt.aptCode);
});

const aptArea = ref(0);
const getDetailInfo = (code) => {
  getAptTransaction(code, ({ data }) => {
    onChangeLocation([{ lat: data[0].dto.lat, lng: data[0].dto.lng }]);
    aptArea.value = data[0].area;
  }),
    (err) => {
      console.log(err);
    };
};

const initLoadViewMap = () => {
  var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
  roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
  roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

  var position = new kakao.maps.LatLng(33.450701, 126.570667);

  // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
  roadviewClient.getNearestPanoId(position, 50, function (panoId) {
    roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
  });
};

watch(
  () => props.apt,
  (newVal) => {
    var position = new kakao.maps.LatLng(newVal.lat, newVal.lng);
    roadviewClient.getNearestPanoId(position, 50, function (panoId) {
      roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
    });

    getDetailInfo(newVal.aptCode);
  }
);

const aptInfo = ref({
  name: "Frozen Yogurt",
  description:
    "A tangy and creamy dessert made from yogurt and sometimes fruit, Frozen Yogurt is a lighter alternative to ice cream. Perfect for those who crave a sweet treat but want to keep it on the healthier side.",
  icon: "mdi-ice-cream",
  color: "#6EC1E4",
  calories: 159,
  fat: 6,
  carbs: 24,
  protein: 4,
  sodium: 87,
  calcium: "14%",
  iron: "1%",
});
</script>

<template>
  <div
    :class="{ 'sidebar-close': !store.toggle, 'sidebar-open': store.toggle }"
    id="detail"
    class="absolute top-20 -right-0 bg-white z-10 rounded-tl-[2rem] rounded-bl-[2rem] p-4"
  >
    <section id="item" class="w-full h-32 rounded-xl px-5 pt-4 relative">
      <div class="absolute h-24">
        <div class="text-lg font-medium">
          {{ apt.aptName }}
        </div>

        <div class="text-gray-600 text-xs">
          {{ `${apt.dongName} ${apt.jibun}` }}
        </div>
        <div
          class="inline-block text-xs font-bold text-white bg-gray-500 rounded-full px-2 py-1 mr-2"
        >
          {{ aptArea }}m
        </div>
        <div class="inline-block text-xs font-bold text-white bg-gray-400 rounded-full px-2 py-1">
          {{ apt.buildYear }}년 완공
        </div>
      </div>

      <div class="flex flex-col h-24 items-end justify-between z-10 absolute right-0 pr-4">
        <div class="flex items-center">
          <!-- @TODO: 찜 hover 효과 및 클릭 효과 추가하기 -->
          <p class="leading-3 pr-1 font-semibold text-gray-700">찜</p>
          <ph-heart :size="32" color="#b18cfe" />
          <!-- <ph-heart :size="32" color="#A084E8" weight="duotone" class="leading-3"/> -->
        </div>
        <div class="flex flex-col items-end">
          <div class="text-xs text-gray-400">평균 거래가</div>
          <div class="font-bold text-xl">
            {{ apt.avgAmount?.toLocaleString() }}
            <span class="text-xs text-gray-500 font-normal">(만원)</span>
          </div>
        </div>
      </div>
    </section>
    <section class="z-20">
      <div id="roadview" style="width: 100%; height: 200px"></div>
    </section>
    <section>
      <TransactionList :aptInfo="aptInfo" :chart-list="props.apt" />
    </section>
  </div>
</template>

<style scoped>
#item {
  border-radius: 50px;
  background-color: white;
}

#detail {
  width: 28vw;
  height: calc(100vh - 5rem);
  box-shadow: 0 8px 32px 0 rgba(113, 114, 127, 0.37);
  /* height: 100vh; */

  opacity: 0;
  transform: translateX(100%);
}

.sidebar-open {
  animation: slideIn 0.5s forwards;
}
.sidebar-close {
  animation: slideOut 0.5s forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
