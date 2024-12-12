<template>
    <div class="review-wrapper">
        <span class="author">{{ review.author }}</span>
        <span v-if="review.toAuthor && review.toAuthor !== belongAuthor" class="tip"> 回复 </span>
        <span v-if="review.toAuthor && review.toAuthor !== belongAuthor" class="to-author">@{{ review.toAuthor }}</span>
        <div class="content-container">
            <span class="content">{{ review.content }}</span>
        </div>
        <t-space size="30px">
            <div>
                <span class="date">{{ review.time }}</span>
            </div>
            <t-space>
                <div class="like-button" @click="handleLikeClick">
                    <ThumbUpIcon size="14px"/>
                    <span class="like-num">{{ likeNum }}</span>
                </div>
                <div class="reply-button" @click="handleReplyClick">
                    <span class="like-num">回复</span>
                </div>
            </t-space>
        </t-space>
    </div>
</template>

<script lang="ts" setup name="">
    import {defineProps, ref} from 'vue'
    import type { ReviewState } from '@/store/types'
    import { ThumbUpIcon } from 'tdesign-icons-vue-next'
    import { usePostStore } from '@/store/modules/postStore';
    import { useUserStore } from '@/store/modules/userStore';
    import { useRouter } from 'vue-router';
    
    const props = defineProps<{
        review: ReviewState
        belongAuthor: string // 评论帖子的作者，如果和toAuthor字段相同的话，不用显示@
    }>()

    const postStore = usePostStore()
    const userStore = useUserStore()
    const router = useRouter()

    const likeNum = ref(props.review.likeUsers.length);

    const handleLikeClick = () => {
        if (userStore.getNowUser().userId == 0) {
            alert("请先登录！")
            router.push({path:"/login"})
            return;
        }
        postStore.updateCommentLikeNum(props.review.toPostId, props.review.reviewId, userStore.getNowUser().userId);
        likeNum.value = postStore.getReviewById(props.review.toPostId, props.review.reviewId)?.likeUsers.length as number;
        console.log('点赞')
    }

    const emit = defineEmits(['toggle-reply']);

    const handleReplyClick = () => {
        emit('toggle-reply');
    }

</script>

<style scoped lang="scss">
    .review-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .author {
        font-size: 14px;
        color: var(--author-name);
    }
    .to-author {
        font-size: 14px;
        color: var(--author-name);
    }
    .date {
        font-size: 12px;
        color: var(--date-color);
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
</style>