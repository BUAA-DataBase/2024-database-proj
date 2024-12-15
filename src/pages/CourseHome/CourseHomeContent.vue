<template>
    <div class="course-content-container">
        <div class="course-title-container">
            <span class="course-title"> &nbsp;{{props.courseName }} </span>
            <span v-for="(year,index) in props.courseYear" :key="index" class="course-year"> {{ year }} </span>
        </div>
        <t-divider style="margin-top:20px"/>
        <div>
            <t-space direction="vertical">
                <div>
                    <t-space>
                        <t-rate v-model="newRate" size="20px" allowHalf disabled />
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
        <div class="buttons">
            <t-space>
                <t-button v-if="!follow" @click="followCourse">
                    <template #icon>
                        <HeartIcon />
                    </template>
                    关注
                </t-button>
                <t-button theme="default" v-if="follow" @click="unfollowCourse" style="padding: 0 20px;">
                    已关注
                </t-button>
            </t-space>
        </div>
        <CourseHomePostList
            :courseId="props.courseId"
            :courseYear="props.courseYear"
            :courseName="props.courseName"
            :courseTeacher="props.courseTeacher"
        />
    </div>
</template>

<script lang="ts" setup name="">
    import {defineProps, ref} from 'vue'
    import { HeartIcon, ThumbUpIcon, ThumbDownIcon} from 'tdesign-icons-vue-next';
    import CourseHomePostList from './CourseHomePostList.vue';
    import { useUserStore } from '@/store/modules/userStore';
    import { useRouter } from 'vue-router';
    import type { RefSymbol } from '@vue/reactivity';

    const props = defineProps({
  courseId: { type: Number, required: true},      
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
  courseRecommendUsers: { type: Array, required: true },
  courseNotRecommendUsers: { type: Array, required: true },
  courseRateNum: { type: Number, required: true },
});

const newRate = ref(Math.round(props.courseRate * 2 - 0.1)/2)

const userStore = useUserStore();
const router = useRouter()

const follow = ref(userStore.isFollowingCourse(props.courseId));

async function followCourse() {
    if (userStore.getNowUser().userId != 0) {
        await userStore.followCourse(props.courseId);
        follow.value = true;
        console.log("i will follow" + follow.value);
    }
    else {
        alert("请先登录！")
        router.push({path:"/login"})
    }
}

async function unfollowCourse() {
    await userStore.unfollowCourse(props.courseId);
    follow.value = false;
    console.log("i will unfollow" + follow.value);
}



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
        margin-top: 10px;
    }
    .course-title {
        font-size: 28px;
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
    .buttons {
        margin-top: 25px;
    }
</style>