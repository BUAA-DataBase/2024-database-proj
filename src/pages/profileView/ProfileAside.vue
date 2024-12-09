<template>
        <div class="profileCard">
            <t-space direction="vertical">
                <span class="profileUsername">{{ props.user.userName }}</span>
                <t-space style="margin-top: 10px;">
                    <t-button>
                        <template #icon>
                            <HeartIcon />
                        </template>
                        关注
                    </t-button>

                    <t-button theme="default">
                        <template #icon>
                            <ChatBubbleIcon />
                        </template>
                        私聊
                    </t-button>
                </t-space>

                <t-divider/>

                <div class="introductionContainer">
                    <span class="introduction">{{ introduction }}</span>
                </div>

                <t-divider/>

                <t-space direction="vertical">
                    <t-space>
                        <span class="countTitle">关注了</span>
                        <span class="countContent">{{ props.user.following.length }}</span>
                        <span class="countTitle">人</span>
                    </t-space>
                    <t-space>
                        <span class="countTitle">被关注</span>
                        <span class="countContent">{{ props.user.followers.length }}</span>
                        <span class="countTitle">人</span>
                    </t-space>
                    <t-space>
                        <span class="countTitle">关注了</span>
                        <span class="countContent">{{ props.user.followedCourses.length }} </span>
                        <span class="countTitle">门课程</span>
                    </t-space>
                    <t-space>
                        <span class="countTitle">点评了</span>
                        <span class="countContent">{{ props.user.posts.length }} </span>
                        <span class="countTitle">门课程</span>
                    </t-space>
                </t-space>
            </t-space>
        </div>
</template>

<script lang="ts" setup name="">
    import {ref, type PropType} from 'vue'
    import avatarImage from '@/assets/img_avatar.jpg'
    import { HeartIcon, ChatBubbleIcon } from 'tdesign-icons-vue-next';
    import type { UserState } from '@/store/types';

    const props = defineProps({
        user: {
            type: Object as PropType<UserState>,
            required: true
        }
    });

    const introduction = ref('2022计科人一枚~')
</script>

<style scoped lang="scss">
    .profileCard {
        padding: 30px;
        background-color: var(--card-color);
        border-radius: 8px;
        box-shadow: 0 2px 4px 0 var(--border-color);
        margin: 20px;
        width: 250px;

        display: flex; /* 启用 Flexbox 布局 */
        flex-direction: column; /* 使子元素垂直排列 */
        align-items: center; /* 水平居中 */
    }
    .profileUsername {
        font-size: 17px;
        font-weight: bold;
    }
    .introduction {
        font-size: 12px;
        color: var(--introduction-color);
    }
    .countContent {
        font-size: 14px;
        font-weight: bold;
        color: var(--read-more-color);
    }
</style>