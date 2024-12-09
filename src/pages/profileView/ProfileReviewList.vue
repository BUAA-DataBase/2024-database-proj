<template>
    <div>
        <HeaderRow
            :num="num"
            word="条"
        />
        <PostPreViewList
            :show-author="false"
            :show-avatar="false"
            :display-num="5"
            :author-id="props.user.userId"
            :author-name="props.user.userName"
        />
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
        }
    });

    const num = computed(()=>{
        return (useStore.getPostsByAuthor(props.user.userName)).length;
    })
</script>

<style scoped lang="scss">
    
</style>