<script setup>
import { getYoutubeList } from "../../api/youtube.js";
import { ref, onMounted } from "vue";
import { httpStatusCode } from "@/util/http-status";

const list = ref([]);
const getList = async () => {
  await getYoutubeList(
    (res) => {
      if (res.status === httpStatusCode.OK) {
        res.data.forEach((e) => {
          console.log(e);

          const dateObject = new Date(e.snippet.publishTime);
          const year = dateObject.getFullYear();
          const month = dateObject.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.

          const url = `https://www.youtube.com/watch?v=${e.id.videoId}`;
          list.value.push({
            title: e.snippet.title,
            channelTitle: e.snippet.channelTitle,
            url: url,
            thumbnail: e.snippet.thumbnails.high,
            publishYear: year,
            publishMonth: month,
          });
        });
        console.log(list.value);
        console.log("url: ", list.value[0].thumbnail.url);
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

onMounted(() => {
  getList();
});
</script>

<template>
  <div
    id="container"
    class="flex flex-col p-14 box bg-gray-300 w-3/6 h-[30rem] rounded-2xl z-20 relative bottom-36"
  >
    <div class="text-3xl font-lright text-black">부동산 꿀팁 추천 영상</div>
    <div v-for="item in list" :key="item.videoId">
      <div class="flex justify-between items-center border-b-[0.3px] border-black/20 py-2">
        <!-- <div class="centered-vertical-image-container">
          <img
            :src="item.thumbnail.url"
            :alt="item.title"
            class="centered-vertical-image"
          />
        </div> -->
        <a :href="item.url" class="py-2" target="_blank">
          <div class="flex gap-3">
            <div
              class="pr-2 inline-block bg-violet-400 text-white rounded-xl leading-4 px-2 py-[1px] text-xs"
            >
              {{ item.channelTitle }}
            </div>
            <div
              class="pr-2 inline-block bg-black/40 text-white rounded-xl leading-4 px-2 py-[1px] text-xs"
            >
              {{ item.publishYear }}
            </div>
            <div
              class="pr-2 inline-block bg-black/80 text-white rounded-xl leading-4 px-2 py-[1px] text-xs"
            >
              {{ item.publishMonth }}
            </div>
          </div>
          <div id="title" class="text-white font-light text-lg pr-4 leading-2  text-light">
            {{ item.title }}
          </div>

          <div id="title" class="text-white font-light text-lg pr-4 leading-2 ">
            {{ item.viewCount }}
          </div>
        </a>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="#b18cfe"
            viewBox="0 0 256 256"
          >
            <path
              d="M128,32a96,96,0,1,0,96,96A96,96,0,0,0,128,32ZM112,160V96l48,32Z"
              opacity="0.2"
            ></path>
            <path
              d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm36.44-94.66-48-32A8,8,0,0,0,104,96v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,145.05V111l25.58,17Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  border-radius: 40px;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.15);
}

#container {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 20px 0 rgba(125, 126, 128, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* 이미지를 감싸는 부모 요소에 overflow 속성을 추가 */
.centered-vertical-image-container {
  overflow: hidden;
  width: 150px; /* 원하는 가로 크기로 조절하세요 */
  height: 85px; /* 원하는 세로 크기로 조절하세요 */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 이미지를 세로로 중앙에 맞춰 자르기 */
.centered-vertical-image {
  width: 100%; /* 부모 요소의 가로 크기에 맞게 이미지 크기를 100%로 설정 */
  height: auto; /* 높이를 자동으로 설정하여 비율 유지 */
  object-fit: cover; /* 이미지가 부모 요소에 맞게 자르기 */
  object-position: center; /* 이미지를 세로로 중앙에 맞춤 */
}

/* #title:hover {
  color: black;
} */
</style>
