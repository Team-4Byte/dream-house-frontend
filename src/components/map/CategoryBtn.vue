<script setup>
defineProps({
  category: {
    name: String,
    className: String,
    dataOrder: String,
    id: String,
  },
});

defineEmits(["onClickCategory"]);
</script>

<template>
  <div
    id="color"
    class="rounded-full inline-block border-2 border-violet-400 text-violet-400 font-bold px-6 py-0 mr-2"
    @click="$emit('onClickCategory', category.id, category.name, category.dataOrder)"
  >
    {{ category.name }}
  </div>
</template>

<style scoped>
#color {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(35px);
  box-shadow: 0 8px 32px 0 rgba(113, 114, 127, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
