<template>
    <div v-for="(comment, index) in comments.slice(0, displayNum)" :key="index" class="comment-container">
      <Review
        :author="comment.author"
        :avatar="comment.avatar"
        :time="comment.time"
        :course="comment.course"
        :teacher="comment.teacher"
        :content="comment.content.comment"
        :showAuthor="showAuthor"
        :showAvatar="showAvatar"
      />
    </div>
</template>

<script lang="ts" setup name="">
    import {ref, defineProps, onMounted, watch, defineEmits, computed} from 'vue'
    import avatar from '@/assets/img_avatar.jpg';
    import Review from '@/components/reviews/Review.vue';
    import { useRoute } from 'vue-router';
    import { useCommentStore } from '@/store/modules/commentStore';
    import type { CommentState, CommentContent } from '@/store/types';

    defineProps({
        showAvatar: { type: Boolean, default: true },
        showAuthor: { type: Boolean, default: true },
        displayNum: { type: Number, default: 10 }
    })

    const route = useRoute();

    const useStore = useCommentStore();

    const comments = ref<CommentState[]>([]);
    const currentPage = computed<number>(() => {
        const pageParam = route.params.page;
        // 如果pageParam是字符串，则尝试解析为数字；否则，使用默认值1
        return (typeof pageParam === 'string' && !isNaN(parseInt(pageParam, 10)))
        ? parseInt(pageParam, 10)
        : 1;
    });

    function fetchComments(page: number): CommentState[] {
        // 从 commentStore 中获取排序后的评论数组
        return useStore.getSortedComments(page);
    }

    onMounted(() => {
        comments.value = fetchComments(currentPage.value);
    });
 
    // 监听currentPage的变化，并在变化时重新获取数据
    watch(currentPage, (newPage) => {
        comments.value = fetchComments(newPage);
    });

    const emit = defineEmits(['update:arraySize']);

    function notifyCommentsSizeChange() {
      emit('update:arraySize', comments.value.length);
    }

    watch(comments, () => {
      notifyCommentsSizeChange();
    }, { deep: true });

    onMounted(() => {
      notifyCommentsSizeChange();
    });
</script>

<style scoped lang="scss">
    
</style>