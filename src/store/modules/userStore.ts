import { defineStore } from 'pinia'
import type { UserState } from '../types'
import { Role } from '../types'

// 样例中先从本地导入头像
import Avatar from '@/assets/img_avatar.jpg'

const defaultAvatar = Avatar

const useUserStore = defineStore('user-info', {
    state: () => {
        return {
            userName: 'jojo',
            password:'20030929',
            email: '1392676693@qq.com',
            role: Role.Student,
            major: '计算机科学与技术',
            grade: '3',
            college: '计算机学院',
            gender: '男',
            avatar: defaultAvatar,
            // 暂且用作字符串
            followedPosts: [] as string[],
            followers: [] as string[],
            following: [] as string[],
            blockedUsers: [] as string[],
            registrationDate: new Date(),
        }
    },
    actions: {
        saveUser(userInfo: UserState) {
            return new Promise<UserState>((resolve) => {
                this.userName = userInfo.userName
                this.password = userInfo.password
                this.email = userInfo.email
                this.role = userInfo.role
                this.major = userInfo.major
                this.grade = userInfo.grade
                this.college = userInfo.college
                this.gender = userInfo.gender
                this.avatar = userInfo.avatar || defaultAvatar
                this.followedPosts = userInfo.followedPosts
                this.followers = userInfo.followers
                this.following = userInfo.following
                this.blockedUsers = userInfo.blockedUsers
                this.registrationDate = userInfo.registrationDate
                resolve(userInfo)
            })
        },
        changeUserName(newUserName: string) {
            this.userName = newUserName
        },
        logout() {
            return new Promise<void>((resolve) => {
                this.$reset()
                localStorage.clear()
                sessionStorage.clear()
                resolve()
            })
        },
    },
    // presist: {
    //     enable: true,
    //     resetToState: true,
    //     option: {
    //         exclude: ['userName'],
    //     },
    // },
})

export default useUserStore