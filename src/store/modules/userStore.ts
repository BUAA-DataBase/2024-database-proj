// stores/userStore.ts
import { defineStore } from 'pinia'
import type { PostState, UserState } from '../types'
import { Role } from '../types'
import axios from 'axios'
import { ErrorCode } from '@/constants/error-codes'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: 0,
    verificationCode: '',
    userName: '',
    password: '', // 通常密码不应该存储在前端，但这里是演示
    email: '',
    role: Role.Anonymous,
    major: '',
    grade: '',
    avatar: '',
    college: '',
    gender: '',
    followedCourses: [],
    followers: [],
    following: [],
    blockedUsers: [],
    posts: [],
    registrationDate: new Date()
  }),

  actions: {
    /** 登录操作 */
    login(userData: Partial<UserState>) {
      console.log(userData.verificationCode)
      if (userData.userName && userData.email && userData.verificationCode) {
        this.$patch(userData);
        this.saveUserToStorage();
        console.log("successfully log in!")
      } else {
        throw new Error('Invalid login credentials')
      }
    },

    saveUserToStorage() {
      localStorage.setItem('user', JSON.stringify(this.$state));
    },
    loadUserFromStorage() {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.$patch(JSON.parse(userData));
      }
    },
    clearUserFromStorage() {
      localStorage.removeItem('user');
      this.$reset();
    },

    /** 登出操作 */
    logout() {
      this.clearUserFromStorage(); // 使用 Pinia 提供的 $reset 方法恢复初始状态
    },

    getNowUser() :UserState{
      return this.$state;
    },

    /** 更新用户信息 */
    async updateProfile(profileData: Partial<UserState>) {
      Object.assign(this, profileData)
      try {
        console.log(this)
        const response = await axios.post(`/api/users/info?token=${this.verificationCode}`,{
            name: this.userName,
            email: this.email,
            profile: this
        }); // 发送GET请求到后端API
        console.log(response.data)
        if (response.data.result == 'ok') {
            console.log("Successfully upload!");
        }
      } catch (error :any) {
        console.log(error.response.data)
      console.error('Error fetching user info:', error);
      }
    },

    async updateAvatar(avatar : string) {
      this.avatar = `http://182.92.164.178:1024/${avatar}`;
      try {
        console.log(this.$state)
        const response = await axios.post(`/api/users/info?token=${this.verificationCode}`,{
            name: this.userName,
            email: this.email,
            profile: this
        }); // 发送GET请求到后端API
        console.log(response.data)
        if (response.data.result == 'ok') {
            console.log("Successfully upload!");
        }
      } catch (error :any) {
        console.log(error.response.data)
      console.error('Error fetching user info:', error);
      }
    },

    async pushPost(post : PostState) {
      if (post.postId != 0) {
        this.$state.posts.push(post);
        this.updateProfile(this.$state);
      }
    },

    /** 关注课程 */
    async followCourse(courseId : number) {
      if (!this.followedCourses.includes(courseId)) {
        this.followedCourses.push(courseId)
        try {
          console.log(this.verificationCode)
          const response = await axios.post(`/api/users/follow-course?token=${this.verificationCode}&follow_id=${courseId}`); // 发送GET请求到后端API
          console.log(response.data)
          if (response.data.result == 'ok') {
              console.log("Successfully upload!");
          }
        } catch (error : any) {
          console.log(error.response.data)
          console.error('Error fetching user info:', error);
        }
      }
    },

    /** 是否已关注课程 **/
    isFollowingCourse(courseId: number): boolean {
      return this.followedCourses.includes(courseId)
    },

    /** 取消关注课程 */
    async unfollowCourse(courseId: number) {
      if (this.followedCourses.includes(courseId)) {
        this.followedCourses = this.followedCourses.filter(id => id != courseId)
        try {
          console.log(this)
          const response = await axios.post(`/api/users/unfollow-course?token=${this.verificationCode}&follow_id=${courseId}`); // 发送GET请求到后端API
          console.log(response.data)
          if (response.data.result == 'ok') {
              console.log("Successfully upload!");
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    },

    /** 关注用户 */
    async followUser(userId: number) {
      if (!this.following.includes(userId)) {
        this.following.push(userId)
        try {
          console.log(this)
          const response = await axios.post(`/api/users/info?token=${this.verificationCode}`,{
              name: this.userName,
              email: this.email,
              profile: this
          }); // 发送GET请求到后端API
          console.log(response.data)
          if (response.data.result == 'ok') {
              console.log("Successfully upload!");
          }
        } catch (error) {
        console.error('Error fetching user info:', error);
        }
        try {
          console.log(this)
          const response = await axios.post(`/api/users/follow-user?token=${this.verificationCode}&follow_id=${userId}`); // 发送GET请求到后端API
          console.log(response.data)
          if (response.data.result == 'ok') {
              console.log("Successfully upload!");
          }
        } catch (error) {
        console.error('Error fetching user info:', error);
        }
      }
    },

    /** 取消关注用户 */
    unfollowUser(userId: number) {
      this.following = this.following.filter(id => id !== userId)
    },

    /** 屏蔽用户 */
    blockUser(userId: number) {
      if (!this.blockedUsers.includes(userId)) {
        this.blockedUsers.push(userId)
      }
    },

    /** 取消屏蔽用户 */
    unblockUser(userId: number) {
      this.blockedUsers = this.blockedUsers.filter(id => id !== userId)
    },

    /** 获取用户的角色 */
    getUserRole(): Role {
      return this.role
    }
  }
})