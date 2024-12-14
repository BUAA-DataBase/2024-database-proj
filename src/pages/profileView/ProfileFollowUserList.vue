<template>
    <UserItemList style="width: 100%;" 
        :user="props.user" 
        :isMyProfile="props.isMyProfile"
        @custom-event-forwarded="handleCustomEventForwarded"
    />
</template>

<script lang="ts" setup name="">
    import UserItemList from '@/components/userItem/UserItemList.vue';
    import type { UserState } from '@/store/types';
    import type { PropType } from 'vue';
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

    const emit = defineEmits(['custom-event-forwarded-again']);
 
    const handleCustomEventForwarded = (data : number) => {
        // 可以在这里处理数据，然后转发
        emit('custom-event-forwarded-again', data);
    };
</script>

<style scoped lang="scss">
    
</style>