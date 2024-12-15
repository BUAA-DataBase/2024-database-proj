<template>
    <t-layout style="background-color: white;">
        <div class="course-home-layout">
            <div class="content-container">
                <CourseHomeContent
                :courseId="currentId"
                :courseName="course.courseName"
                :courseTeacher="course.courseTeacher"
                :courseYear="course.courseYear"
                :courseRate="course.courseRate"
                :difficulty="convertDifficulty(course.courseDifficulty)"
                :workload="convertWorkload(course.courseWorkload)"
                :grading="convertGrading(course.courseGrading)"
                :gain="convertGain(course.courseGain)"
                :teacherImage="course.teacherImage"
                :courseType="course.courseType"
                :courseDepartment="course.courseDepartment"
                :courseCredit="course.courseCredit"
                :courseHours="course.courseHours"
                :courseFollower="course.courseFollower"
                :courseRecommendUsers="course.courseRecommendUsers"
                :courseNotRecommendUsers="course.courseNotRecommendUsers"
                :courseRateNum="course.courseRateNum"
                />
            </div>
            <div class="aside-container">
                <CourseHomeAside
                    :courseName="course.courseName"
                    :teacher="course.courseTeacher"
                    :teacher_avatar="course.teacherImage"
                />
            </div>
        </div>
    </t-layout>
</template>

<script lang="ts" setup name="">
    import Header from '@/components/header/Header.vue';
    import CourseHomeContent from '@/pages/CourseHome/CourseHomeContent.vue';
    import avatar from '@/assets/img_avatar.jpg';

    import {ref,computed,onMounted,watch} from 'vue'
    import CourseHomeAside from '@/pages/CourseHome/CourseHomeAside.vue';
    import { useRoute, useRouter } from 'vue-router';
    import type { CourseState } from '@/store/types';
    import { useCourseStore } from '@/store/modules/courseStore';

    const route = useRoute()
    const useStore = useCourseStore()

    const course = ref<CourseState>({
          courseId: 0,
          courseName: "",
          courseTeacher: "",
          courseYear: [],
          courseRate: 0,
          courseDifficulty: 0,
          courseWorkload: 0,
          courseGrading: 0,
          courseGain: 0,
          teacherImage: "",
          courseType: "",
          courseDepartment: "",
          courseCredit: 0,
          courseHours: 0,
          courseFollower: 0,
          courseRecommendUsers: [],
          courseNotRecommendUsers: [],
          courseRateNum: 0,
    })

    const currentId = computed<number>(() => {
        const idParam = route.params.id;
        // 如果pageParam是字符串，则尝试解析为数字；否则，使用默认值1
        return (typeof idParam === 'string' && !isNaN(parseInt(idParam, 10)))
        ? parseInt(idParam, 10)
        : 0;
    });

    
    const reviewId = computed<number>(() => {
        const idParam = route.params.reviewId;
        // 如果pageParam是字符串，则尝试解析为数字；否则，使用默认值1
        return (typeof idParam === 'string' && !isNaN(parseInt(idParam, 10)))
        ? parseInt(idParam, 10)
        : 0;
    });

    function fetchCourse(id: number): CourseState {
        // 从 commentStore 中获取排序后的评论数组
        return useStore.getCourseById(id) as CourseState;
    }
 
    // 监听currentPage的变化，并在变化时重新获取数据
    watch(currentId, (newId) => {
        course.value = fetchCourse(newId);
    }, {immediate: true}) ;

    
    watch(reviewId, (newId) => {
        if (newId != 0) {
            course.value = fetchCourse(currentId.value);
        }
    }, {immediate: true}) ;

    function convertDifficulty(difficultyNumber: number) {
    const difficultyMap = {
        0: '暂无评分',
        1: '简单',
        2: '较易',
        3: '适中',
        4: '较难',
        5: '困难'
    };
    // 检查输入是否在有效范围内
    switch (difficultyNumber) {
        case 0: return difficultyMap[0];
        case 1: return difficultyMap[1];
        case 2: return difficultyMap[2];
        case 3: return difficultyMap[3];
        case 4: return difficultyMap[4];
        case 5: return difficultyMap[5];
        default: return "";
    }
}

function convertWorkload(workloadNumber: number) {
    const workloadMap = {
        0: '暂无评分',
        1: '很少',
        2: '较少',
        3: '适中',
        4: '较多',
        5: '很多'
    };
    // 检查输入是否在有效范围内
    switch (workloadNumber) {
        case 0: return workloadMap[0];
        case 1: return workloadMap[1];
        case 2: return workloadMap[2];
        case 3: return workloadMap[3];
        case 4: return workloadMap[4];
        case 5: return workloadMap[5];
        default: return "";
    }
}

function convertGrading(gradingNumber: number) {
    const gradingMap = {
        0: '暂无评分',
        1: '很差',
        2: '较差',
        3: '中等',
        4: '较好',
        5: '很好'
    };
    // 检查输入是否在有效范围内
    switch (gradingNumber) {
        case 0: return gradingMap[0];
        case 1: return gradingMap[1];
        case 2: return gradingMap[2];
        case 3: return gradingMap[3];
        case 4: return gradingMap[4];
        case 5: return gradingMap[5];
        default: return "";
    }
}

function convertGain(gainNumber: number) {
    const gainMap = {
        0: '暂无评分',
        1: '很小',
        2: '较小',
        3: '中等',
        4: '较大',
        5: '很大'
    };
    // 检查输入是否在有效范围内
    switch (gainNumber) {
        case 0: return gainMap[0];
        case 1: return gainMap[1];
        case 2: return gainMap[2];
        case 3: return gainMap[3];
        case 4: return gainMap[4];
        case 5: return gainMap[5];
        default: return "";
    }
}
    
</script>

<style scoped lang="scss">
    .course-home-layout {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        background-color: var(--background-color);
        width: 80%;
        margin: 20px auto;
        border-radius: 8px;
        box-shadow: 0 2px 4px 3px var(--border-color);
        gap: 3%;
    }
    .content-container {
        margin-left: 20px;
        width: 70%;
    }
    .aside-container {
        width: 30%;
        margin-right: 20px;
    }
</style>