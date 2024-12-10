<template>
    <div>
        <HeaderRow
            :num="num"
            word="条"
        />
        <PostPreViewList v-if="num > 0"
            :show-author="false"
            :show-avatar="false"
            :display-num="5"
            :author-id="props.user.userId"
            :author-name="props.user.userName"
        />
        <div v-else>
            <div class="no-post">
                <span>{{no_post_text}}</span>
            </div>
        </div> 
    </div>
</template>

<script lang="ts" setup name="">
    import PostPreViewList from '@/components/postPreView/PostPreViewList.vue';
    import HeaderRow from '@/pages/profileView/HeaderRow.vue';
    import { usePostStore } from '@/store/modules/postStore';
    import type { UserState } from '@/store/types';
    import { computed, type PropType } from 'vue';

    const useStore = usePostStore()


    const props = defineProps({
        user: {
            type: Object as PropType<UserState>,
            required: true
        },
        isMyProfile: {
            type: Boolean,
            required: true
        }
    });

    const no_post_text = computed(() => {
        return (props.isMyProfile == true) ? '您还没有发表任何帖子哦' : '暂无帖子'
    })

    const num = computed(()=>{
        return (useStore.getPostsByAuthor(props.user.userName)).length;
    })
</script>

<style scoped lang="scss">
    .no-post {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        font-size: 20px;
        color: #999;
    }
</style>