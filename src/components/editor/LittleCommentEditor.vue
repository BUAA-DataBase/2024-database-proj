<template>
    <div class="comment-editor">
      <!-- 这里的值会动态加上 "回复@{{ name }}" -->
      <textarea
        v-model="content"
        :placeholder="'回复 @' + props.toAuthor"
        class="comment-input"
        @input="onInput"
        rows="4" 
      ></textarea>
      <t-button @click="submitComment">发送</t-button>
    </div>
  </template>
  
  <script lang="ts" setup name="">
  import { usePostStore } from '@/store/modules/postStore';
  import { useUserStore } from '@/store/modules/userStore';
  import type {ReviewState} from '@/store/types'
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  // 接收传入的 name 参数
  const props = defineProps({
    toPostId: {
      type: Number,
      required: true,
    },
    toAuthor: {
      type: String,
      required: true,
    },
    toAvatar: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    }
  });
  

  const userStore = useUserStore();
  const postStore = usePostStore();

  const content = ref("")

  // 用来存储评论的文本
  
  // 输入框内容发生变化时的回调
  const onInput = () => {
    // 这里可以加入一些额外的处理逻辑，比如字符限制等
    console.log(content.value);
  };

  const emit = defineEmits();
  
  const router = useRouter()

  // 提交评论
  const submitComment = () => {
    if (!content.value) {
      alert("评论内容不能为空");
      return;
    }

    if (userStore.getNowUser().userId == 0) {
      alert("请先登录！")
      router.push({path:"/login"})
      return;
    }
    
    const comment = ref<ReviewState>({
      reviewId: 0,
      toPostId: props.toPostId,
      toAuthor: props.toAuthor,
      toAvatar: props.toAvatar,
      author: userStore.getNowUser().userName,
      avatar: userStore.getNowUser().avatar,
      time: formatDateToCustomString(new Date()),
      mtime: formatDateToCustomString(new Date()),
      content: content.value,
      likeUsers: 0
    });
    // 提交评论的逻辑
    postStore.addCommentToPost(comment.value, userStore.getNowUser().verificationCode)
    .then(() => {
      console.log("评论已提交:", comment.value);
      
      // 触发自定义事件 'comment-submitted'
      // 你可以传递额外的数据作为事件的第二个参数（这里是评论内容，但也可以是其他数据）
      emit('comment-submitted', comment.value.toPostId);
      // 清空评论框（可选）
      content.value = "";
    })
    .catch((error) => {
      console.error("提交评论时出错:", error);
      // 处理错误（例如显示错误消息）
    });
    console.log("评论已提交:", comment.value);
  };

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
  .comment-editor {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 600px;
    margin: auto;
  }
  
  .comment-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none; /* 禁止手动调整高度 */
    overflow-y: hidden; /* 隐藏滚动条 */
    word-wrap: break-word; /* 防止单词过长造成横向滚动 */
    height: auto; /* 高度由内容自动控制 */
  }
  
  </style>
  