<template>
    <t-layout style="background-color: white;">
        <t-content class="ProfileContent">
            <div class="content-container">
                <ProfileContentLayout 
                    :user="parsedData" 
                    :isMyProfile="isMyProfile"
                    @custom-event-forwarded-triple="handleCustomEvent"
                    @refetch="refetch"
                />
                <ProfileAside class="profile-aside" 
                    :user="parsedData"
                    :followData="followListAlter"
                    @refetch="refetch"
                />
            </div>
        </t-content>
    </t-layout>
</template>

<script lang="ts" setup name="">
    import ProfileAside from '@/pages/profileView/ProfileAside.vue';
    import Header from '@/components/header/Header.vue';
    import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue';
    import {ref, watch ,computed, onMounted} from 'vue'
    import { useUserStore } from '@/store/modules/userStore';
    import type { UserState } from '@/store/types';
    import { Role } from '@/store/types';
    import axios from 'axios';
    import { useRoute } from 'vue-router';

    const useStore = useUserStore()
    const route = useRoute()
    const useroute = useRoute()

    const myId = useStore.getNowUser().userId;
    const thisId = parseInt(useroute.params.id as string);

    const isMyProfile = ref(myId === thisId);

    const rawUser = ref<UserState>({
        userId: 0,
        verificationCode: '',
        userName: '',
        email: '',
        role: Role.Student,
        major: '',
        introduction: '',
        grade: '',
        avatar: '',
        gender: '',
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

    async function refetch() {
        console.log('refetch!')
        if (currentUserId.value != useStore.getNowUser().userId) {
            const responseGetInfo = await axios.get(`/api/users/info?id=${currentUserId.value}`); // 发送GET请求到后端API
            console.log(responseGetInfo)
            if (responseGetInfo.data.result == 'ok') {
              try {
                // 尝试解析JSON字符串
                parsedData.value = JSON.parse(responseGetInfo.data.profile) as UserState;
                console.log(parsedData.value)
                error.value = null; // 清除任何先前的错误
              } catch (e) {
                // 捕获解析错误
                error.value = 'Invalid JSON format!';
                parsedData.value = rawUser.value; // 清除解析后的数据
              }
            }
        }
        else {
            parsedData.value = useStore.getNowUser();
        }
    }
 
    // 监听currentUserId的变化，并在变化时重新获取数据
    watch(currentUserId, async (newUserId) => {
        if (newUserId != useStore.getNowUser().userId) {
            const responseGetInfo = await axios.get(`/api/users/info?id=${newUserId}`); // 发送GET请求到后端API
            console.log(responseGetInfo)
            if (responseGetInfo.data.result == 'ok') {
              try {
                // 尝试解析JSON字符串
                parsedData.value = JSON.parse(responseGetInfo.data.profile) as UserState;
                console.log(parsedData.value)
                error.value = null; // 清除任何先前的错误
              } catch (e) {
                // 捕获解析错误
                error.value = 'Invalid JSON format!';
                parsedData.value = rawUser.value; // 清除解析后的数据
              }
            }
        }
        else {
            console.log("fetch from store!")
            parsedData.value = useStore.getNowUser();
            console.log(parsedData.value)
        }
    }, {immediate:true});
    
    
    const followListAlter = ref(-1)

    const handleCustomEvent = (data:number) => {
        // 处理从 A 组件传递过来的数据
        followListAlter.value = data;
    };
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