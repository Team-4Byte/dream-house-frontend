import { localAxios } from "@/util/http-commons";

const local = localAxios();

function getAptListByGugun(param, success, fail) {
  local.get(`/house/list/gugun/${param}`).then(success).catch(fail);
}

function getAptListByDong(param, success, fail) {
  local.get(`/house/list/dong/${param}`).then(success).catch(fail);
}

function getAptListTop3(success, fail) {
  local.get(`/house/list/five`).then(success).catch(fail);
}

function getAptTransaction(param, success, fail) {
  local.get(`/house/deal/apt/${param}`).then(success).catch(fail);
}

function getHouseInfoByaptName(param, success, fail) {
  local.get(`/house/name/${param}`).then(success).catch(fail);
}
function postBookmark(bookmark, success, fail) {
  console.log("bookmark", bookmark);
  local.post(`/board`, JSON.stringify(bookmark)).then(success).catch(fail);
}
// function getBookmark(param, success, fail) {
//   local.get(`/house/${param}`).then(success).catch(fail);
// }

export {
  getAptListByGugun,
  getAptListTop3,
  getAptListByDong,
  getAptTransaction,
  getHouseInfoByaptName,
  postBookmark,
};
