import { ref } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore(
  "menuStore",
  () => {
    const menuList = ref([
      { name: "Login", show: true, routeName: "login" },
      { name: "LogOut", show: false, routeName: "logout" },
      { name: "Sign Up", show: true, routeName: "signup" },
      { name: "MyPage", show: false, routeName: "mypage" },
    ]);

    const changeMenuState = () => {
      menuList.value = menuList.value.map((item) => ({ ...item, show: !item.show }));
    };

    return {
      menuList,
      changeMenuState,
    };
  },
  { persist: true }
);
