<template>
    <div class="userItemList">
        <UserItem
            v-for="(user, index) in users"
            :key="index"
            :avatarImage="user.avatar"
            :userName="user.userName"
            :numberOfNewReviews="0"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref,watch, type PropType } from 'vue';
import UserItem from './UserItem.vue';
import type { UserState } from '@/store/types';
import axios from 'axios';

const props = defineProps({
    user: {
        type: Object as PropType<UserState>,
        required: true
    }
});

const users = ref<UserState[]>([]);

watch(() => props.user, async (newUser, oldUser) => {
    if (props.user && props.user.following && props.user.following.length > 0) {
        const followingIds = props.user.following;
        const fetchedUsers: UserState[] = [];
        
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
}, {immediate:true, deep: true})

</script>

<style scoped lang="scss">
.userItemList {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px; /* 每个 UserItem 之间的间距 */
}
</style>