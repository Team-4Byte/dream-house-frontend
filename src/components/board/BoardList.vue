<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { listArticle } from "@/api/board.js";

import VSelect from "@/components/common/VSelect.vue";
import BoardListItem from "@/components/board/item/BoardListItem.vue";
import PageNavigation from "@/components/common/PageNavigation.vue";
import TheFooter from "../layout/TheFooter.vue";

const router = useRouter();

const getPgno = ref(router.currentRoute.value.query.pgno);

const selectOption = ref([
  { text: "검색조건", value: "" },
  { text: "글번호", value: "articleNo" },
  { text: "제목", value: "title" },
  { text: "작성자아이디", value: "userId" },
]);

const articles = ref([]);
const currentPage = ref(getPgno.value);
const totalPage = ref();
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;
const param = ref({
  pgno: currentPage.value,
  spp: VITE_ARTICLE_LIST_SIZE,
  key: "",
  word: "",
});

onMounted(() => {
  getArticleList();
});

const changeKey = (val) => {
  param.value.key = val;
};

const getArticleList = () => {
  console.log(param.value);
  listArticle(
    param.value,
    ({ data }) => {
      // console.log(data);
      articles.value = data.articles;
      currentPage.value = data.currentPage;
      totalPage.value = data.totalPageCount;
    },
    (error) => {
      console.log(error);
    }
  );
};

const onPageChange = (val) => {
  currentPage.value = val;
  param.value.pgno = val;
  getArticleList();
};

const moveWrite = () => {
  router.push({ name: "article-write" });
};
</script>

<template>
  <div class="pt-20 w-screen h-[calc(100vh - 5rem)]">
    <div class="w-full">
      <div class="w-full px-48">
        <div class="w-full flex justify-between py-7 px-5">
          <div class="">
            <form class="flex">
              <VSelect :selectOption="selectOption" @onKeySelect="changeKey" />
              <input type="text" class="mx-3" v-model="param.word" placeholder="검색어..." />
              <button
                class="rounded-xl flex justify-center items-center shadow-md bg-point text-white px-4 py-1"
                type="button"
                @click="getArticleList"
              >
                검색
              </button>
            </form>
          </div>
          <button
            type="button"
            class="rounded-xl flex justify-center items-center shadow-md bg-[#222222] text-white px-4 py-1"
            @click="moveWrite"
          >
            글쓰기
          </button>
        </div>

        <div class="tbl-header">
          <table class="w-full">
            <thead>
              <tr class="">
                <th scope="col">글번호</th>
                <th scope="col">제목</th>
                <th scope="col">작성자</th>
                <th scope="col">조회수</th>
                <th scope="col">작성일</th>
              </tr>
            </thead>
          </table>
        </div>

        <div class="tbl-content">
          <table>
            <tbody>
              <BoardListItem
                v-for="article in articles"
                :key="article.articleNo"
                :article="article"
                :pgno="currentPage"
              ></BoardListItem>
            </tbody>
          </table>
        </div>
      </div>

      <PageNavigation
        :current-page="currentPage"
        :total-page="totalPage"
        @pageChange="onPageChange"
      ></PageNavigation>
    </div>
    <TheFooter />
  </div>
</template>

<style scoped></style>
