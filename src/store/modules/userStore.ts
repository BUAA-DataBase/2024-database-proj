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
      if (userData.userName && userData.email && userData.verificationCode) {
        this.$patch(userData);
        this.saveUserToStorage();
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
        const response = await axios.post(`/api/users/info?token=${this.verificationCode}`,{
            name: this.userName,
            email: this.email,
            profile: this
        }); // 发送GET请求到后端API
        if (response.data.result == 'ok') {
            console.log("Successfully upload!");
        }
      } catch (error :any) {
      console.error('Error fetching user info:', error);
      }
    },

    async updateAvatar(avatar : string) {
      this.avatar = `http://182.92.164.178:1024/${avatar}`;
      try {
        const response = await axios.post(`/api/users/info?token=${this.verificationCode}`,{
            name: this.userName,
            email: this.email,
            profile: this
        }); // 发送GET请求到后端API
        if (response.data.result == 'ok') {
            console.log("Successfully upload!");
        }
      } catch (error :any) {
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
          const response = await axios.post(`/api/users/follow-course?token=${this.verificationCode}&follow_id=${courseId}`); // 发送GET请求到后端API
          if (response.data.result == 'ok') {
              console.log("Successfully upload!");
          }
        } catch (error : any) {
          console.error('Error fetching user info:', error);
        }
      }
    },

    /** 是否已关注课程 **/
    async isFollowingCourse(courseId: number): Promise<boolean> {
      const followCourses = await this.getFollowCourses(this.userId)
      return followCourses.includes(courseId)
    },

    /** 取消关注课程 */
    async unfollowCourse(courseId: number) {
      if (this.followedCourses.includes(courseId)) {
        this.followedCourses = this.followedCourses.filter(id => id != courseId)
        try {
          const response = await axios.post(`/api/users/unfollow-course?token=${this.verificationCode}&unfollow_id=${courseId}`); // 发送GET请求到后端API
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
        this.following.push(userId)
        try {
          const response = await axios.post(`/api/users/follow-user?token=${this.verificationCode}&follow_id=${userId}`); // 发送GET请求到后端API
          if (response.data.result == 'ok') {
              console.log("Successfully upload!");
          }
        } catch (error) {
        console.error('Error fetching user info:', error);
        }
    },

    /** 取消关注用户 */
    async unfollowUser(userId: number) {
        try {
          const response = await axios.post(`/api/users/unfollow-user?token=${this.verificationCode}&unfollow_id=${userId}`); // 发送GET请求到后端API
          if (response.data.result == 'ok') {
              console.log("Successfully upload!");
          }
        } catch (error) {
        console.error('Error fetching user info:', error);
        }
    },

    async likeComment(commentId : number) {
      try {
        const response = await axios.post(`/api/users/like-comment?token=${this.verificationCode}&comment_id=${commentId}`)
        console.log(response.data)
        if (response.data.result == 'ok') {
          console.log("赞赞赞赞赞！")
        }
        else {
          try {
            const responseUnlike = await axios.post(`/api/users/unlike-comment?token=${this.verificationCode}&comment_id=${commentId}`)
            console.log(responseUnlike.data);
          }
          catch(error : any) {
            console.log(error.response);
          }
        }
      }
      catch (error : any) {
        console.log(error.response.data);
      }
    },
    
    async likePost(postId : number) {
      try {
        const response = await axios.post(`/api/users/like-post?token=${this.verificationCode}&post_id=${postId}`)
        console.log(response.data.result);
        console.log("I'm in the likePost!")
      }
      catch (error : any) {
        console.log(error.response.data);
      }
    },

    async getFollowings(userId:number) : Promise<number[]> {
      try {
        const response = await axios.get(`/api/users/followings?id=${userId}`); // 发送GET请求到后端API
        const followings = response.data.followings;
          if (followings) {
            return followings;
          }
          else {
            return [];
          }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
      return [];
    },

    async getFollowers(userId:number) : Promise<number[]> {
      try {
        const response = await axios.get(`/api/users/followers?id=${userId}`); // 发送GET请求到后端API
        const followers = response.data.followers;
          if (followers) {
            return followers;
          }
          else {
            return [];
          }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
      return [];
    },

    async getFollowCourses(userId:number) : Promise<number[]> {
      try {
        const response = await axios.get(`/api/users/following-courses?id=${userId}`); // 发送GET请求到后端API
        const courses = response.data.following_courses;
          if (courses) {
            return courses;
          }
          else {
            return [];
          }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
      return [];
    },

    async getPosts(userId:number) : Promise<number[]> {
      try {
        const response = await axios.get(`/api/posts/list?id=${userId}`); // 发送GET请求到后端API
        const posts = response.data.posts;
        if (response.data.result == 'ok') {
          if (posts) {
            return posts;
          }
          else {
            return [];
          }
        }
        else {
          return [];
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
      return [];
    },

  }
})