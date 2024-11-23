<template>
    <div class="userItemList">
        <UserItem
            v-for="(user, index) in users"
            :key="index"
            :avatarImage="user.avatarImage"
            :userName="user.userName"
            :numberOfNewReviews="user.numberOfNewReviews"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UserItem from './UserItem.vue';

const users = ref([
    {
        avatarImage: 'https://tdesign.gtimg.com/site/avatar.jpg',
        userName: '用户1',
        numberOfNewReviews: 5,
    },
    {
        avatarImage: 'https://tdesign.gtimg.com/site/avatar.jpg',
        userName: '用户2',
        numberOfNewReviews: 3,
    },
    {
        avatarImage: 'https://tdesign.gtimg.com/site/avatar.jpg',
        userName: '用户3',
        numberOfNewReviews: 8,
    },
    {
        avatarImage: 'https://tdesign.gtimg.com/site/avatar.jpg',
        userName: '用户4',
        numberOfNewReviews: 2,
    },
]);

</script>

<style scoped lang="scss">
.userItemList {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px; /* 每个 UserItem 之间的间距 */
}
</style>