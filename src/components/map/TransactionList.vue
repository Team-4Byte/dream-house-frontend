<script setup>
import TransactionChart from "./TransactionChart.vue";
import { ref, onUpdated } from "vue";
import { getAptTransaction } from "../../api/house";
const toggle = ref(false);
const onToggle = () => {
  toggle.value = !toggle.value;
};

const props = defineProps({
  aptInfo: {
    name: String,
    description: String,
    icon: String,
    color: String,
    calories: String,
    fat: String,
    carbs: String,
    protein: String,
    sodium: String,
    calcium: String,
    iron: String,
  },
  chartList: {
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

const apt = ref({});
onUpdated(() => {
  apt.value = props.chartList;
  getDetailInfo(apt.value.aptCode);
});

const list = ref([]);
const getDetailInfo = (code) => {
  getAptTransaction(code, ({ data }) => {
    list.value = data;
  }),
    (err) => {
      console.log(err);
    };
};

</script>

<template>
  <div>
    <TransactionChart :apt="apt" />
    <div class="px-4">
    <v-switch
      :model-value="toggle"
      :label="`상세 거래내역${toggle ? ' 가리기' : ' 보기'}`"
      density="compact"
      inset
      @click="onToggle"
    ></v-switch>
    </div>
    <v-expand-transition>
      <div v-if="toggle" class="overflow-auto h-40">
        <div class="h-20 rounded-2xl">
          <v-table>
            <thead>
              <tr>
                <th id="th" class="text-left">거래 일자</th>
                <th id="th" class="text-left">평수</th>
                <th id="th" class="text-left">거래가</th>
              </tr>
            </thead>
            <tbody class="gap-1">
              <!-- 평수 area
거래가 dealAmout
거래일자 dealYear dealMonth dealDay -->
              <tr id="item" v-for="item in list" :key="item.aptCode">
                <td id="item">
                  {{
                    `${item.dealYear}년 ${item.dealMonth}월 ${item.dealDay}일`
                  }}
                </td>
                <td id="item">{{ item.area }} ㎡</td>
                <td id="item">{{ item.dealAmount }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<style scoped>
#item {
  height: 6px;
}

#th {
  height: 8px;
}
</style>
