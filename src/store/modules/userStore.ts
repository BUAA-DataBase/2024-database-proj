// stores/userStore.ts
import { defineStore } from 'pinia'
import type { UserState } from '../types'
import { Role } from '../types'
import axios from 'axios'

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
      if (userData.userName && userData.email && userData.verificationCode) {
        // 模拟登录逻辑
        this.userId = userData.userId || 0
        this.verificationCode = userData.verificationCode || ''
        this.userName = userData.userName || ''
        this.email = userData.email || ''
        this.role = userData.role || Role.Student
        this.major = userData.major || ''
        this.grade = userData.grade || ''
        this.avatar = userData.avatar || ''
        this.college = userData.college || ''
        this.gender = userData.gender || ''
        this.registrationDate = userData.registrationDate || new Date()
      } else {
        throw new Error('Invalid login credentials')
      }
    },

    /** 登出操作 */
    logout() {
      this.$reset() // 使用 Pinia 提供的 $reset 方法恢复初始状态
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
      } catch (error) {
      console.error('Error fetching user info:', error);
      }
    },

    /** 关注帖子 */
    followPost(postId: number) {
      if (!this.followedCourses.includes(postId)) {
        this.followedCourses.push(postId)
      }
    },

    /** 取消关注帖子 */
    unfollowPost(postId: number) {
      this.followedCourses = this.followedCourses.filter(id => id !== postId)
    },

    /** 关注用户 */
    followUser(userId: number) {
      if (!this.following.includes(userId)) {
        this.following.push(userId)
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