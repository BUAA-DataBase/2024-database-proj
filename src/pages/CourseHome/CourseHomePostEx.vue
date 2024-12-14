<template>
    <div class="post-container" ref="reviewSection">
        <t-space direction="vertical" size="10px">
            <t-space align="baseline">
                <span class="author">{{ props.author }}</span>
                <t-rate v-model="newRate" disabled size=""/>
                <span class="date">{{ props.year }}</span>
            </t-space>
            <t-space>
                <span class="judge">课程难度：{{ difficulty }}</span>
                <span class="judge">作业多少：{{ workload }}</span>
                <span class="judge">给分好坏：{{ grading }}</span>
                <span class="judge">收获大小：{{ gain }}</span>
            </t-space>
            <div class="content" v-html="getCommentHtml(comments)"></div>
            <t-space size="30px">
                <div>
                    <span class="date">{{ date_published }}</span>
                    <span v-if="date_updated != null" class="date">（最后修改于{{ date_updated }}）</span>
                </div>
                <t-space>
                    <div class="like-button" @click="handleLikeClick">
                        <ThumbUpIcon size="14px"/>
                        <span class="like-num">{{ likes }}</span>
                    </div>
                    <div class="reply-button" @click="toggleReply">
                        <span><ChatIcon size="14px"/></span>
                        <span class="like-num">{{ reply_count }}</span>
                    </div>
                </t-space>
            </t-space>

            <div v-if=" reply_count != 0" class="review-container">
                <div v-for="(reply, index) in replies" :key="index">
                    <Review
                        :review="reply"
                        :belongAuthor="props.author"
                        @toggle-reply="toggleReply"
                    />
                </div>
            </div>

            <LittleCommentEditor
                v-if="showReplyEditor"
                :toPostId="props.toPostId"
                :toAuthor="author"
                :toAvatar="avatar"
                :course="course"
                :teacher="teacher"
                @comment-submitted="handleCommentSubmit"
            />
        </t-space>
    </div>
    <t-divider dashed/>
</template>

<script lang="ts" setup name="">
    import type { CommentContent, ReviewState } from '@/store/types';
    import { convertDifficulty, convertGain, convertGrading, convertWorkload } from '@/constants/map';
    import {ref, defineProps, watch, onMounted, computed} from 'vue'
    import { marked } from 'marked'
    import { ChatIcon, ThumbUpIcon } from 'tdesign-icons-vue-next';
    import LittleCommentEditor from '../../components/editor/LittleCommentEditor.vue';
    import Review from '@/components/reviews/Review.vue';
    import { useRoute } from 'vue-router';
    import { usePostStore } from '@/store/modules/postStore';
    import { useUserStore } from '@/store/modules/userStore';
    import { useRouter } from 'vue-router';

    const props = defineProps<{
        author: string,
        toPostId: number,
        course: string,
        teacher: string,
        date_published: string,
        date_updated: string,
        avatar: string,
        year: string,
        rate: number,
        content: CommentContent,
        showReplyEditor: boolean
    }>()

    const emit = defineEmits(['toggle-reply', 'comment-submitted']);

    const replies = ref<ReviewState[]>();
    const reply_count = ref(0)


    function handleCommentSubmit(toPostId : number) {
        emit('comment-submitted');
        if (useStore.getPostById(props.toPostId) != null) {
            replies.value = useStore.getPostById(props.toPostId)?.reviews;
            reply_count.value = useStore.getPostById(props.toPostId)?.reviews.length as number;
        }
    }


    onMounted(() => {
        replies.value = useStore.getPostById(props.toPostId)?.reviews;
        reply_count.value = useStore.getPostById(props.toPostId)?.reviews.length as number;
    });

    const difficulty = convertDifficulty(props.content.difficulty)
    const workload = convertWorkload(props.content.workload)
    const grading = convertGrading(props.content.grading)
    const gain = convertGain(props.content.gain)
    
    const useStore = usePostStore();
    const router = useRouter()

    const likes = ref(useStore.getPostById(props.toPostId)?.likeUsers.length )

    const newRate = ref(Math.round(props.rate * 2 - 0.1)/2)

    watch(props,(newProps) => {
        newRate.value = Math.round(newProps.rate * 2 - 0.1)/2;
    },{immediate:true})

    // 定义一个ref来引用需要滚动到的DOM元素
    const reviewSection = ref<HTMLElement>();
    const route = useRoute();

    const reviewId = computed<number>(() => {
        const reviewId = route.params.reviewId;
        // 如果pageParam是字符串，则尝试解析为数字；否则，使用默认值1
        return (typeof reviewId === 'string' && !isNaN(parseInt(reviewId, 10)))
        ? parseInt(reviewId, 10)
        : 0;
    });
 
    onMounted(() => {
        const thisId = props.toPostId;
        if (reviewId.value === thisId && reviewSection.value) {
            reviewSection.value.scrollIntoView({ behavior: 'auto' });
        }
    })

    const userStore = useUserStore()

    // 点赞按钮的点击处理函数
    const handleLikeClick = () => {
        if (userStore.getNowUser().userId == 0) {
            alert("请先登录！");
            router.push({path:"/login"})
            return;
        }
        useStore.updateLikeNum(props.toPostId, userStore.getNowUser().userId);
        likes.value = useStore.getPostById(props.toPostId)?.likeUsers.length as number;  // 点击时点赞数加1
        console.log('点赞按钮被点击了');
    };

    // 回复的按钮是从list传过来，因为只有一个评论编辑器处于激活状态
    // 上头需要管理一个唯一的激活id

    const toggleReply = () => {
        emit('toggle-reply', props.toPostId);
    };

    const comments = props.content.comment

    const getCommentHtml = (comment: string) => {
        return marked(comment);
    }
</script>

<style scoped lang="scss">
    .author {
        font-weight: bold;
        font-size: 18px;
        color: var(--author-name);
    }
    .date {
        font-size: 12px;
        color: var(--date-color);
    }
    .judge {
        font-size: 14px;
        color: var(--content-color);
        margin-right: 10px;
    }
    .review-bottom {
        display: flex;
        justify-content: space-between;
    }
    .like-button {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        color: var(--date-color);
    }
    .like-button:hover {
        color: #09adeb;
    }
    .like-num {
        margin-left: 3px;
        font-size: 14px;
    }
    .reply-button {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        color: var(--date-color);
    }
    .reply-button:hover {
        color: #09adeb;
    }
    .review-container {
        display: flex;
        flex-direction: column;
        margin: auto;
        padding: 16px; /* 增加内边距 */
        max-width: 600px; /* 限制最大宽度 */
        gap: 10px;
    }

</style>