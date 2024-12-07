<template>
    <div class="review-container">
        <t-space>
            <div v-if="showAvatar" class="avatar-container">
                <t-avatar  size="50px" :image="avatar" alt="用户头像" shape="circle" />
            </div>
            <div class="info-container">
                <t-space direction="vertical">
                    <div class="top-row">
                        <t-space>
                            <router-link v-if="showAuthor" :to="{name: 'user', params:{id : 1}}">
                            <span  class="author">
                                {{ author }}
                            </span>
                            </router-link>
                            <span v-if="showAuthor" class="tip">点评了</span>
                            <router-link :to="{name: 'course', params:{id : 1}}">
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
                            <router-link :to="{name: 'course', params:{id : 1, reviewId: 1}}">
                            <span class="read-more">>>更多</span>
                            </router-link>
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

    import { onMounted } from 'vue';
    import { Content } from 'tdesign-vue-next';

    onMounted(() => {
        const reviewElement = document.querySelector('.review-container') as HTMLElement;
        if (reviewElement) {
            console.log(`Review 组件宽度: ${reviewElement.offsetWidth}px`);
        }
    });

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

    const isTruncated = computed(() => cleanedText.value.length > maxLength);
    const truncatedContent = computed(() =>
        isTruncated.value ? cleanedText.value.slice(0, maxLength) + '...' : cleanedText.value
    );

    const cleanedText = ref<string>(props.content.replace(/[#*]/g, ''));

    const readMoreHandler = () => {
        
    };
</script>


<style scoped lang="scss">
    a {
        text-decoration: none;
    }
    .review-container {
        padding: 10px 0;
        width: 100%;
    }
    .avatar-container {
        margin-right: 10px;
    }
    .content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.8;
        font-size: 14px;
        color: var(--text-color);
    }
    .content-container {
        display: flex;
        width: 100%;
    }
    .read-more {
        color: var(--read-more-color);
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
        color: var(--date-color);
        font-size: 12px;
        margin-left: auto; /* 如果不使用 space-between，也可通过 margin-left: auto 推到右侧 */
    }
    .author {
        font-weight: bold;
        color: var(--author-name);
    }
    .course-teacher {
        font-weight: bold;
        color: var(--course-teacher-color);
    }
    .large-font {
        font-size: 18px;
    }

</style>