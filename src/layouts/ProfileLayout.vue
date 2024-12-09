<template>
    <t-layout style="background-color: white;">
        <t-content class="ProfileContent">
            <div class="content-container">
                <ProfileContentLayout :user="parsedData" />
                <ProfileAside class="profile-aside" :user="parsedData"/>
            </div>
        </t-content>
    </t-layout>
</template>

<script lang="ts" setup name="">
    import ProfileAside from '@/pages/profileView/ProfileAside.vue';
    import Header from '@/components/header/Header.vue';
    import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue';
    import {ref, watch ,computed} from 'vue'
    import { useUserStore } from '@/store/modules/userStore';
    import { useRoute } from 'vue-router';
    import type { UserState } from '@/store/types';
    import { Role } from '@/store/types';
import axios from 'axios';

    const useStore = useUserStore()
    const route = useRoute()

    const rawUser = ref<UserState>({
        userId: 0,
        verificationCode: '',
        userName: '',
        password: '',
        email: '',
        role: Role.Student,
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
        registrationDate: new Date(), // 或者其他默认值
    });
    const parsedData = ref<UserState>(rawUser.value);
    const error = ref<string | null>(null);

    const currentUserId = computed<number>(() => {
        const userIdParam = route.params.id;
        // 如果userIdParam是字符串，则尝试解析为数字；否则，使用默认值1
        return (typeof userIdParam === 'string' && !isNaN(parseInt(userIdParam, 10)))
        ? parseInt(userIdParam, 10)
        : 0;
    });
 
    // 监听currentUserId的变化，并在变化时重新获取数据
    watch(currentUserId, async (newUserId) => {
        if (newUserId != useStore.getNowUser().userId) {
            const responseGetInfo = await axios.get(`/api/users/info?id=${newUserId}`); // 发送GET请求到后端API
            console.log(responseGetInfo.data)
            if (responseGetInfo.data.result == 'ok') {
              console.log(responseGetInfo.data)
              try {
                // 尝试解析JSON字符串
                parsedData.value = JSON.parse(responseGetInfo.data.profile) as UserState;
                error.value = null; // 清除任何先前的错误
              } catch (e) {
              console.log(e)
                // 捕获解析错误
                error.value = 'Invalid JSON format!';
                parsedData.value = rawUser.value; // 清除解析后的数据
              }
              console.log(parsedData)
            }
        }
        else {
            parsedData.value = useStore.getNowUser();
        }
    }, {immediate:true});
    
</script>

<style scoped lang="scss">
    .ProfileContent {
        background-color: var(--background-color);
        width: 80%;
        margin: auto;
        display: flex;
        justify-content: center;
        padding: 20px;
    }
    .content-container {
        display: flex;
        align-items: flex-start; /* 确保子元素顶部对齐 */
        width: 100%;
    }
    .profile-aside {
        align-self: flex-start; /* 使 ProfileAside 高度根据内容调整 */
    }
</style>