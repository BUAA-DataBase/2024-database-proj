<template>
    <t-space direction="vertical">
        <div class="user-container">
            <t-avatar size="100px" :image="avatarImage" alt="用户头像" shape="circle"/>
            <span class="UserName">{{ userName }}</span>
        </div>
        <div>
            <t-head-menu v-model="menuValue" @change="changeHandler">
                <t-menu-item value="item1"> <router-link to="/latestComments"> 点评 </router-link></t-menu-item>
                <t-divider layout="vertical"/>
                <t-menu-item value="item2"> <router-link to="/user"> 关注用户 </router-link> </t-menu-item>
                <t-divider layout="vertical"/>
                <t-menu-item value="item3"> <router-link to="/courses"> 关注课程 </router-link> </t-menu-item>
            </t-head-menu>
        </div>
        <t-divider/>
        <div class="content-container">
            <ReviewList
                :show-author="false"
                :show-avatar="false"
            />
        </div>
    </t-space>
</template>

<script lang="ts" setup name="">
    import {ref} from 'vue'
    import avatarImage from '@/assets/img_avatar.jpg'
    import ReviewList from '@/components/reviews/ReviewList.vue';
    import CourseList from './CourseList.vue';
    import LatestReviewList from './LatestReviewList.vue';
    import Header from '@/components/header/Header.vue';

    const userName = ref('jo护车来喽')
    const menuValue = ref('item1')
</script>

<style scoped lang="scss">
    .user-container {
        display: flex;
        align-items: flex-end;
    }
    .UserName {
        font-size: 20px;
        font-weight: bold;
    }
</style>
