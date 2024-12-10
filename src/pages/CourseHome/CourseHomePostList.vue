<template>
    <div class="reviewList-container">
        <div class="review-editor-container">
            <span class="title">点评</span>
            <t-button @click="toEditor">
                    <template #icon>
                        <PenBrushIcon />
                    </template>
                    写点评
            </t-button>
        </div>
        <t-divider style="margin-top: 10px"/>
        <div v-if="exist">
            <div class="all-review-container">
                <ReViewSelector
                    :courseYear="props.courseYear"
                    @updateValues="handleUpdateValues"
                />
            </div>
            <div class="all-review">
                <CourseHomeReViewEx
                    v-for="(comment, index) in comments"
                    :key="index"
                    :author="comment.author"
                    :toPostId="comment.postId"
                    :course="props.courseName"
                    :teacher="props.courseTeacher"
                    :date_published="comment.time"
                    :date_updated="comment.time"
                    :avatar="comment.avatar"
                    :year="comment.courseYear"
                    :rate="comment.content.rate"
                    :content="comment.content"
                />
            </div>
        </div>
        <div v-else>
            <div class="no-review">
                <span>暂无点评,快来争做第一人吧！</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup name="CourseHomeReViewList">
    import {ref, defineProps, watch} from 'vue'
    import { PenBrushIcon } from 'tdesign-icons-vue-next';
    import ReViewSelector from './ReViewSelector.vue';
    import CourseHomeReViewEx from './CourseHomePostEx.vue';
    import type { PostState } from '@/store/types';
    import { usePostStore } from '@/store/modules/postStore';
    import { useUserStore } from '@/store/modules/userStore';
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const useStore2 = useUserStore()

    const props = defineProps({
        courseYear: { type: Array, required: true },
        courseName: { type: String, required: true},
        courseTeacher: { type: String, required: true }
    })

    function toEditor() {
        const id = useStore2.getNowUser().userId;
        router.push({name: "editor", params: {userId : id}});
    }

    const useStore = usePostStore()

    const handleUpdateValues = (payload: { value1: string; value2: string; value3: string }) => {
      comments.value = useStore.filterAndSortPosts(props.courseName,props.courseTeacher,
      payload.value1,payload.value2,payload.value3);
      console.log(comments.value);
    };

    const exist = useStore.getPostsByCourse(props.courseName).length > 0;

    const comments = ref<PostState[]> ([]);

</script>

<style scoped lang="scss">
    .reviewList-container {
        margin-top: 50px;
    }
    .review-editor-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title {
        font-size: 24px;
        font-weight: bold;
        color: var(--course-teacher-color);
        margin-bottom: 10px;
    }
    .myRate {
        font-size: 15px;
        font-weight: bold;
    }
    .Rate {
        font-size: 20px;
        color: #fadb14;
    }
    .all-review {
        margin-top: 40px;
    }
    .no-review {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 150px;
        font-size: 20px;
        color: #999;
    }
</style>