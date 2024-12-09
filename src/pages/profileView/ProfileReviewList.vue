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
            :author-id="props.authorId"
            :author-name="props.authorName"
        />
    </div>
</template>

<script lang="ts" setup name="">
    import PostPreViewList from '@/components/postPreView/PostPreViewList.vue';
    import HeaderRow from '@/pages/profileView/HeaderRow.vue';
    import { usePostStore } from '@/store/modules/postStore';
    import { computed } from 'vue';

    const useStore = usePostStore()

    const props = defineProps({
        authorId: { type: Number, required: true },
        authorName: { type: String, required: true },
    })

    const num = computed(()=>{
        return (useStore.getPostsByAuthor(props.authorName)).length;
    })
</script>

<style scoped lang="scss">
    
</style>