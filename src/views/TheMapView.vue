<script setup>
import TheMap from "@/components/map/TheMap.vue";
import SearchCombo from "@/components/common/SearchCombo.vue";

import ListContainer from "@/components/map/ListContainer.vue";
import AptDetail from "@/components/map/AptDetail.vue";
import CategoryBtn from "@/components/map/CategoryBtn.vue";
// import { useSidebarStore } from "@/stores/sidebar";

// const { toggleSidebar } = useSidebarStore();

const categories = ref([
  {
    name: "은행",
    className: "bank",
    dataOrder: "0",
    id: "BK9",
  },
  {
    name: "마트",
    className: "mart",
    dataOrder: "0",
    id: "MT1",
  },
  {
    name: "약국",
    className: "pharmacy",
    dataOrder: "0",
    id: "PM9",
  },
  {
    name: "주유소",
    className: "oil",
    dataOrder: "0",
    id: "OL7",
  },
  {
    name: "카페",
    className: "cafe",
    dataOrder: "0",
    id: "CE7",
  },
  {
    name: "편의점",
    className: "store",
    dataOrder: "0",
    id: "CS2",
  },
]);

defineEmits(["openDetail"]);

import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const getQuery = ref(route.query);
// console.log(getQuery.value.aptName)

const location = ref({
  lat: "",
  lng: "",
});

const aptItem = ref({});
const openDetail = (apt) => {
  aptItem.value = apt;
};

const updateMap = (val) => {
  location.value = val;
};

const selectCate = ref({
  name: "",
  id: "",
  dataOrder: "",
});

const onOnClickCategory = (id, name, dataOrder) => {
  selectCate.value.id = id;
  selectCate.value.name = name;
  selectCate.value.dataOrder = dataOrder;
};

const aptlist = ref([]);
const getAptList = (list) => {
  aptlist.value = list;
};
</script>

<template>
  <div class="relative">
    <div class="z-10 absolute top-24 leading-10 pl-10">
      <div>
        <SearchCombo
          :get-query="getQuery"
          @initBySearch="initBySearch"
          @updateMap="updateMap"
          @get-apt-list="getAptList"
        />
      </div>
      <div class="relative top-20 flex" id="category">
        <div v-for="cate in categories" :key="cate.id" :id="cate.id">
          <CategoryBtn :category="cate" @on-click-category="onOnClickCategory" />
        </div>
      </div>
    </div>
    <TheMap :get-query="getQuery" :location="location" :select-cate="selectCate" />
    <ListContainer :aptlist="aptlist" @open-detail="openDetail" />
    <AptDetail :apt="aptItem" @updateMap="updateMap" />
  </div>
</template>

<style scoped></style>
