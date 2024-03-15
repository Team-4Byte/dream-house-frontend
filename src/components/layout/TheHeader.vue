<script setup>
import $ from "jquery";
let lastScrollTop = 0;

$(window).scroll(function () {
  // 스크롤바 수직 위치를 가져옴
  let scrollTop = $(this).scrollTop();
  if (scrollTop >= 100) {
    // 숫자에 따라 아래로 스크롤 했을 때 사라지는 영역의 크기 바뀜
    if (scrollTop > lastScrollTop && lastScrollTop > 0) {
      /* 화면에 나오지 않을 때: top값을 마이너스로 요소가 보이지 않게 사용해야함 */
      $(".header").css("top", "-100px");
    } else {
      $(".header").css("top", "0px");
    }

    lastScrollTop = scrollTop;
  }
});

import { useMenuStore } from "@/stores/menu";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { watch } from "vue";

const menuStore = useMenuStore();

// 반응형을 유지하면서 스토어에서 속성을 추출하려면, storeToRefs()를 사용
// https://pinia.vuejs.kr/core-concepts/
const { menuList } = storeToRefs(menuStore);
const { changeMenuState } = menuStore;

const logout = () => {
  console.log("로그아웃!!!!");
  changeMenuState();
};

const router = useRouter();
console.log(router.currentRoute);
// const currentPath = ref(router.);
const isActive = (path) => {
  return window.location.pathname === path;
};

watch((to) => {
  isActive(to.path);
});

watch;
</script>

<template>
  <div class="header flex justify-between items-center px-10 h-20 bg-white shadow-sm">
    <section class="flex gap-10 leading-10">
      <router-link :to="{ name: 'main' }">
        <!-- @TODO: 로고 font 바꾸기 -->
        <div class="uppercase font-black leading-none text-lg">dream<br />house</div>
      </router-link>
      <router-link
        :to="{ name: 'notice' }"
        class="text-gray-800"
        :class="{ active: isActive('/notice') }"
      >
        <nav class="leading-10">Notice</nav>
      </router-link>
      <router-link
        :to="{ name: 'map' }"
        class="text-gray-800"
        :class="{ active: isActive('/map') }"
      >
        <nav class="leading-10">Browse</nav>
      </router-link>
      <router-link :to="{ name: 'community', query: { pgno: 1 } }" class="text-gray-800">
        <nav class="leading-10">Community</nav>
      </router-link>
    </section>

    <section class="flex gap-10 leading-10">
      <!-- <router-link :to="{ name: 'login' }">
        <nav class="text-gray-400">Log In</nav>
      </router-link>
      <router-link :to="{ name: 'signup' }">
        <nav
          class="bg-gray-950 rounded-xl text-white flex justify-center items-center px-7"
        >
          Sign Up
        </nav>
      </router-link> -->
      <template v-for="menu in menuList" :key="menu.routeName">
        <template v-if="menu.show">
          <template v-if="menu.routeName === 'logout'">
            <router-link to="/" @click.prevent="logout">
              <nav class="text-gray-400">
                {{ menu.name }}
              </nav>
            </router-link>
          </template>
          <template v-else>
            <router-link :to="{ name: menu.routeName }">
              <nav
                class="rounded-xl flex justify-center items-center"
                :class="{
                  'bg-[#222222]': menu.routeName === 'signup' || menu.routeName === 'mypage',

                  'px-5': menu.routeName === 'signup' || menu.routeName === 'mypage',

                  'text-white': menu.routeName === 'signup' || menu.routeName === 'mypage',
                }"
              >
                {{ menu.name }}
              </nav>
            </router-link>
          </template>
        </template>
      </template>
    </section>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 100;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  transform: translate(-50%);
  transition: all 0.3s;
}

.active {
  color: #222222;
}
</style>
