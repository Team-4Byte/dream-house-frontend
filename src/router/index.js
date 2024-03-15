import { createRouter, createWebHistory } from "vue-router";
import TheMainView from "../views/TheMainView.vue";
import TheNotifyView from "../views/TheNotifyView.vue";
import TheMypageView from "../views/TheMypageView.vue";
import TheLoginView from "../views/TheLoginView.vue";
import TheMapView from "../views/TheMapView.vue";
import TheSignUpView from "../views/TheSignUpView.vue";
import TheCommunityView from "../views/TheCommunityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMainView,
    },
    {
      path: "/notice",
      name: "notice",
      component: TheNotifyView,
      // redirect: { name: "notice-list" },
      // children: [
      //   {
      //     path: "notice-lsit",
      //     name: "notice-lsit",
      //     component: () => import("@/components/board/BoardDetail.vue"),
      //   },
      //   {
      //     path: "notice/:noticeNo",
      //     name: "notice-detail",
      //     component: () => import("@/components/board/BoardDetail.vue"),
      //   },
      // ],
    },
    {
      path: "/community",
      name: "community",
      component: TheCommunityView,
      redirect: { name: "article-list" },
      children: [
        {
          path: "list",
          name: "article-list",
          props: true,
          component: () => import("@/components/board/BoardList.vue"),
        },
        {
          path: "view/:articleno:pgno:name",
          name: "article-view",
          props: true,
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
          path: "write",
          name: "article-write",
          component: () => import("@/components/board/BoardWrite.vue"),
        },
        {
          path: "modify/:articleno",
          name: "article-modify",
          component: () => import("@/components/board/BoardModify.vue"),
        },
      ],
    },

    {
      path: "/map",
      name: "map",
      component: TheMapView,
      props: true,
    },
    {
      path: "/mypage",
      name: "mypage",
      component: TheMypageView,
    },
    {
      path: "/signup",
      name: "signup",
      component: TheSignUpView,
    },
    {
      path: "/login",
      name: "login",
      component: TheLoginView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
