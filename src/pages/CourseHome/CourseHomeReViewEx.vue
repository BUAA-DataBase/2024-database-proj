<template>
    <div class="review-container">
        <t-space direction="vertical" size="10px">
            <t-space align="baseline">
                <span class="author">{{ props.author }}</span>
                <t-rate v-model="props.rate" disabled size=""/>
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
                    <div class="reply-button" @click="handleReplyClick">
                        <span><ChatIcon size="14px"/></span>
                        <span class="like-num">{{ reply_count }}</span>
                    </div>
                </t-space>
            </t-space>
            <LittleCommentEditor
                :name="props.author"
            />
        </t-space>
    </div>
    <t-divider dashed/>
</template>

<script lang="ts" setup name="">
    import type { CommentContent } from '@/store/types';
    import { convertDifficulty, convertGain, convertGrading, convertWorkload } from '@/constants/map';
    import {ref, defineProps} from 'vue'
    import { marked } from 'marked'
    import { ChatIcon, ThumbUpIcon } from 'tdesign-icons-vue-next';
    import LittleCommentEditor from '@/components/editor/LittleCommentEditor.vue';
    
    const props = defineProps<{
        author: string,
        date_published: string,
        date_updated: string,
        avatar: string,
        year: string,
        rate: number,
        content: CommentContent,
        likes: number,
        reply_count: number,
        replies: Comment[],
    }>()

    const difficulty = convertDifficulty(props.content.difficulty)
    const workload = convertWorkload(props.content.workload)
    const grading = convertGrading(props.content.grading)
    const gain = convertGain(props.content.gain)

    const likes = ref(props.likes)

    // 点赞按钮的点击处理函数
    const handleLikeClick = () => {
        likes.value += 1;  // 点击时点赞数加1
        console.log('点赞按钮被点击了');
    };

    // 回复按钮的点击处理函数
    const handleReplyClick = () => {
        console.log('回复按钮被点击了');
        // 这里可以触发显示评论区等操作
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
</style>