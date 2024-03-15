<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { detailArticle, deleteArticle } from "@/api/board";

const route = useRoute();
const router = useRouter();

const props = defineProps({ pgno: Number, name: String });
console.log(props.name);

// const articleno = ref(route.params.articleno);
const { articleno } = route.params;

const article = ref({});

const userName = ref(props.name);

onMounted(() => {
  getArticle();
});

const getArticle = () => {
  // const { articleno } = route.params;
  console.log(articleno + "번글 얻으러 가자!!!");
  detailArticle(
    articleno,
    ({ data }) => {
      article.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

function moveList() {
  router.push({ name: "article-list", query: { pgno: props.pgno } });
}

function moveModify() {
  router.push({ name: "article-modify", params: { articleno, userName } });
}

function onDeleteArticle() {
  // const { articleno } = route.params;
  console.log(articleno + "번글 삭제하러 가자!!!");
  deleteArticle(
    articleno,
    (response) => {
      if (response.status == 200) moveList();
    },
    (error) => {
      console.log(error);
    }
  );
}
</script>

<template>
  <div class="pt-20 w-screen h-[calc(100vh - 5rem)]">
    <form @submit.prevent="onSubmit">
      <div
        class="flex flex-col justify-center items-center w-[50vw] m-auto shadow-md mt-5 rounded-[3rem] px-14 pt-10"
      >
        <div class="flex items-end w-full justify-between h-20 m-auto">
          <div class="flex flex-col items-start w-3/5">
            <div class="font-semibold text-lg">
              <!-- 제목 -->
              {{ article === undefined ? "" : article.title }}
            </div>
            <div class="flex gap-4">
              <div>
                <!-- 글번호 -->
                {{ article === undefined ? "" : article.articleNo }}
              </div>
              <div>
                <!-- 글쓴이 -->
                {{ article === undefined ? "" : article.userId }}
              </div>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="mb-3">
              <!-- 조회수 -->
              조회수 &nbsp;
              {{ article === undefined ? "" : article.hit }}
            </div>
            <div class="mb-3">
              <!-- 생성시간 -->
              00:00
              {{ article === undefined ? "" : article.createTime }}
            </div>
          </div>
        </div>

        <div class="w-full flex flex-col h-80 py-10 text-start">
          <!-- 글내용 -->
          {{ article === undefined ? "" : article.content }}
        </div>

        <div class="pt-10 pb-24">
          <button
            type="submit"
            class="shadow-md border-[1px] border-point ml-3 text-black px-3 py-1 rounded-xl"
            @click="moveModify"
          >
            글수정
          </button>
          <button
            type="submit"
            class="shadow-md bg-point ml-3 text-white px-3 py-1 rounded-xl"
            @click="moveList"
          >
            목록
          </button>
          <button
            type="button"
            class="shadow-md bg-[#222222] ml-3 text-white px-3 py-1 rounded-xl"
            @click="onDeleteArticle"
          >
            글삭제
          </button>
        </div>
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
