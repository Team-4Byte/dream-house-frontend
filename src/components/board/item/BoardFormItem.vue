<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { registArticle, getModifyArticle, modifyArticle } from "@/api/board";

const router = useRouter();
const route = useRoute();

const props = defineProps({ type: String });

const isUseId = ref(false);

const article = ref({
  articleNo: 0,
  title: "",
  content: "",
  userId: "",
  userName: "",
  hit: 0,
  createTime: "",
});

if (props.type === "modify") {
  let { articleno } = route.params;
  getModifyArticle(
    articleno,
    ({ data }) => {
      article.value = data;
      isUseId.value = true;
    },
    (error) => {
      console.log(error);
    }
  );
  isUseId.value = true;
}

const subjectErrMsg = ref("");
const contentErrMsg = ref("");

watch(
  () => article.value.title,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 30) {
      subjectErrMsg.value = "제목을 확인해 주세요!!!";
    } else subjectErrMsg.value = "";
  },
  { immediate: true }
);

watch(
  () => article.value.content,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 500) {
      contentErrMsg.value = "내용을 확인해 주세요!!!";
    } else contentErrMsg.value = "";
  },
  { immediate: true }
);

function onSubmit() {
  // event.preventDefault();

  if (subjectErrMsg.value) {
    alert(subjectErrMsg.value);
  } else if (contentErrMsg.value) {
    alert(contentErrMsg.value);
  } else {
    props.type === "regist" ? writeArticle() : updateArticle();
  }
}

function writeArticle() {
  console.log("글등록하자!!", article.value);
  registArticle(
    article.value,
    (response) => {
      let msg = "글등록 처리시 문제 발생했습니다.";
      if (response.status == 201) msg = "글등록이 완료되었습니다.";
      alert(msg);
      moveList();
    },
    (error) => console.log(error)
  );
}

function updateArticle() {
  console.log(article.value.articleNo + "번글 수정하자!!", article.value);
  modifyArticle(
    article.value,
    (response) => {
      let msg = "글수정 처리시 문제 발생했습니다.";
      if (response.status == 200) msg = "글정보 수정이 완료되었습니다.";
      alert(msg);
      moveList();
    },
    (error) => console.log(error)
  );
}

function moveList() {
  router.push({ name: "article-list" });
}
</script>

<template>
  <div class="flex">
    <form @submit.prevent="onSubmit">
      <div class="flex py-10">
        <div class="mb-3">
          <label for="subject" class="form-label px-3">제목</label>
          <input type="text" class="w-96" v-model="article.title" placeholder="제목" />
        </div>
        <div class="">
          <label for="userid" class="form-label px-3">작성자 ID</label>
          <input
            type="text"
            class=""
            v-model="article.userId"
            :disabled="isUseId"
            placeholder="작성자ID"
          />
        </div>
      </div>
      <div class="w-full flex flex-col">
        <!-- <label for="content" class="form-label">게시글</label> -->
        <textarea class="w-full" v-model="article.content" rows="10"></textarea>
      </div>

      <div class="pt-10 pb-24">
        <button
          type="submit"
          class="shadow-sm bg-point text-white px-3 py-1 rounded-xl"
          v-if="type === 'regist'"
        >
          글작성
        </button>
        <button type="submit" class="shadow-sm bg-point text-white px-3 py-1 rounded-xl" v-else>
          글수정
        </button>
        <button
          type="button"
          class="shadow-sm bg-[#222222] ml-3 text-white px-3 py-1 rounded-xl"
          @click="moveList"
        >
          목록
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
input,
textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
  color: #333;
  font-size: 14px;
}

input:focus,
textarea:focus {
  /* 클릭 시 테두리 제거 */
  outline: none;
}
</style>
