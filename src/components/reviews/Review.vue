<template>
    <div class="review-container">
        <t-space>
            <div class="avatar-container">
                <t-avatar v-if="showAvatar" size="50px" :image="avatar" alt="用户头像" shape="circle" />
            </div>
            <div class="info-container">
                <t-space direction="vertical">
                    <div class="top-row">
                        <t-space>
                            <router-link v-if="showAuthor" to="\">
                            <span  class="author">
                                {{ author }}
                            </span>
                            </router-link>
                            <span v-if="showAuthor" class="tip">点评了</span>
                            <router-link :to="{name : 'course' , params : {id : 1 }}">
                            <span class="course-teacher"
                            :class="{'large-font': !showAuthor}">
                                {{ course }}({{ teacher }})
                            </span>
                            </router-link>
                        </t-space>
                        <span class="time">{{ time }}</span>
                    </div>
                    <div class="content-container">
                        <span class="content">
                            {{ truncatedContent }}
                            <span class="read-more">>>更多</span>
                        </span>
                    </div>
                </t-space>
            </div>
        </t-space>
        <t-divider />
    </div>
</template>


<script lang="ts" setup>
    import { defineProps, ref, computed } from 'vue';
    import { useRouter } from 'vue-router';

    const props = defineProps({
        author: { type: String, required: true },
        avatar: { type: String, required: true },
        time: { type: String, required: true },
        course: { type: String, required: true },
        teacher: { type: String, required: true },
        content: { type: String, required: true },
        showAuthor: { type: Boolean, default: true },
        showAvatar: { type: Boolean, default: true },
    });

    const maxLength = 100; // 最大显示字符数
    const router = useRouter();

    const isTruncated = computed(() => props.content.length > maxLength);
    const truncatedContent = computed(() =>
        isTruncated.value ? props.content.slice(0, maxLength) + '...' : props.content
    );

    const readMoreHandler = () => {

    };
</script>


<style scoped lang="scss">
    a {
        text-decoration: none;
    }
    .review-container {
        padding: 10px 0;
    }
    .avatar-container {
        margin-right: 10px;
    }
    .content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
        positon: relative;
        line-height: 1.8;
        font-size: 14px;
        color: #777;
    }
    .read-more {
        color: cornflowerblue;
        cursor: pointer;
        margin-left: 4px;
    }
    .info-container {
        display: flex;
        flex-direction: column;
        width: 100%; /* 确保占据整个可用空间 */
    }
    .top-row {
        display: flex;
        align-items: center; /* 垂直居中 */
        justify-content: space-between; /* 左右分布 */
        width: 100%;
    }

    .time {
        color: #999;
        font-size: 12px;
        margin-left: auto; /* 如果不使用 space-between，也可通过 margin-left: auto 推到右侧 */
    }
    .author {
        font-weight: bold;
        color: cornflowerblue;
    }
    .course-teacher {
        font-weight: bold;
        color: rgb(11, 94, 248);
    }
    .large-font {
        font-size: 18px;
    }

</style>
