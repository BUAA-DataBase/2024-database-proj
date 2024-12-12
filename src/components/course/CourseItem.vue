<template>
    <div v-if="dataLoadedstore.dataLoadedCourse" class="courseItemBackground">
      <t-space direction="vertical">
        <!-- 课程标题和年份 -->
        <div>
          <t-space size="8px" align="baseline">
            <span class="courseTitle">{{ title }}（{{ teacher }}）</span>
            <div class="year-container">
                <span v-for="(y, index) in year.slice(0, 2)" class="courseYear">{{ y }}</span>
                <span v-if="year.length > 2" class="courseYear">...</span>
            </div>
          </t-space>
        </div>

        <!-- 评分和评分人数 -->
        <div>
          <t-space align="baseline">
            <t-rate v-model="newRate" size="20px" allowHalf disabled />
            <span class="Rate">{{ courseRate }}</span>
            <span class="NumberOfRater">({{ rateCount }}人评分)</span>
          </t-space>
        </div>

        <!-- 课程评价 -->
        <div>
          <t-space size="35px">
            <span class="courseJudge">课程难度：{{ difficulty }}</span>
            <span class="courseJudge">作业多少：{{ workload }}</span>
            <span class="courseJudge">给分好坏：{{ grading }}</span>
            <span class="courseJudge">收获大小：{{ gain }}</span>
          </t-space>
        </div>
      </t-space>
    </div>
    <div v-else class="courseItemBackground-sk">
        <t-skeleton :row-col="rowCol" animation="gradient"/>
    </div>
    <t-divider class="dividerStyle"></t-divider>
  </template>


<script lang="ts" setup name="CourseItem">
    import { ref, defineProps, computed } from 'vue'
    import { useRoute } from 'vue-router'
    import { dataLoadedStore } from '@/store/modules/dataLoadStore';

    const rowCol = ref([
    [
        { type: 'rect', width: '1200px', height: '150px'}, // 第一行：一个方形
    ],
    ]);

    const dataLoadedstore = dataLoadedStore();
    // 定义传递给组件的属性
    const props = defineProps({
    id: {
        type: Number,
        required: true, // 课程id必须传递
    },
    title: {
        type: String,
        required: true, // 课程名必须传递
    },
    teacher: {
        type: String,
        required: true, // 任课老师必须传递
    },
    year: {
        type: Array,
        required: true, // 课程发布时间必须传递
    },
    courseRate: {
        type: Number,
        required: true,
    },
    rateCount: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    workload: {
        type: String,
        required: true,
    },
    grading: {
        type: String,
        required: true,
    },
    gain: {
        type: String,
        required: true,
    },
    });

    const route = useRoute()
    const userId = computed(() => route.params.id)
    const courseRate = ref(props.courseRate)
    const newRate = ref(Math.round(props.courseRate * 2 - 0.1)/2)

</script>

<style scoped lang="scss">
    .courseItemBackground-sk {
        padding: 0;
        border-radius: 10px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
        margin-bottom: 0;
    }
    .courseItemBackground {
        background-color: #f0f5fd;
        padding: 20px 20px 30px 20px;
        border-radius: 10px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
        margin-bottom: 0;
    }
    .dividerStyle {
        margin-top: 15px;
        margin-bottom: 15px;
        margin-left: auto;
        margin-right: auto
    }
    .courseTitle {
        font-size: 21px;
        font-weight: bold;
    }
    .courseYear {
        font-size: 12px;
        color: #999;
    }
    .year-container {
        display: flex;
        flex-direction: row;
        gap: 5px;
    }
    .Rate {
        font-size: 25px;
        color: #fadb14;
    }
    .NumberOfRater {
        font-size: 12px;
        color: #999;
    }
    .courseJudge {
        font-size: 15px;
        color: #999;
    }

</style>
