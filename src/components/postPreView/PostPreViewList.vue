<template>
    <div v-for="(post, index) in posts.slice(0, displayNum)" :key="index">
      <PostPreView
        :postId="post.postId"
        :authorId="post.authorId"
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
    import { useUserStore } from '@/store/modules/userStore';

    const props = defineProps({
        showAvatar: { type: Boolean, default: true },
        showAuthor: { type: Boolean, default: true },
        displayNum: { type: Number, default: 10 },
        authorId: { type: Number, required: true },
    })

    const route = useRoute();

    const useStore = usePostStore();
    const userStore = useUserStore();

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
        if (props.authorId < 0) {
          console.log(page)
          return useStore.getSortedPostsByMTime(page);
        } else {
          console.log(page)
          return useStore.getMTimeSortedPostsByAuthorId(props.authorId, page);
        }
    }

    onMounted(() => {
        console.log('PostPreViewList mounted');
        console.log(posts.value.length);
        posts.value = fetchPosts(currentPage.value);
    });
 
    // 监听currentPage的变化，并在变化时重新获取数据
    watch(currentPage, (newPage) => {
        console.log(newPage);
        posts.value = fetchPosts(newPage);
        console.log(posts.value)
    });

    const emit = defineEmits(['update:arraySize']);

    function notifyPostsSizeChange() {
      emit('update:arraySize', useStore.getPostsSize());
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