<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";

const router = useRouter();
const memberStore = useMemberStore();

const { isSignUp } = storeToRefs(memberStore);
const { userSignUp } = memberStore;

const signUpUser = ref({
  userId: "",
  userPassword: "",
  userName: "",
  emailId: "",
  emailDomain: "",
});

const signUp = async () => {
  await userSignUp(signUpUser.value);

  if (isSignUp.value) {
    router.push("/");
  } else {
    alert("중복된 아이디가 존재합니다.");
  }
};
</script>

<template>
  <div class="h-[calc(100vh-5rem)] flex items-center justify-center">
    <v-card
      class="mx-auto pa-12 pb-8 w-1/2"
      elevation="2"
      max-width="448"
      rounded="xl"
    >
      <div class="flex flex-col items-center justify-center pb-10">
        <div
          class="capitalize flex flex-col items-center justify-center font-black text-2xl"
        >
          <p>sign up</p>
          <p>with dream house</p>
        </div>
        <p class="text-sm text-black/40 capitalize">welcome to dream house!</p>
      </div>

      <v-text-field
        density="compact"
        placeholder="Enter your Name"
        variant="solo"
        rounded="xl"
        v-model="signUpUser.userName"
      ></v-text-field>
      <div class="flex gap-2">
        <v-text-field
          density="compact"
          placeholder="Enter your Email"
          variant="solo"
          rounded="xl"
          v-model="signUpUser.emailId"
        ></v-text-field>
        <v-combobox
          v-model="signUpUser.emailDomain"
          rounded="xl"
          density="compact"
          :items="['ssafy.com', 'google.com', 'naver.com', 'kakao.com']"
          variant="solo"
        ></v-combobox>
      </div>
      <v-text-field
        density="compact"
        placeholder="Enter your ID"
        v-model="signUpUser.userId"
        variant="solo"
        rounded="xl"
      ></v-text-field>
      <v-text-field
        density="compact"
        placeholder="Enter your Password"
        required
        rounded="xl"
        variant="solo"
        @click:append-inner="visible = !visible"
        v-model="signUpUser.userPassword"
      ></v-text-field>
      <v-btn
        block
        class="mb-8 mt-8"
        rounded="xl"
        color="#A084E8"
        size="large"
        @click="signUp"
      >
        Sign Up
      </v-btn>
    </v-card>
  </div>
</template>

<style scoped>
</style>
