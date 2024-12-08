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
        />
    </div>
</template>

<script lang="ts" setup name="">
    import PostPreViewList from '@/components/postPreView/PostPreViewList.vue';
    import HeaderRow from '@/pages/profileView/HeaderRow.vue';
    import { usePostStore } from '@/store/modules/postStore';
import { computed } from 'vue';

    const useStore = usePostStore()

    const num = computed(()=>{
        return useStore.getPostsSize();
    })
</script>

<style scoped lang="scss">
    
</style>