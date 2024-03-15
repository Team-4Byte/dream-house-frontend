<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from "vue";
import { listSido, listGugun, listDong } from "@/api/address";
import { getAptListByGugun, getAptListByDong, getHouseInfoByaptName } from "@/api/house";

const props = defineProps(["getQuery"]);
const emit = defineEmits(["updateMap", "getAptList", "initBySearch"]);

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

const toggle = ref();
const toggleHandler = () => {
  // console.log(toggle.value);
  toggle.value = !toggle.value;
};

const onChangeLocation = (val) => {
  if (val.length) {
    emit("updateMap", val);
  } else if (!val.length) {
    alert("현재 데이터가 없습니다 ㅠㅠ");
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getSidoList = () => {
  listSido(
    async ({ data }) => {
      data.forEach((sido) => {
        sidoName.value.push(sido.sidoName);
        sidoCode.value.push(sido.sidoCode);
      });

      if (props.getQuery.sido !== undefined) {
        toggle.value = true;

        selectedSido.value = props.getQuery.sido;
        selectedGugun.value = props.getQuery.gugun;
        selectedDong.value = props.getQuery.dong;

        if (props.getQuery.dong !== "") {
          await sleep(1000);
          onChangeSido(selectedSido.value, selectedGugun.value, selectedDong.value);
        } else {
          await sleep(1000);
          onChangeSido(selectedSido.value, selectedGugun.value);
        }
      } else if (props.getQuery.aptName !== undefined || props.getQuery.aptName === "") {
        aptName.value = props.getQuery.aptName;
        toggle.value = false;
        console.log("SearchComb.vue");

        await sleep(1000);
        onSearchBtn();
      }
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeSido = (val, val2, val3) => {
  const code = sidoCode.value[sidoName.value.indexOf(val)];

  gugunName.value = [];
  gugunCode.value = [];

  selectedGugun.value = "";

  listGugun(
    code,
    ({ data }) => {
      data.forEach((gugun) => {
        gugunName.value.push(gugun.gugunName);
        gugunCode.value.push(gugun.gugunCode);
      });

      if (val2 !== undefined) {
        onChangeGugun(val2, val3);
      }
      selectedGugun.value = props.getQuery.gugun;
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeGugun = (val, val3) => {
  const code = gugunCode.value[gugunName.value.indexOf(val)];
  dongName.value = [];
  dongCode.value = [];

  selectedDong.value = "";

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

  getAptListByGugun(
    code,
    ({ data }) => {
      aptList.value = [];
      aptList.value.splice(0, aptList.value.length, ...data);
      emit("getAptList", aptList.value);
      if (val3 !== undefined) {
        onChangeDong(val3);
      }

      selectedDong.value = props.getQuery.dong;
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

watch(
  () => aptList.value,
  (newVal) => {
    onChangeLocation(newVal);
  }
);

const onSearchBtn = () => {
  {
    if (aptName.value == undefined || aptName.value === "") {
      alert("아파트 이름을 입력하세요.");
    } else {
      getHouseInfoByaptName(
        aptName.value,
        ({ data }) => {
          aptList.value = [];
          aptList.value.splice(0, aptList.value.length, ...data);
          emit("getAptList", aptList.value);
        },
        (err) => {
          console.log(err);
          alert("해당하는 아파트 이름이 없습니다.");
        }
      );
    }
    // console.log(aptName.value);
  }
};

onMounted(() => {
  getSidoList();
});
</script>

<template>
  <div id="search" class="h-16 rounded-full flex items-center justify-between px-3 gap-5 absolute">
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
      <!-- <v-combobox class="w-1/3" :items="dongName" variant="underlined" label="동"></v-combobox> -->
    </div>

    <div v-else class="pt-4 px-4 flex justify-center items-center w-full">
      <v-text-field
        v-model="aptName"
        label="아파트명으로 검색하기"
        variant="underlined"
        class="w-4/5"
      ></v-text-field>
      <button
        class="bg-white rounded-3xl px-6 py-1 h-12 hover:bg-black ml-0 mt-0 mb-5"
        @click="onSearchBtn($event)"
      >
        search
      </button>
    </div>
    <!-- @TODO: hover 작동안됨 현상 해결하기 -->
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
</style>
