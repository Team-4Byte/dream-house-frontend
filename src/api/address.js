import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listSido(success, fail) {
  local.get(`/address/list`).then(success).catch(fail);
}

function listGugun(param, success, fail) {
  local.get(`/address/gugun/${param}`).then(success).catch(fail);
}

function listDong(param, success, fail) {
  local.get(`/address/dong/${param}`).then(success).catch(fail);
}

export { listSido, listGugun, listDong };
