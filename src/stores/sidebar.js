import { ref } from "vue";
import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", () => {
  const toggle = ref(false);
  const aptCode = ref(null);

  const toggleSidebar = (code) => {
    if (aptCode.value === null) {
      showSidebar();
      aptCode.value = code;
    } else if (aptCode.value === code) {
      toggle.value = !toggle.value;
    } else {
      aptCode.value = code;
      showSidebar();
    }
  };

  // const hideSidebar = () => {
  //   toggle.value = false;
  // }

  const showSidebar = () => {
    toggle.value = true;
  }
  return { toggle, toggleSidebar };
});
