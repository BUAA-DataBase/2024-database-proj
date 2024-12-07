<template>
    <div v-for="(post, index) in posts.slice(0, displayNum)" :key="index">
      <PostPreView
        :author="post.author"
        :avatar="post.avatar"
        :time="post.time"
        :course="post.course"
        :teacher="post.teacher"
        :content="post.content.comment"
        :showAuthor="showAuthor"
        :showAvatar="showAvatar"
      />
    </div>
</template>

<script lang="ts" setup name="">
    import {ref, defineProps, onMounted, watch, defineEmits, computed} from 'vue'
    import avatar from '@/assets/img_avatar.jpg';
    import PostPreView from '@/components/postPreView/PostPreView.vue';
    import { useRoute } from 'vue-router';
    import { usePostStore } from '@/store/modules/postStore';
    import type { PostState, CommentContent } from '@/store/types';

    defineProps({
        showAvatar: { type: Boolean, default: true },
        showAuthor: { type: Boolean, default: true },
        displayNum: { type: Number, default: 10 }
    })

    const route = useRoute();

    const useStore = usePostStore();

    const posts = ref<PostState[]>([]);
    const currentPage = computed<number>(() => {
        const pageParam = route.params.page;
        // 如果pageParam是字符串，则尝试解析为数字；否则，使用默认值1
        return (typeof pageParam === 'string' && !isNaN(parseInt(pageParam, 10)))
        ? parseInt(pageParam, 10)
        : 1;
    });

    function fetchPosts(page: number): PostState[] {
        // 从 postStore 中获取排序后的评论数组
        return useStore.getSortedPostsByMTime(page);
    }

    onMounted(() => {
        posts.value = fetchPosts(currentPage.value);
    });
 
    // 监听currentPage的变化，并在变化时重新获取数据
    watch(currentPage, (newPage) => {
        posts.value = fetchPosts(newPage);
    });

    const emit = defineEmits(['update:arraySize']);

    function notifyPostsSizeChange() {
      emit('update:arraySize', posts.value.length);
    }

    watch(posts, () => {
      notifyPostsSizeChange();
    }, { deep: true });

    onMounted(() => {
      notifyPostsSizeChange();
    });
</script>

<style scoped lang="scss">
    
</style>