<template>
    <div v-if="users.length > 0" class="userItemList">
        <UserItem
            v-for="(user, index) in users"
            :key="index"
            :userId="props.user.userId"
            :thisId="user.userId"
            :avatarImage="user.avatar"
            :userName="user.userName"
            :numberOfNewReviews="0"
        />
    </div>
    <div v-else class="no-user">
        <span>{{no_user_text}}</span>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref,watch, type PropType } from 'vue';
import UserItem from './UserItem.vue';
import type { UserState } from '@/store/types';
import axios from 'axios';
import { useUserStore } from '@/store/modules/userStore';

const props = defineProps({
    user: {
        type: Object as PropType<UserState>,
        required: true
    },
    isMyProfile: {
        type: Boolean,
        required: true
    }
});

const users = ref<UserState[]>([]);
const userStore = useUserStore()

const no_user_text = computed(() => {
    return (props.isMyProfile == true) ? '您还没有关注任何用户哦' : '暂无关注用户'
})


watch(props, async (newProps) => {
    if (newProps.user) {
        const followingIds = await userStore.getFollowings(newProps.user.userId);
        const fetchedUsers: UserState[] = [];
        console.log(followingIds)
        if (followingIds) {
            for (const userId of followingIds) {
              try {
                const responseGetInfo = await axios.get(`/api/users/info?id=${userId}`);
                if (responseGetInfo.data.result === 'ok') {
                  const userInfo = JSON.parse(responseGetInfo.data.profile) as UserState; // 假设后端返回的数据中包含 user 字段，且其类型为 UserState
                  fetchedUsers.push(userInfo);
                } else {
                  console.error(`Failed to fetch user info for ID ${userId}: ${responseGetInfo.data.message || 'Unknown error'}`);
                }
              } catch (error) {
                console.error(`Error fetching user info for ID ${userId}:`, error);
              }
            }
            // 用获取到的用户信息替换本地的 users ref
            users.value = fetchedUsers;
        }
    }
}, {immediate:true, deep: true})

</script>

<style scoped lang="scss">
.userItemList {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px; /* 每个 UserItem 之间的间距 */
}
.no-user {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 20px;
    color: #999;
}
</style>