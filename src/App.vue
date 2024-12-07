<template>
    <t-layout style="background-color: white;">
        <Header/>
        <t-content>
            <PostEditor/>
        </t-content>
    </t-layout>
</template>
  

<script lang="tsx" setup name="">
    import { ref } from 'vue';
    import RegisterComponent from './components/login_register/RegisterComponent.vue';
    import MainLayout from './layouts/MainLayout.vue';
    import ProfileLayout from './layouts/ProfileLayout.vue';
    import Review from './components/postPreView/PostPreView.vue';
    import avatar from '@/assets/img_avatar.jpg';
    import Header from './components/header/Header.vue';
    import CourseHomeLayout from './layouts/CourseHomeLayout.vue';
    import LatestReviewList from './pages/LatestReviewList.vue';
    import PostEditor from './components/editor/PostEditor.vue';
    
    
</script>

<style scoped lang="scss">

</style>