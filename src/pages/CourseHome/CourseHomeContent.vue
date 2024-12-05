<template>
    <t-content class="course-content-container">
        <div class="course-title-container">
            <span class="course-title"> {{ props.courseName }} </span>
            <span v-for="(year,index) in props.courseYear" :key="index" class="course-year"> {{ year }} </span>
        </div>
        <t-divider />
        <div>
            <t-space direction="vertical">
                <div>
                    <t-space>
                        <t-rate v-model="props.courseRate" size="20px" allowHalf disabled />
                        <span class="Rate">{{ props.courseRate }}</span>
                        <span class="NumberOfRater">({{ props.courseRateNum }}人评分)</span>
                    </t-space>
                </div>
        
                <!-- 课程评价 -->
                <div>
                    <t-space size="35px">
                        <span class="courseJudge">课程难度：{{ props.difficulty }}</span>
                        <span class="courseJudge">作业多少：{{ props.workload }}</span>
                        <span class="courseJudge">给分好坏：{{ props.grading }}</span>
                        <span class="courseJudge">收获大小：{{ props.gain }}</span>
                    </t-space>
                </div>
            </t-space>
        </div>
        <div class="course-info-container">
            <t-space size="18px">
                <t-space direction="vertical" size="8px">
                    <t-space size="0">
                        <span style="font-weight:bold">课程类型：</span>
                        <span >{{ props.courseType }}</span>
                    </t-space>
                    <t-space size="0">
                        <span style="font-weight:bold">开课院系：</span>
                        <span >{{ props.courseDepartment }}</span>
                    </t-space>
                </t-space>
                <t-space direction="vertical" size="8px">
                    <t-space size="0">
                        <span style="font-weight:bold">学分：</span>
                        <span >{{ props.courseCredit }}</span>
                    </t-space>
                    <t-space size="0">
                        <span style="font-weight:bold">学时：</span>
                        <span >{{ props.courseHours }}</span>
                    </t-space>
                </t-space>
            </t-space>
        </div>
    </t-content>
</template>

<script lang="ts" setup name="">
    import {defineProps, ref} from 'vue'

    const props = defineProps({
  courseName: { type: String, required: true },
  courseTeacher: { type: String, required: true },
  courseYear: { type: Array, required: true },
  courseRate: { type: Number, required: true },
  difficulty: { type: String, required: true },
  workload: { type: String, required: true },
  grading: { type: String, required: true },
  gain: { type: String, required: true },
  teacherImage: { type: String, required: true },
  courseType: { type: String, required: true },
  courseDepartment: { type: String, required: true },
  courseCredit: { type: Number, required: true },
  courseHours: { type: Number, required: true },
  courseFollower: { type: Number, required: true },
  courseRecommend: { type: Number, required: true },
  courseNotRecommend: { type: Number, required: true },
  courseRateNum: { type: Number, required: true },
  ReViewList: { type: Array, required: true },
});


</script>

<style scoped lang="scss">
    .course-content-container {
        background-color: white;
        padding: 20px;
    }
    .course-title-container {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
    }
    .course-title {
        font-size: 24px;
        font-weight: bold;
        color: var(--course-teacher-color);
        margin-right: 5px;
    }
    .course-year {
        font-size: 10px;
        color: var(--date-color);
        margin-left: 3px;
        white-space: nowrap;
    }
    .Rate {
        font-size: 20px;
        color: #fadb14;
    }
    .NumberOfRater {
        font-size: 12px;
        color: #999;
    }
    .courseJudge {
        font-size: 14px;
        color: #999;
    }
    .course-info-container {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        margin-left: 5px;
    }
</style>