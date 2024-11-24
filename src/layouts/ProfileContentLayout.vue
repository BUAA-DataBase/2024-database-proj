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
                <t-menu-item value="item2"> <router-link to="/courses"> 关注用户 </router-link> </t-menu-item>
                <t-divider layout="vertical"/>
                <t-menu-item value="item3"> 关注课程 </t-menu-item>
            </t-head-menu>
        </div>
        <t-divider style="margin-top: 0; margin-bottom: 0"/>
        <div style="width:100%">
            <!-- <ProfileFollowUserList/>
            <ReviewList></ReviewList>
            <CourseList></CourseList> -->
            <router-view/>
        </div>
    </t-space>
</template>

<script lang="ts" setup name="">
    import {ref} from 'vue'
    import avatarImage from '@/assets/img_avatar.jpg'
    import ProfileReviewList from '@/pages/profileView/ProfileReviewList.vue';
    import ProfileFollowUserList from '@/pages/profileView/ProfileFollowUserList.vue';

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