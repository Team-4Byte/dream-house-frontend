<script setup>
import TheFooter from "../components/layout/TheFooter.vue";
import { ref } from "vue";

const page = ref(1);
const items = ref(
  Array.from({ length: 15 }, (k, v) => ({
    title: "Item " + v + 1,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
  }))
);

const onMoveDetail = (i) => {
  alert(`hi ${i}`);
};
</script>

<template>
  <div class="pt-20 flex flex-col items-center justify-center">
    <h1 class="font-bold text-3xl">Notice</h1>
    <div class="w-4/5 p-10">
      <v-data-iterator :items="items" :page="page">
        <template v-slot:default="{ items }">
          <template v-for="(item, i) in items" :key="i">
            <v-card
              v-bind="item.raw"
              @click="onMoveDetail(i)"
            ></v-card>
            <br />
          </template>
          <v-pagination
            v-model="page"
            :length="5"
            rounded="circle"
          ></v-pagination>
        </template>
      </v-data-iterator>
    </div>
  </div>

  <TheFooter />
</template>

<style scoped></style>
