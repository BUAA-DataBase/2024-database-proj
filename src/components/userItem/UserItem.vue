<template>
    <div class="userItem">
        <div class="block1">
            <t-avatar :image="avatarImage" size="50px" style="margin-right: 20px"/>
            <div>
                <span class="username">{{ userName }}</span>
                <div class="tip-wrapper">
                    <span class="tip">{{ numberOfNewReviews }}条新点评</span>
                </div>
            </div>
        </div>
        <t-button v-if="follow && (userId == userStore.getNowUser().userId)" theme="default" @click="cancelFollow">已关注</t-button>
        <t-button v-if="!follow && (userId == userStore.getNowUser().userId)" theme="primary" @click="goToFollow" style="padding: 0 22px">关注</t-button>
    </div>
</template>

<script lang="ts" setup name="">
    import { useUserStore } from '@/store/modules/userStore';
    import {defineProps, ref} from 'vue'
    import { useRouter } from 'vue-router';

    const follow = ref(true)
    
    const props = defineProps({
        userId: {type: Number, required : true},
        thisId: {type: Number, required : true},
        avatarImage: { type: String, required: true },
        userName: { type: String, required: true },
        numberOfNewReviews: { type: Number, required: true },
    })

    async function cancelFollow() {
        if (userStore.getNowUser().userId != 0) {
            follow.value = false
            await userStore.unfollowUser(props.thisId)
            console.log("unfollow")
        }
        else {
            alert("请先登录！")
            router.push({path:"/login"})
        }
    }

    const userStore = useUserStore();
    const router = useRouter();

    async function goToFollow() {
        if (userStore.getNowUser().userId != 0) {
            follow.value = true
            await userStore.followUser(props.thisId)
            console.log("follow")
        }
        else {
            alert("请先登录！")
            router.push({path:"/login"})
        }
    }
</script>

<style scoped lang="scss">
    .userItem {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 5;
        margin-bottom: 20px;
        width: 100%;
    }
    .block1 {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .tip-wrapper {
        background-color: #f6f8f9;
        border-radius: 8px;
        padding: 0px 10px;
        margin-top: 5px;    
    }
    .tip {
        font-size: 12px;
        color: #666;
    }
</style>