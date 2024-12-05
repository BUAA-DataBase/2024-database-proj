<template>
    <MainLayout/>
</template>
  

<script lang="tsx" setup name="">
    import { ref } from 'vue';
    import RegisterComponent from './components/login_register/RegisterComponent.vue';
    import MainLayout from './layouts/MainLayout.vue';
    import ProfileLayout from './layouts/ProfileLayout.vue';
    import Review from './components/reviews/Review.vue';
    import avatar from '@/assets/img_avatar.jpg';
    import Header from './components/header/Header.vue';
    import CourseHomeAside from './components/aside/CourseHomeAside.vue';
    import CourseHomeLayout from './layouts/CourseHomeLayout.vue';
    
    
</script>

<style scoped lang="scss">

</style>