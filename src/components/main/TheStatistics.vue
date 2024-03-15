<script setup>
import { ref, onMounted } from "vue";

import { getAptListTop3 } from "@/api/house";

const aptListTop3 = ref([]);

const getTop3 = () => {
  getAptListTop3(
    ({ data }) => {
      aptListTop3.value;
      aptListTop3.value.splice(0, aptListTop3.value.length, ...data);
    },

    (err) => {
      console.log(err);
    }
  );
};

onMounted(() => {
  getTop3();
});
</script>

<template>
  <div
    id="container"
    class="box bg-gray-200 w-2/6 rounded-2xl z-20 relative bottom-36 p-14 h-[30rem] flex flex-col justify-center items-start"
  >
    <div class="flex items-center mb-10">
      <img
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Chequered%20Flag.png"
        alt="Chequered Flag"
        width="60"
        height="60"
      />
      <p class="font-black text-2xl pl-2">거래량 Top3 아파트</p>
    </div>
    <div></div>
    <div>
      <div class="flex items-center pb-4">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/1st%20Place%20Medal.png"
          alt="1st Place Medal"
          width="60"
          height="60"
        />
        <div class="pl-4">
          <p class="text-white text-xl font-medium">
            {{ aptListTop3.length > 0 ? aptListTop3[0].aptName : "" }} 아파트
          </p>
          <div>
            <span class="mr-1 text-xs font-light text-white bg-black/20 rounded-full px-2 py-1">
              {{ aptListTop3.length > 0 ? aptListTop3[0].buildYear : "" }}년</span
            >
            <span class="mr-1 text-xs font-light text-white bg-black/40 rounded-full px-2 py-1">
              {{ aptListTop3.length > 0 ? aptListTop3[0].dongName : "" }}
            </span>
            <span class="mr-1 text-xs font-light text-white bg-black/60 rounded-full px-2 py-1"
              >{{ aptListTop3.length > 0 ? aptListTop3[0].tradeAmount : "" }}회</span
            >
          </div>
        </div>
      </div>
      <div class="flex items-center pb-4">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/2nd%20Place%20Medal.png"
          alt="2nd Place Medal"
          width="60"
          height="60"
        />
        <div class="pl-4">
          <p class="text-white text-xl font-medium">
            {{ aptListTop3.length > 0 ? aptListTop3[1].aptName : "" }} 아파트
          </p>
          <div>
            <span class="mr-1 text-xs font-light text-white bg-black/20 rounded-full px-2 py-1">
              {{ aptListTop3.length > 0 ? aptListTop3[1].buildYear : "" }}년</span
            >
            <span class="mr-1 text-xs font-light text-white bg-black/40 rounded-full px-2 py-1">
              {{ aptListTop3.length > 0 ? aptListTop3[1].dongName : "" }}
            </span>
            <span class="mr-1 text-xs font-light text-white bg-black/60 rounded-full px-2 py-1"
              >{{ aptListTop3.length > 0 ? aptListTop3[1].tradeAmount : "" }}회</span
            >
          </div>
        </div>
      </div>
      <div class="flex items-center pb-4">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/3rd%20Place%20Medal.png"
          alt="3rd Place Medal"
          width="60"
          height="60"
        />
        <div class="pl-4">
          <p class="text-white text-xl font-medium">
            {{ aptListTop3.length > 0 ? aptListTop3[2].aptName : "" }} 아파트
          </p>
          <div>
            <span class="mr-1 text-xs font-light text-white bg-black/20 rounded-full px-2 py-1">
              {{ aptListTop3.length > 0 ? aptListTop3[2].buildYear : "" }}년</span
            >
            <span class="mr-1 text-xs font-light text-white bg-black/40 rounded-full px-2 py-1">
              {{ aptListTop3.length > 0 ? aptListTop3[2].dongName : "" }}
            </span>
            <span class="mr-1 text-xs font-light text-white bg-black/60 rounded-full px-2 py-1"
              >{{ aptListTop3.length > 0 ? aptListTop3[2].tradeAmount : "" }}회</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  border-radius: 40px;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.15);
}

#container {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 20px 0 rgba(125, 126, 128, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
