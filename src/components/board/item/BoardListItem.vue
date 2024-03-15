<script setup>
const props = defineProps({ article: Object, pgno: Number });
</script>

<template>
  <router-link
    :to="{
      name: 'article-view',
      params: { articleno: article.articleNo, pgno: props.pgno, name: article.userName },
    }"
    class="article-title link-dark"
  >
    <div class="flex justify-around shadow-sm hover:shadow-md hover:border-point">
      <table class="tlb">
        <tr class="text-center">
          <th scope="row">{{ article.articleNo }}</th>
          <td class="">
            {{ article.title }}
          </td>
          <td>{{ article.userName }}</td>
          <td>{{ article.hit }}</td>
          <td>{{ article.createTime }}</td>
        </tr>
      </table>
    </div>
  </router-link>
</template>

<style scoped>
a {
  text-decoration: none;
}
th {
  text-align: center;
  font-weight: 500;
  color: #222222;
  text-transform: uppercase;
}
td {
  text-align: center;
  vertical-align: middle;
  font-weight: 300;
  color: #222222;
}

div {
  border: solid 0.5px rgba(21, 21, 21, 0.1);
  border-radius: 10rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  margin-bottom: 0.5rem;
}

table {
  width: 100%;
  table-layout: fixed;
}
</style>
