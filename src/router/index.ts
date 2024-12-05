import { createRouter, createWebHistory } from 'vue-router'

import LatestCommentsList from '@/pages/LatestReviewList.vue'
import CourseList from '@/pages/CourseList.vue'
import Login from '@/components/login_register/LoginComponent.vue'
import Register from '@/components/login_register/RegisterComponent.vue'
import User from '@/pages/ProfileContent.vue' //不太对
import Course from '@/components/course/CourseItem.vue'

const routes = [
  {
    path: '/courses',
    name: 'courses',
    component: CourseList,
    //props: true
  },
  {
    path: '/latestComments',
    name: 'latestComments',
    component: LatestCommentsList,
    //props: true
  },
  {
    path: '/user',
    //name: 'user',
    component: User,
    //props: true
  },
  {
    path: '/course/:id',
    name: 'course',
    component: Course,
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
    redirect: '/latestComments',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
