<template>
        <div class="profileCard">
            <t-space direction="vertical">
                <span class="profileUsername">{{ username }}</span>
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
                        <span class="countContent">{{ FocusPersomNum }}</span>
                        <span class="countTitle">人</span>
                    </t-space>
                    <t-space>
                        <span class="countTitle">被关注</span>
                        <span class="countContent">{{ FocusedPersonNum }}</span>
                        <span class="countTitle">人</span>
                    </t-space>
                    <t-space>
                        <span class="countTitle">关注了</span>
                        <span class="countContent">{{ FocusedCourseNum }} </span>
                        <span class="countTitle">门课程</span>
                    </t-space>
                    <t-space>
                        <span class="countTitle">点评了</span>
                        <span class="countContent">{{ ReviewCourseNum }} </span>
                        <span class="countTitle">门课程</span>
                    </t-space>
                </t-space>
            </t-space>
        </div>
</template>

<script lang="ts" setup name="">
    import {ref} from 'vue'
    import avatarImage from '@/assets/img_avatar.jpg'
    import { HeartIcon, ChatBubbleIcon } from 'tdesign-icons-vue-next';
    const username = ref('jo护车来喽')
    const introduction = ref('2022计科人一枚~2022计科人一枚~')
    const FocusPersomNum = ref(10)
    const FocusedPersonNum = ref(20)
    const FocusedCourseNum = ref(30)
    const ReviewCourseNum = ref(40)
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