import { createRouter, createWebHistory } from 'vue-router'

import LatestCommentsList from '@/pages/LatestReviewList.vue'
import CourseList from '@/pages/CourseList.vue'
import Login from '@/components/login_register/LoginComponent.vue'
import Register from '@/components/login_register/RegisterComponent.vue'
import User from '@/layouts/ProfileLayout.vue'
import Course from '@/layouts/CourseHomeLayout.vue'

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
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
