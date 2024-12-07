<template>
    <div class="CourseListContain">

        <div class="courseType">
            <CourseType/>
        </div>
        <div v-for="course in courses" :key="course.courseId" @click="goToCourse(course.courseId)" class="pointer">
        <CourseItem
            :id="course.courseId"
            :title="course.courseName"
            :teacher="course.courseTeacher"
            :year="course.courseYear"
            :courseRate="course.courseRate"
            :rateCount="course.courseRateNum"
            :difficulty="convertDifficulty(course.courseDifficulty)"
            :workload="convertWorkload(course.courseWorkload)"
            :grading="convertGrading(course.courseGrading)"
            :gain="convertGain(course.courseGain)"
        />
        </div>
        <Pagination :totalNum="useStore.getCoursesSize()"/>
    </div>
</template>

<script lang="ts" setup name="">
    import { ref,computed,onMounted,watch } from 'vue'
    import CourseType from '@/components/course/CourseType.vue'
    import CourseItem from '@/components/course/CourseItem.vue';
    import Pagination from '@/utils/Pagination.vue';
    import { useRouter, useRoute } from 'vue-router';
    import {useCourseStore} from '../store/modules/courseStore'
    import type { CourseState } from '../store/types'

    const router = useRouter();
    const route = useRoute();

    const useStore = useCourseStore();

    const goToCourse = (courseId: number) => {
        router.push({name: 'course' , params:{id : courseId}})
    }

    const courses = ref<CourseState[]>([]);
    const currentPage = computed<number>(() => {
        const pageParam = route.params.page;
        // 如果pageParam是字符串，则尝试解析为数字；否则，使用默认值1
        return (typeof pageParam === 'string' && !isNaN(parseInt(pageParam, 10)))
        ? parseInt(pageParam, 10)
        : 1;
    });

    function fetchCourses(page: number): CourseState[] {
        // 从 commentStore 中获取排序后的评论数组
        return useStore.getSortedCoursesByRate(page, false);
    }

    onMounted(() => {
        courses.value = fetchCourses(currentPage.value);
    });
 
    // 监听currentPage的变化，并在变化时重新获取数据
    watch(currentPage, (newPage) => {
        courses.value = fetchCourses(newPage);
    });

    function convertDifficulty(difficultyNumber: number) {
        const difficultyMap = {
            1: '简单',
            2: '较易',
            3: '适中',
            4: '较难',
            5: '困难'
        };
        // 检查输入是否在有效范围内
        switch (difficultyNumber) {
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
            1: '很少',
            2: '较少',
            3: '适中',
            4: '较多',
            5: '很多'
        };
        // 检查输入是否在有效范围内
        switch (workloadNumber) {
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
            1: '很差',
            2: '较差',
            3: '中等',
            4: '较好',
            5: '很好'
        };
        // 检查输入是否在有效范围内
        switch (gradingNumber) {
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
            1: '很小',
            2: '较小',
            3: '中等',
            4: '较大',
            5: '很大'
        };
        // 检查输入是否在有效范围内
        switch (gainNumber) {
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
    .CourseListContain {
        width: 70%;
        margin-top: 30px;
        margin-bottom: 50px;
        margin-left: auto;
        margin-right: auto;
    }

    .pointer {
        cursor: pointer;
    }
</style>