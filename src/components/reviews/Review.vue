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
                    <span class="like-num">{{ review.likeNum }}</span>
                </div>
                <div class="reply-button" @click="handleReplyClick">
                    <span class="like-num">回复</span>
                </div>
            </t-space>
        </t-space>
    </div>
</template>

<script lang="ts" setup name="">
    import {defineProps} from 'vue'
    import type { ReviewState } from '@/store/types'
    import { ThumbUpIcon } from 'tdesign-icons-vue-next'
    
    const props = defineProps<{
        review: ReviewState
        belongAuthor: string // 评论帖子的作者，如果和toAuthor字段相同的话，不用显示@
    }>()

    const handleLikeClick = () => {
        props.review.likeNum += 1
        console.log('点赞')
    }

    const handleReplyClick = () => {
        console.log('回复')
    }

</script>

<style scoped lang="scss">
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