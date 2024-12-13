<template>
    <t-content class="editor-container">
        <div class="item">
            <span class="title">课程名称</span>
            <t-auto-complete
                v-model="courseName"
                :options="courseOptions"
                placeholder="请输入课程名称"
                clearable
                
            />
        </div>
        <div class="item">
            <span class="title">授课教师</span>
            <t-auto-complete
                v-model="teacherName"
                :options="teacherOptions"
                placeholder="请输入授课教师"
                clearable
            />
        </div>
        <div class="item">
            <span class="title">开课学期</span>
            <t-auto-complete
                v-model="year"
                :options="yearOptions"
                placeholder="请输入开课学期"
                clearable
            />
        </div>
        <div class="rate-container">
            <span class="title">我的评分</span>
            <div class="rate-comp">
                <div class="rate-item">
                    <span class="rate-title">总体评价</span>
                    <t-rate v-model="rate" />
                    <span class="rate-num">{{ rate.toFixed(1) }}</span>
                </div>
                <div class="rate-item">
                    <span class="rate-title">课程难度</span>
                    <t-rate v-model="difficulty" />
                    <span class="rate-text">{{ difficulty_text }}</span>
                </div>
                <div class="rate-item">
                    <span class="rate-title">作业多少</span>
                    <t-rate v-model="workload" />
                    <span class="rate-text">{{ workload_text }}</span>
                </div>
                <div class="rate-item">
                    <span class="rate-title">给分好坏</span>
                    <t-rate v-model="grading" />
                    <span class="rate-text">{{ grading_text }}</span>
                </div>
                <div class="rate-item">
                    <span class="rate-title">收获大小</span>
                    <t-rate v-model="gain" />
                    <span class="rate-text">{{ gain_text }}</span>
                </div>
            </div>
        </div>
        <div class="detail-container">
            <span class="title">详细评价</span>
            <t-textarea 
                v-model="comment" 
                placeholder="请输入详细的课程评价" 
                :autosize="{ minRows: 4, maxRows: 10 }"
            />
        </div>
        <t-button size="large" @click="handIn">提交评测</t-button>
    </t-content>
</template>

<script lang="ts" setup name="">
    import { computed, onMounted, ref, watch } from 'vue'
    import { useCourseStore } from '@/store/modules/courseStore';
    import type { AutoCompleteProps } from 'tdesign-vue-next';
    import { convertDifficulty, convertGain, convertGrading, convertWorkload } from '@/constants/map';
    import { usePostStore } from '@/store/modules/postStore';
    import { useUserStore } from '@/store/modules/userStore';
    import type { PostState } from '@/store/types';
    import { useRouter, useRoute } from 'vue-router';

    const courseStore = useCourseStore();
    const postStore = usePostStore();
    const userStore = useUserStore();

    const router = useRouter()
    const route = useRoute()

    const courseId = parseInt(route.params.courseId as string );

    const course = courseStore.getCourseById(courseId);

    const courseName = ref((courseId == null || course == null) ? '': course.courseName);
    const teacherName = ref((courseId == null || course == null) ? '': course.courseTeacher);
    const oldPost = ref(postStore.getPostByCourseTeacherAndAuthorId(courseName.value, teacherName.value ,userStore.getNowUser().userId));
    const year = ref((oldPost.value == null) ? '': oldPost.value.courseYear);
    const rate = ref(4);
    const difficulty = ref(4);
    const difficulty_text = ref(convertDifficulty(4));
    const workload = ref(4);
    const workload_text = ref(convertWorkload(4));
    const grading = ref(4);
    const grading_text = ref(convertGrading(4));
    const gain = ref(4);
    const gain_text = ref(convertGain(4));
    const comment = ref(oldPost.value ? oldPost.value.content.comment : '');

    onMounted(()=> {
        console.log(courseId);
        console.log(courseName);
        console.log(teacherName);
    })

    watch([courseName, teacherName], ([newCourseName, newTeacherName]) => {
        oldPost.value = postStore.getPostByCourseTeacherAndAuthorId(newCourseName, newTeacherName, userStore.getNowUser().userId);
    });

    watch(difficulty, (newVal) => {
        difficulty_text.value = convertDifficulty(newVal);
    });

    watch(workload, (newVal) => {
        workload_text.value = convertWorkload(newVal);
    });

    watch(grading, (newVal) => {
        grading_text.value = convertGrading(newVal);
    });

    watch(gain, (newVal) => {
        gain_text.value = convertGain(newVal);
    });

    // 获取课程名称的选项（初始化）
    const courseOptions = ref<AutoCompleteProps<string>['options']>(courseStore.getAllCourseNames());

    // 获取教师名称的选项，并且这个选项需要根据 `courseName` 动态变化
    const teacherOptions = ref<AutoCompleteProps<string>['options']>([]);

    // 获取年份的选项，并且这个选项需要根据 `courseName` 和 `teacherName` 动态变化
    const yearOptions = ref<AutoCompleteProps<string>['options']>([]);

    // 监听 `courseName` 的变化，更新 `teacherOptions`
    watch(courseName, (courseName) => {
    // 当课程名称变化时，根据新的课程名称获取对应的教师列表
    teacherOptions.value = courseStore.getTeachersByCourseName(courseName);
    });

    // 监听 `courseName` 和 `teacherName` 的变化，更新 `yearOptions`
    watch([courseName, teacherName], () => {
        yearOptions.value = courseStore.getCourseYears(courseName.value, teacherName.value);
    }, { immediate: true });

    const reviewId = ref(0);

    async function handIn() {
    // 创建 PostState 对象
    console.log(userStore.getNowUser())
    let newPost: PostState;
    if (oldPost.value) {
        newPost = oldPost.value;
        newPost.content.comment = comment.value;
    } else {
        newPost = {
            postId: Date.now(), // 使用时间戳作为唯一ID，或从后端获取
            author: userStore.getNowUser().userName, // 这里可以根据用户的登录信息动态获取
            authorId: userStore.getNowUser().userId,
            avatar: userStore.getNowUser().avatar, // 同样可以动态获取
            time: formatDateToCustomString(new Date()),
            mtime: formatDateToCustomString(new Date()),
            course: courseName.value,
            courseYear: year.value,
            teacher: teacherName.value,
            content: {
                comment: comment.value,
                rate: rate.value,
                difficulty: difficulty.value,
                workload: workload.value,
                grading: grading.value,
                gain: gain.value,
            },
            likeUsers: [],
            reviews: [], // 没有评论，初始化为空
            showAuthor: true, // 根据需求设置
            showAvatar: true, // 根据需求设置
        };
        console.log(newPost);
        // 调用 postStore 的 addPost 方法将新帖子添加到状态中
        const user = userStore.getNowUser();
        try {
            reviewId.value = await postStore.addPost(newPost, user.verificationCode);
            console.log(reviewId.value)
        }
        catch (error) {
            console.error('Error adding post:', error);
        }
    }

    // 提交成功后，你可以清空输入框或进行一些反馈操作
    courseName.value = '';
    teacherName.value = '';
    year.value = '';
    rate.value = 4;
    difficulty.value = 4;
    workload.value = 4;
    grading.value = 4;
    gain.value = 4;
    comment.value = '';

    alert('提交成功，新的帖子已添加');
    const courseId = courseStore.getCourseByNameAndTeacher(newPost.course,newPost.teacher) as number;
    console.log(reviewId.value)
    router.push({name:"course", params:{id: courseId, reviewId : reviewId.value}})
    console.log('提交成功，新的帖子已添加');
}

function formatDateToCustomString(date : Date) {
    // 提取年份，getFullYear() 方法返回完整的年份（四位数）
    let year = date.getFullYear();
 
    // 提取月份，getMonth() 方法返回的月份是从 0（一月）到 11（十二月）的整数
    // 因此需要加 1，并使用 padStart() 方法确保月份始终是两位数
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
 
    // 提取日期，getDate() 方法返回一个月中的某一天（1 到 31）
    // 使用 padStart() 方法确保日期始终是两位数
    let day = ('0' + date.getDate()).slice(-2);
 
    // 提取小时，getHours() 方法返回小时数（0 到 23）
    // 使用 padStart() 方法确保小时始终是两位数
    let hours = ('0' + date.getHours()).slice(-2);
 
    // 提取分钟，getMinutes() 方法返回分钟数（0 到 59）
    // 使用 padStart() 方法确保分钟始终是两位数
    let minutes = ('0' + date.getMinutes()).slice(-2);
 
    // 根据所需的格式拼接字符串
    return `${year}-${month}-${day}-${hours}:${minutes}`;
  }
</script>

<style scoped lang="scss">
    .editor-container {
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        gap: 25px;
        width: 60%;
        border: 2px solid #ccc; /* 设置边框 */
        padding: 30px 25px; /* 可选，给容器内部添加一些空白 */
        border-radius: 8px; /* 可选，设置圆角 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 可选，设置阴影 */
    }
    .item {
        display: flex;
        gap: 20px;
        flex-direction: row;
        align-items: center;
    }
    .title {
        font-size: 18px;
        font-weight: bold;
        color: #4983c9;
        // 不换行
        white-space: nowrap;
    }
    .rate-container {
        display: flex;
        flex-direction: row;
        gap: 50px;
    }
    .detail-container {
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        gap: 20px;
    }
    .rate-comp {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .rate-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 15px;
    }
    .rate-title {
        font-size: 16px;
        font-weight: bold;
        color: #4983c9;
    }
    .rate-num {
        font-size: 16px;
        font-weight: bold;
        color: #fadb14;
    }
    .rate-text {
        font-size: 15px;
        color: #666;
    }
</style>