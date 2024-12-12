<template>
    <div class="review-container">
            <div v-if="showAvatar" class="avatar-container">
                <t-avatar v-if="dataLoaded" size="50px" :image="thisPostAvatar" alt="用户头像" shape="circle" />
                <t-skeleton style="line-height:50px" animation="gradient" theme="avatar" v-else />
            </div>
            <div class="info-container">
                <t-space direction="vertical">
                    <div class="top-row" v-if="dataLoaded">
                        <t-space>
                            <span v-if="showAuthor" class="author" @click="toAuthor">
                                {{ thisPostAuthor }}
                            </span>
                            <span v-if="showAuthor" class="tip">点评了</span>
                            <span class="course-teacher"
                            :class="{'large-font': !showAuthor}"
                            @click="toCourse">
                                {{ course }}({{ teacher }})
                            </span>
                        </t-space>
                        <span class="time">{{ time }}</span>
                    </div>
                    <div v-else>
                        <t-skeleton style="width:80px" animation="gradient" theme="text" />
                    </div>
                    <div class="content-container">
                        <span class="content" v-if="dataLoaded">
                            {{ truncatedContent }}
                            <span class="read-more" @click="toPost">>>更多</span>
                        </span>
                        <div class="paragrah-container" v-else>
                            <t-skeleton style="line-height:15px" animation="gradient" theme="paragraph" />
                        </div>
                    </div>
                </t-space>
            </div>
    </div>
    <t-divider style="margin-top: 15px; margin-bottom: 15px;"/>
</template>


<script lang="ts" setup>
    import { defineProps, ref, computed, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { useCourseStore } from '@/store/modules/courseStore';
    import { usePostStore} from '@/store/modules/postStore';

    import { onMounted } from 'vue';
    import { Role, type UserState } from '@/store/types';
    import axios from 'axios';

    const courseStore = useCourseStore()
    const postStore = usePostStore()

    const dataLoaded = ref(false);

    const props = defineProps({
        postId: { type: Number, required: true },
        authorId: { type: Number, required: true },
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
    const useStore = useCourseStore();
    const useStore2 = usePostStore();

    const thisPostAuthor = ref(props.author);
    const thisPostAvatar = ref(props.avatar);

    const rawUser = ref<UserState>({
        userId: 0,
        verificationCode: '',
        userName: '',
        password: '',
        email: '',
        role: Role.Student,
        major: '',
        grade: '',
        avatar: '',
        college: '',
        gender: '',
        followedCourses: [],
        followers: [],
        following: [],
        blockedUsers: [],
        posts:[],
        registrationDate: new Date(), // 或者其他默认值
      });
      const parsedData = ref<UserState>(rawUser.value);
      const error = ref<string | null>(null);

    onMounted (async () => {
        await courseStore.fetchData();
        await postStore.fetchData();
        dataLoaded.value = true; // 数据加载完成后设置标志
    })

    watch(
        () => props,
        async (newProps, oldProps) => {
        console.log(props.author)
        console.log(props.authorId)
        console.log(props.avatar)
        try {
            const responseGetInfo = await axios.get(`/api/users/info?id=${props.authorId}`); // 发送GET请求到后端API
            if (responseGetInfo.data.result == 'ok') {
              console.log(responseGetInfo.data)
              try {
                // 尝试解析JSON字符串
                parsedData.value = JSON.parse(responseGetInfo.data.profile) as UserState;
                error.value = null; // 清除任何先前的错误
              } catch (e) {
                // 捕获解析错误
                error.value = 'Invalid JSON format!';
                parsedData.value = rawUser.value; // 清除解析后的数据
              }
              console.log(parsedData)
              if (thisPostAuthor.value !== parsedData.value.userName){
                thisPostAuthor.value = parsedData.value.userName;
              }
              if (thisPostAvatar.value !== parsedData.value.avatar) {
                thisPostAvatar.value = parsedData.value.avatar;
              }
            }
          } catch (error) {
            console.error('Error fetching user info:', error);
          }
    }, {immediate : true, deep : true})
    

    const isTruncated = computed(() => cleanedText.value.length > maxLength);
    const truncatedContent = computed(() =>
        isTruncated.value ? cleanedText.value.slice(0, maxLength) + '...' : cleanedText.value
    );

    const cleanedText = ref<string>(props.content.replace(/[#*]/g, ''));

    function toAuthor() {
        const authorId = props.authorId;
        console.log(authorId);
        router.push({name: "user", params:{id : authorId}});
    }

    function toCourse() {
        const courseId =  useStore.getCourseIdByNameAndTeacher(props.course,props.teacher);
        router.push({name: "course", params:{id : courseId}});
    }

    function toPost() {
        const courseId =  useStore.getCourseIdByNameAndTeacher(props.course,props.teacher);
        const reviewId = props.postId;
        router.push({name: "course", params:{id : courseId, reviewId: reviewId}});
    }
</script>


<style scoped lang="scss">
    a {
        text-decoration: none;
    }
    .paragrah-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 4px;
    }
    .review-container {
        display: flex;
        align-items: top;
        flex-direction: row ;
        padding: 10px 0;
        width: 100%;
    }
    .avatar-container {
        margin-right: 20px;
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
        cursor: pointer;
        font-weight: bold;
        color: var(--author-name);
    }
    .course-teacher {
        cursor: pointer;
        font-weight: bold;
        color: var(--course-teacher-color);
    }
    .large-font {
        font-size: 18px;
    }

</style>