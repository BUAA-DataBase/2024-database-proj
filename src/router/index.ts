import { createRouter, createWebHistory } from 'vue-router'

import LatestCommentsList from '@/pages/LatestReviewList.vue'
import CourseList from '@/pages/CourseList.vue'
import Login from '@/components/login_register/LoginComponent.vue'
import Register from '@/components/login_register/RegisterComponent.vue'
import User from '@/layouts/ProfileLayout.vue'
import Course from '@/layouts/CourseHomeLayout.vue'
import Editor from '@/components/editor/PostEditor.vue'

const routes = [
  {
    path: '/courses/:page',
    name: 'courses',
    component: CourseList,
    props: true
  },
  {
    path: '/latestComments/:page',
    name: 'latestComments',
    component: LatestCommentsList,
    props: true
  },
  {
    path: '/editor/:courseId/:userId',
    name: 'editor',
    component: Editor,
    props: true
  },
  {
    path: '/course/:id/:reviewId?',
    name: 'course',
    component: Course,
    props: true
  },
  {
    path: '/user/:id',
    name: 'user',
    component: User,
    props: true
  },
  {
    path: '/login',
    component: Login,
    meta: {default: true},
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'RedirectToLogin',
    redirect: '/login'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to, from) => {
  // 检查目标路由的名称是否为'course'且params中是否包含reviewId
  if (to.name === 'course' && to.params.reviewId) {
    // 如果条件满足，则不执行滚动操作
    // 可以选择在这里添加一些日志或其他逻辑
  } else {
    // 如果条件不满足，则滚动到页面顶部
    window.scrollTo(0, 0);
  }
});

export default router
