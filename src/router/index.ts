import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";
import LatestCommentsList from "@/pages/LatestReviewList.vue";
import CourseList from "@/pages/CourseList.vue";

const routes = [
    {
        path: "/courses",
        component: CourseList,
    },
    {
        path: "/latestComments",
        component: LatestCommentsList,
    },
    {
        path: "/",
        redirect: "/latestComments",
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;