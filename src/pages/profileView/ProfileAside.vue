<template>
        <div class="profileCard">
            <t-space direction="vertical">
                <span class="profileUsername">{{ props.user.userName }}</span>
                <t-space v-if="userStore.getNowUser().userId != props.user.userId" style="margin-top: 10px;">
                    <t-button v-if="!isFollowing" @click="followUser">
                        <template #icon>
                            <HeartIcon />
                        </template>
                        关注
                    </t-button>
                    <t-button v-if="isFollowing" @click="unfollowUser" style="padding: 0 20px;">
                        已关注
                    </t-button>

                    <t-button theme="default">
                        <template #icon>
                            <ChatBubbleIcon />
                        </template>
                        私聊
                    </t-button>
                </t-space>

                <t-divider/>

                <div class="introductionContainer">
                    <span class="introduction">{{ introduction }}</span>
                </div>

                <t-divider/>

                <t-space direction="vertical">
                    <t-space>
                        <span class="countTitle">关注了</span>
                        <span class="countContent">{{ followingsNumber }}</span>
                        <span class="countTitle">人</span>
                    </t-space>
                    <t-space>
                        <span class="countTitle">被关注</span>
                        <span class="countContent">{{ followersNumber }}</span>
                        <span class="countTitle">人</span>
                    </t-space>
                    <t-space>
                        <span class="countTitle">关注了</span>
                        <span class="countContent">{{ coursesNumber }} </span>
                        <span class="countTitle">门课程</span>
                    </t-space>
                    <t-space>
                        <span class="countTitle">发表了</span>
                        <span class="countContent">{{ postsNumber }} </span>
                        <span class="countTitle">篇点评</span>
                    </t-space>
                </t-space>
            </t-space>
        </div>
</template>

<script lang="ts" setup name="">
    import {computed, ref, watch, type PropType} from 'vue'
    import avatarImage from '@/assets/img_avatar.jpg'
    import { HeartIcon, ChatBubbleIcon } from 'tdesign-icons-vue-next';
    import type { UserState } from '@/store/types';
    import { useUserStore } from '@/store/modules/userStore';
    import { useRouter } from 'vue-router';

    const props = defineProps({
        user: {
            type: Object as PropType<UserState>,
            required: true
        },
    });

    const userStore = useUserStore();

    const isFollowing = ref(false);
    const isLoading = ref(true);

    const updateFollowingStatus = async () => {
        try {
            const followers = await userStore.getFollowers(props.user.userId);
            isFollowing.value = followers.includes(userStore.getNowUser().userId);
            console.log(followers);
            console.log(isFollowing.value)
        } catch (error) {
            console.error('Failed to fetch followers:', error);
            // 可以根据需要处理错误
        } finally {
            isLoading.value = false;
        }
    };

    watch(props,async (newProps) => {
        if (userStore.getNowUser().userId) {
            isLoading.value = true;
            await updateFollowingStatus();
        }
    }, {immediate: true, deep: true})

    const introduction = ref('2022计科人一枚~')
    const router = useRouter()

    async function followUser() {
        if (userStore.getNowUser().userId != 0 && props.user.userId != userStore.getNowUser().userId) {
            userStore.followUser(props.user.userId);
            isFollowing.value = true;
            followersNumber.value = followersNumber.value + 1;
        }
        else if (userStore.getNowUser().userId == 0) {
            alert("请先登录！")
            router.push({path:"/login"})
        }
    }

    async function unfollowUser() {
        if (userStore.getNowUser().userId != 0 && props.user.userId != userStore.getNowUser().userId) {
            userStore.unfollowUser(props.user.userId);
            isFollowing.value = false;
            followersNumber.value = followersNumber.value - 1;
        }
        else if (userStore.getNowUser().userId == 0) {
            alert("请先登录！")
            router.push({path:"/login"})
        }
    }

    const postsNumber = ref<number>(0);
    const followingsNumber = ref<number>(0);
    const followersNumber = ref<number>(0);
    const coursesNumber = ref<number>(0);

    async function fetchPostsNumber(userId: number) {
        try {
            postsNumber.value = (await userStore.getPosts(userId)).length as number; // 等待 Promise 解析
            console.log('Number of posts:', postsNumber.value); // 现在这里将打印出实际的数字，而不是 Promise 对象
        } catch (error) {
            console.error('Error fetching posts number:', error);
        }
    }

    async function fetchFollowingsNumber(userId: number) {
        try {
            followingsNumber.value = (await userStore.getFollowings(userId)).length as number; // 等待 Promise 解析
            console.log('Number of posts:', followingsNumber.value); // 现在这里将打印出实际的数字，而不是 Promise 对象
        } catch (error) {
            console.error('Error fetching posts number:', error);
        }
    }

    async function fetchFollowersNumber(userId: number) {
        try {
            followersNumber.value = (await userStore.getFollowers(userId)).length as number; // 等待 Promise 解析
            console.log('Number of posts:', followersNumber.value); // 现在这里将打印出实际的数字，而不是 Promise 对象
        } catch (error) {
            console.error('Error fetching posts number:', error);
        }
    }

    async function fetchCoursesNumber(userId: number) {
        try {
            coursesNumber.value = (await userStore.getFollowCourses(userId)).length as number; // 等待 Promise 解析
            console.log('Number of posts:', coursesNumber.value); // 现在这里将打印出实际的数字，而不是 Promise 对象
        } catch (error) {
            console.error('Error fetching posts number:', error);
        }
    }

    watch(props,(newProps) => {
        fetchCoursesNumber(props.user.userId);
        fetchFollowingsNumber(props.user.userId);
        fetchFollowersNumber(props.user.userId);
        fetchPostsNumber(props.user.userId);
    }, {immediate:true,deep:true})
</script>

<style scoped lang="scss">
    .profileCard {
        padding: 30px;
        background-color: var(--card-color);
        border-radius: 8px;
        box-shadow: 0 2px 4px 0 var(--border-color);
        margin: 20px;
        width: 250px;

        display: flex; /* 启用 Flexbox 布局 */
        flex-direction: column; /* 使子元素垂直排列 */
        align-items: center; /* 水平居中 */
    }
    .profileUsername {
        font-size: 17px;
        font-weight: bold;
    }
    .introduction {
        font-size: 12px;
        color: var(--introduction-color);
    }
    .countContent {
        font-size: 14px;
        font-weight: bold;
        color: var(--read-more-color);
    }
</style>