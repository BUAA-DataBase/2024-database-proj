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
    import {ref, defineProps} from 'vue'

    const props = defineProps({
        courseName: { type: String, required: true },
        teacher: { type: String, required: true },
        teacher_avatar: { type: String, required: true },
    })
    
    const courseList_sameTeacher = ref([
    {
        courseName: '计算机组成原理',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.5,
        courseRateNum: 100,
    },
    {
        courseName: '数据结构与算法',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.2,
        courseRateNum: 120,
    },
    {
        courseName: '操作系统',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.0,
        courseRateNum: 80,
    },
    {
        courseName: '数据库原理',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.7,
        courseRateNum: 150,
    },
    {
        courseName: '人工智能基础',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.8,
        courseRateNum: 200,
    },
    {
        courseName: '计算机网络',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.3,
        courseRateNum: 90,
    },
    {
        courseName: '软件工程导论',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.1,
        courseRateNum: 50,
    },
    {
        courseName: '编译原理',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.6,
        courseRateNum: 130,
    },
    {
        courseName: '云计算与大数据',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.4,
        courseRateNum: 110,
    },
    {
        courseName: '计算机视觉',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.9,
        courseRateNum: 180,
    }
]);

const courseList_samecourse = ref([
    {
        teacher: '张声秋',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.9,
        courseRateNum: 180,
    },
    {
        teacher: '李明',
        courseyear: ['2022春'],
        courseRate: 4.6,
        courseRateNum: 220,
    },
    {
        teacher: '王婷婷',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.7,
        courseRateNum: 150,
    },
    {
        teacher: '赵亮',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.3,
        courseRateNum: 110,
    },
    {
        teacher: '孙静',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.8,
        courseRateNum: 190,
    },
    {
        teacher: '周杰',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.5,
        courseRateNum: 130,
    },
    {
        teacher: '陈婷',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.2,
        courseRateNum: 80,
    },
    {
        teacher: '刘华',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.4,
        courseRateNum: 170,
    },
    {
        teacher: '杨鹏',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.0,
        courseRateNum: 100,
    },
    {
        teacher: '黄琪',
        courseyear: ['2022春', '2022秋', '2023春'],
        courseRate: 4.7,
        courseRateNum: 160,
    }
]);


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