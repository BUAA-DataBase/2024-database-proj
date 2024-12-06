<template>
    <t-layout style="background-color: white;">
        <t-content class="ProfileContent">
            <div class="content-container">
                <ProfileContentLayout/>
                <ProfileAside class="profile-aside"/>
            </div>
        </t-content>
    </t-layout>
</template>

<script lang="ts" setup name="">
    import ProfileAside from '@/pages/profileView/ProfileAside.vue';
    import Header from '@/components/header/Header.vue';
    import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue';
    import {} from 'vue'
    
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
    }
    .profile-aside {
        align-self: flex-start; /* 使 ProfileAside 高度根据内容调整 */
    }
</style>