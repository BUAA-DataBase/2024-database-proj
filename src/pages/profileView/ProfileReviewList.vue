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
    import ReviewList from '@/components/reviews/ReviewList.vue';
    import HeaderRow from '@/pages/profileView/HeaderRow.vue';
</script>

<style scoped lang="scss">
    
</style>