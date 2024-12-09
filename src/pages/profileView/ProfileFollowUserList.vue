<template>
    <UserItemList style="width: 100%;" :user="props.user"/>
</template>

<script lang="ts" setup name="">
    import UserItemList from '@/components/userItem/UserItemList.vue';
    import type { UserState } from '@/store/types';
    import type { PropType } from 'vue';
    const props = defineProps({
        user: {
            type: Object as PropType<UserState>,
            required: true
        }
    });
</script>

<style scoped lang="scss">
    
</style>