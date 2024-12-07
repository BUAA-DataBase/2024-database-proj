<template>
    <div class="aside-container">
        <t-space direction="vertical" size="40px">
            <t-avatar :image="'https://scse.buaa.edu.cn/__local/4/19/16/256EA87700037E4DEE08B6C726A_FB09112F_1E27C.jpg'" size="100px" />
            <div class="teacherName">{{ teacher }}</div>
        </t-space>
        <t-space direction="vertical">
            <t-divider dashed/>
            <span class="title">其他老师的「{{ courseName }}」课程</span>
            <div v-for = "(course, index) in courseList_samecourse" :key="index">
                    <div class="item1">
                        <span class="teacher">{{ course.teacher }}</span>
                        <t-rate v-model="course.courseRate" disabled size="small"/>
                        <span class="rate">{{ course.courseRate.toFixed(1) }}</span>
                        <span class="courseRateNum">{{ course.courseRateNum }}人评价</span>
                    </div>
            </div>
            <t-divider dashed/>
        </t-space>
        <t-space direction="vertical">
            <span class="title">{{ teacher }}老师的其他课程</span>
            <div v-for = "(course, index) in courseList_sameTeacher" :key="index">
                <div class="item1">
                        <span class="teacher">{{ course.courseName }}</span>
                        <t-rate v-model="course.courseRate" disabled size="small"/>
                        <span class="rate">{{ course.courseRate.toFixed(1) }}</span>
                        <span class="courseRateNum">{{ course.courseRateNum }}人评价</span>
                </div>
            </div>
        </t-space>
    </div>
</template>

<script lang="ts" setup name="">
    import type { CourseState } from '@/store/types';
    import { useCourseStore } from '@/store/modules/courseStore';
    import {ref, defineProps} from 'vue'

    const props = defineProps({
        courseName: { type: String, required: true },
        teacher: { type: String, required: true },
        teacher_avatar: { type: String, required: true },
    })

    const useStore = useCourseStore()
    
    const courseList_sameTeacher = useStore.getCourseByTeacher(props.teacher)

    const courseList_samecourse = useStore.getCourseByName(props.courseName)


</script>

<style scoped lang="scss">
    .aside-container {
        margin-top: 50px;
    }
    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .item1 {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .item2 {
        display: flex;
        align-items: center;
        gap: 2px;
    }
    .teacher,
    .rate,
    .courseRateNum,
    .courseyear,
    .title,
    .more {
        white-space: nowrap;    /* 防止文本换行 */
    }
    .teacherName {
        font-size: 24px;
        font-weight: bold;
        color: var(--course-teacher-color);
    }
    .title {
        font-size: 20px;
        font-weight: bold;
        color: var(--course-teacher-color);
    }
    .teacher {
        font-size: 13px;
        color: var(--author-name);
    }
    .rate {
        font-size: 13px;
        color: #fadb14;
    }
    .courseRateNum {
        font-size: 10px;
        color: #999;
    }
</style>