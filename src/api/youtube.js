import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function getYoutubeList(success, fail) {
  console.log("youtube get!");
  await local.get("/search/").then(success).catch(fail);
  console.log(":)");
}

export { getYoutubeList };
