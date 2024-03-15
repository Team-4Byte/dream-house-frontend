<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { useMenuStore } from "@/stores/menu";

const router = useRouter();

const memberStore = useMemberStore();

const { isLogin } = storeToRefs(memberStore);
const { userLogin, getUserInfo } = memberStore;
const { changeMenuState } = useMenuStore();

const loginUser = ref({
  userId: "",
  userPassword: "",
});

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const login = async () => {
  await userLogin(loginUser.value);
  let token = sessionStorage.getItem("accessToken");
  // await sleep(1000);
  if (isLogin.value) {
    // console.log("안녕");
    getUserInfo(token);
    changeMenuState();

    router.push("/");
  } else {
    alert("로그인 실패");
  }
};

const signUp = () => {
  router.push({ name: "signup" });
};
</script>

<template>
  <div class="h-[calc(100vh-5rem)] flex items-center justify-center">
    <v-card class="mx-auto pa-12 pb-8 w-1/2" elevation="2" max-width="448" rounded="xl">
      <div class="flex flex-col items-center justify-center pb-5">
        <div class="capitalize flex flex-col items-center justify-center font-black text-2xl">
          <p>Log In To</p>
          <p>Your Account</p>
        </div>
        <p class="text-sm text-black/40 capitalize">welcome to dream house!</p>
      </div>
      <div class="text-subtitle-1 text-medium-emphasis">ID</div>

      <v-text-field
        density="compact"
        placeholder="Enter your ID"
        variant="solo"
        rounded="xl"
        v-model="loginUser.userId"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>

      <v-text-field
        density="compact"
        type="password"
        placeholder="Enter your password"
        rounded="xl"
        variant="solo"
        @click:append-inner="visible = !visible"
        v-model="loginUser.userPassword"
      ></v-text-field>
      <a
        class="text-caption text-decoration-none text-black"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        Forgot login password?</a
      >

      <v-btn block class="mb-2" rounded="xl" color="#222222" size="large" @click="login">
        Log In
      </v-btn>
      <v-btn block class="mb-8" rounded="xl" color="#A084E8" size="large" @click="signUp">
        Sign Up
      </v-btn>
    </v-card>
  </div>
</template>

<style scoped></style>
