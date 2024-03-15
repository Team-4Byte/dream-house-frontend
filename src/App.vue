<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
</script>

<template>
  <v-app>
    <div>
      <TheHeader />
      <router-view></router-view>
    </div>
  </v-app>
</template>

<style scoped>
container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
