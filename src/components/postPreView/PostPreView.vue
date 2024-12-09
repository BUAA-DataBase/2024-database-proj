<template>
    <div class="review-container">
            <div v-if="showAvatar" class="avatar-container">
                <t-avatar  size="50px" :image="avatar" alt="用户头像" shape="circle" />
            </div>
            <div class="info-container">
                <t-space direction="vertical">
                    <div class="top-row">
                        <t-space>
                            <span v-if="showAuthor" class="author" @click="toAuthor">
                                {{ author }}
                            </span>
                            <span v-if="showAuthor" class="tip">点评了</span>
                            <span class="course-teacher"
                            :class="{'large-font': !showAuthor}"
                            @click="toCourse">
                                {{ course }}({{ teacher }})
                            </span>
                        </t-space>
                        <span class="time">{{ time }}</span>
                    </div>
                    <div class="content-container">
                        <span class="content">
                            {{ truncatedContent }}
                            <span class="read-more" @click="toPost">>>更多</span>
                        </span>
                    </div>
                </t-space>
            </div>
    </div>
    <t-divider style="margin-top: 15px; margin-bottom: 15px;"/>
</template>


<script lang="ts" setup>
    import { defineProps, ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useCourseStore } from '@/store/modules/courseStore';
    import { usePostStore} from '@/store/modules/postStore';

    import { onMounted } from 'vue';

    onMounted(() => {
        const reviewElement = document.querySelector('.info-container') as HTMLElement;
        
        if (reviewElement) {
            const elementWidthPx = reviewElement.offsetWidth; // 元素宽度 (px)
            const viewportWidth = window.innerWidth;  // 视口宽度 (px)
            
            const elementWidthInVw = (elementWidthPx / viewportWidth) * 100;
            
            console.log(`Review 组件宽度: ${elementWidthInVw.toFixed(2)}vw`);
        }
    });


    const props = defineProps({
        author: { type: String, required: true },
        avatar: { type: String, required: true },
        time: { type: String, required: true },
        course: { type: String, required: true },
        teacher: { type: String, required: true },
        content: { type: String, required: true },
        showAuthor: { type: Boolean, default: true },
        showAvatar: { type: Boolean, default: true },
    });

    const maxLength = 100; // 最大显示字符数
    const router = useRouter();
    const useStore = useCourseStore();
    const useStore2 = usePostStore();

    const isTruncated = computed(() => cleanedText.value.length > maxLength);
    const truncatedContent = computed(() =>
        isTruncated.value ? cleanedText.value.slice(0, maxLength) + '...' : cleanedText.value
    );

    const cleanedText = ref<string>(props.content.replace(/[#*]/g, ''));

    function toAuthor() {
        const authorId = useStore2.getPostAuthorId(props.author,props.course,props.teacher);
        console.log(authorId);
        router.push({name: "user", params:{id : authorId}});
    }

    function toCourse() {
        const courseId =  useStore.getCourseIdByNameAndTeacher(props.course,props.teacher);
        router.push({name: "course", params:{id : courseId}});
    }

    function toPost() {
        const courseId =  useStore.getCourseIdByNameAndTeacher(props.course,props.teacher);
        const reviewId = useStore2.getPostId(props.author,props.course,props.teacher);
        router.push({name: "course", params:{id : courseId, reviewId: reviewId}});
    }
</script>


<style scoped lang="scss">
    a {
        text-decoration: none;
    }
    .review-container {
        display: flex;
        align-items: top;
        flex-direction: row ;
        padding: 10px 0;
        width: 100%;
    }
    .avatar-container {
        margin-right: 20px;
    }
    .content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.8;
        font-size: 14px;
        color: var(--text-color);
    }
    .content-container {
        display: flex;
        width: 100%;
    }
    .read-more {
        color: var(--read-more-color);
        cursor: pointer;
        margin-left: 4px;
    }
    .info-container {
        display: flex;
        flex-direction: column;
        width: 100%; /* 确保占据整个可用空间 */
    }
    .top-row {
        display: flex;
        align-items: center; /* 垂直居中 */
        justify-content: space-between; /* 左右分布 */
        width: 100%;
    }

    .time {
        color: var(--date-color);
        font-size: 12px;
        margin-left: auto; /* 如果不使用 space-between，也可通过 margin-left: auto 推到右侧 */
    }
    .author {
        cursor: pointer;
        font-weight: bold;
        color: var(--author-name);
    }
    .course-teacher {
        cursor: pointer;
        font-weight: bold;
        color: var(--course-teacher-color);
    }
    .large-font {
        font-size: 18px;
    }

</style>