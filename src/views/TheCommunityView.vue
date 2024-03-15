<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="container text-center mt-3">
    <div class="alert alert-info" role="alert">Community</div>
    <router-view></router-view>
  </div>
</template>

<style>
mark.sky {
  background: linear-gradient(to top, #54fff9 20%, transparent 30%);
}
</style>
