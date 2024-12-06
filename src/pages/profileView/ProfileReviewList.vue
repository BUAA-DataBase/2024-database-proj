<template>
    <div>
        <HeaderRow
            :num="25"
            word="条"
        />
        <ReviewList
            :show-author="false"
            :show-avatar="false"
            :display-num="5"
        />
    </div>
</template>

<script lang="ts" setup name="">
    import PostPreViewList from '@/components/postPreView/PostPreViewList.vue';
    import HeaderRow from '@/pages/profileView/HeaderRow.vue';
</script>

<style scoped lang="scss">
    
</style>