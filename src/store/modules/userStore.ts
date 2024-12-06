// stores/userStore.ts
import { defineStore } from 'pinia'
import type { UserState } from '../types'
import { Role } from '../types'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: 0,
    userName: '',
    password: '', // 通常密码不应该存储在前端，但这里是演示
    email: '',
    role: Role.Anonymous,
    major: '',
    grade: '',
    avatar: '',
    college: '',
    gender: '',
    followedPosts: [],
    followers: [],
    following: [],
    blockedUsers: [],
    registrationDate: new Date()
  }),

  actions: {
    /** 登录操作 */
    login(userData: Partial<UserState>) {
      if (userData.userName && userData.password) {
        // 模拟登录逻辑
        this.userId = userData.userId || 0
        this.userName = userData.userName
        //this.password = userData.password 
        // 不建议存储密码，仅为演示
        this.email = userData.email || ''
        this.role = Role.Student
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

    /** 更新用户信息 */
    updateProfile(profileData: Partial<UserState>) {
      Object.assign(this, profileData)
    },

    /** 关注帖子 */
    followPost(postId: string) {
      if (!this.followedPosts.includes(postId)) {
        this.followedPosts.push(postId)
      }
    },

    /** 取消关注帖子 */
    unfollowPost(postId: string) {
      this.followedPosts = this.followedPosts.filter(id => id !== postId)
    },

    /** 关注用户 */
    followUser(userId: string) {
      if (!this.following.includes(userId)) {
        this.following.push(userId)
      }
    },

    /** 取消关注用户 */
    unfollowUser(userId: string) {
      this.following = this.following.filter(id => id !== userId)
    },

    /** 屏蔽用户 */
    blockUser(userId: string) {
      if (!this.blockedUsers.includes(userId)) {
        this.blockedUsers.push(userId)
      }
    },

    /** 取消屏蔽用户 */
    unblockUser(userId: string) {
      this.blockedUsers = this.blockedUsers.filter(id => id !== userId)
    },

    /** 获取用户的角色 */
    getUserRole(): Role {
      return this.role
    }
  }
})