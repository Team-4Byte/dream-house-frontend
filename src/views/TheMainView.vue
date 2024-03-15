<script setup>
import TheStatistics from "../components/main/TheStatistics.vue";
import TheYoutubes from "../components/main/TheYoutubes.vue";
import TheFooter from "../components/layout/TheFooter.vue";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { listSido, listGugun, listDong } from "@/api/address";
import { getAptListByDong } from "@/api/house";

const router = useRouter();

const selectedSido = ref("");
const selectedGugun = ref("");
const selectedDong = ref("");

const sidoName = ref([]);
const sidoCode = ref([]);

const gugunName = ref([]);
const gugunCode = ref([]);

const dongName = ref([]);
const dongCode = ref([]);

const aptList = ref([]);

const aptName = ref();

const toggle = ref(true);
const toggleHandler = () => {
  toggle.value = !toggle.value;
};

const getSidoList = () => {
  listSido(
    ({ data }) => {
      data.forEach((sido) => {
        sidoName.value.push(sido.sidoName);
        sidoCode.value.push(sido.sidoCode);
      });
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeSido = (val) => {
  const code = sidoCode.value[sidoName.value.indexOf(val)];

  gugunName.value = [];
  gugunCode.value = [];

  listGugun(
    code,
    ({ data }) => {
      data.forEach((gugun) => {
        gugunName.value.push(gugun.gugunName);
        gugunCode.value.push(gugun.gugunCode);
      });
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeGugun = (val) => {
  const code = gugunCode.value[gugunName.value.indexOf(val)];

  dongName.value = [];
  dongCode.value = [];

  listDong(
    code,
    ({ data }) => {
      data.forEach((dong) => {
        dongName.value.push(dong.dongName);
        dongCode.value.push(dong.dongCode);
      });
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeDong = (val) => {
  const code = dongCode.value[dongName.value.indexOf(val)];

  dongName.value = [];
  dongCode.value = [];

  listDong(
    code,
    ({ data }) => {
      data.forEach((dong) => {
        dongName.value.push(dong.dongName);
        dongCode.value.push(dong.dongCode);
      });
    },
    (err) => {
      console.log(err);
    }
  );

  getAptListByDong(
    code,
    ({ data }) => {
      aptList.value = [];
      aptList.value.splice(0, aptList.value.length, ...data);
    },
    (err) => {
      console.log(err);
    }
  );
};

// map으로 이동하기
const onClickBtn = () => {
  if (toggle.value) {
    if (sidoName.value.length != 0 && (gugunName.value.length != 0 || dongName.value.length != 0)) {
      router.push({
        path: "/map",
        query: {
          sido: selectedSido.value,
          gugun: selectedGugun.value,
          dong: selectedDong.value,
        },
      });
    } else {
      alert("빈칸이 있는지 확인해주세요.");
    }
  } else {
    {
      router.push({
        path: "/map",
        query: {
          aptName: aptName.value,
        },
      });
    }
  }
};

onMounted(() => {
  getSidoList();
});
</script>

<template>
  <div class="pt-20 h-screen">
    <div
      id="background-image"
      class="w-screen px-48 h-3/4 flex flex-col justify-center items-center"
    >
      <section class="h-96 flex flex-col justify-center items-center p-10 text-white">
        <p class="font-bold text-4xl">Welcome to Dream House</p>
        <p class="px-32 text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic animi praesentium aspernatur
          quidem sint modi possimus rem, eligendi est ut quasi dolorum architecto totam!
        </p>
      </section>
      <section class="w-screen pb-10 flex justify-center items-center">
        <div
          id="search"
          class="h-16 rounded-full flex items-center justify-between px-3 gap-5 absolute"
        >
          <v-switch label="" inset class="pt-5 m-0" @click="toggleHandler"></v-switch>
          <div v-if="toggle" class="px-4 pt-4 flex justify-center items-center gap-6 w-full">
            <v-combobox
              class="w-1/3"
              :items="sidoName"
              v-model="selectedSido"
              @update:model-value="onChangeSido($event)"
              variant="underlined"
              label="시•도"
            ></v-combobox>

            <v-combobox
              class="w-1/3"
              :items="gugunName"
              v-model="selectedGugun"
              @update:model-value="onChangeGugun($event)"
              variant="underlined"
              label="구•군"
            ></v-combobox>

            <v-combobox
              class="w-1/3"
              :items="dongName"
              v-model="selectedDong"
              @update:model-value="onChangeDong($event)"
              variant="underlined"
              label="동"
            ></v-combobox>
          </div>

          <div v-else class="pt-4 px-4 flex justify-center items-center w-full">
            <v-text-field
              label="아파트명으로 검색하기"
              variant="underlined"
              class="w-4/5"
              v-model="aptName"
            ></v-text-field>
          </div>
          <!-- @TODO: hover 작동안됨 현상 해결하기 -->
          <button class="bg-white rounded-3xl px-8 py-1 h-12 hover:bg-black" @click="onClickBtn">
            search
          </button>
        </div>
      </section>
    </div>
    <section class="h-fit">
      <div class="h-52"></div>
      <div class="flex justify-center px-14 gap-10 pt-10 bg-[#222222] w-screen z-0">
        <TheStatistics />
        <TheYoutubes />
      </div>
      <!-- <div class="bg-[#222222] h-96 w-screen relative bottom-72 z-0"></div> -->
    </section>
    <TheFooter />
  </div>
</template>

<style scoped>
#search {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 32px 0 rgba(113, 114, 127, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);

  width: 45vw;
}

#background-image {
  /* 배경 이미지 경로를 수정하세요. */
  /* @TODO: 고화질 사진으로 교체하기 */
  background-image: url("../assets/img/main-house3.jpeg");
  /* 배경 크기 조절 옵션을 선택적으로 사용할 수 있습니다. */
  background-size: cover; /* 또는 contain 등의 값도 사용 가능합니다. */
  /* 배경 위치를 설정할 수 있습니다. */
  background-position: center center;
  /* 배경 반복을 설정할 수 있습니다. */
  background-repeat: no-repeat;
  /* div 요소의 크기를 설정합니다. */
}

/* #background-image::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 31%;
  background-color: black; 검정색 배경을 설정합니다.
  opacity: 0.5; 어두움의 정도를 조절할 수 있습니다. 0이 투명, 1이 완전 불투명입니다.
} */
</style>
