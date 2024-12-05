<template>
    <t-layout style="background-color: white;">
        <Header/>
        <div class="course-home-layout">
            <CourseHomeContent
            courseName="计算机网络"
            courseTeacher="李建华"
            :courseYear='["2024秋", "2024春","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋","2024秋",]'
            :courseRate="4.5"
            difficulty="较难"
            workload="适中"
            grading="中等"
            gain="较大"
            :teacherImage="avatar"
            courseType="必修"
            courseDepartment="计算机学院"
            :courseCredit="3"
            :courseHours="48"
            :courseFollower="100"
            :courseRecommend="90"
            :courseNotRecommend="10"
            :courseRateNum="20"
            :ReViewList="[]"
            />
            
        </div>
    </t-layout>
</template>

<script lang="ts" setup name="">
    import Header from '@/components/header/Header.vue';
    import CourseHomeContent from '@/pages/CourseHome/CourseHomeContent.vue';
    import avatar from '@/assets/img_avatar.jpg';

import {} from 'vue'
    
</script>

<style scoped lang="scss">
    .course-home-layout {
        background-color: var(--background-color);
        display: flex;
        justify-content: center;  /* 水平居中 */
        align-items: center;      /* 垂直居中 */
        width: 80%;
        margin: 20px auto;
        border-radius: 8px;
        box-shadow: 0 2px 4px 3px var(--border-color);
    }
</style>