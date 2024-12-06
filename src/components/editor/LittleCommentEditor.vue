<template>
    <div class="comment-editor">
      <!-- 这里的值会动态加上 "回复@{{ name }}" -->
      <textarea
        v-model="comment"
        :placeholder="'回复 @' + name"
        class="comment-input"
        @input="onInput"
        rows="4" 
      ></textarea>
      <t-button @click="submitComment">发送</t-button>
    </div>
  </template>
  
  <script setup name="LittleCommentEditor">
  import { ref } from 'vue';
  
  // 接收传入的 name 参数
  const props = defineProps({
    name: {
      type: String,
      required: true,
    }
  });
  
  // 用来存储评论的文本
  const comment = ref("");
  
  // 输入框内容发生变化时的回调
  const onInput = () => {
    // 这里可以加入一些额外的处理逻辑，比如字符限制等
    console.log(comment.value);
  };
  
  // 提交评论
  const submitComment = () => {
    if (comment.value.trim() === "") {
      alert("评论内容不能为空");
      return;
    }
    // 提交评论的逻辑
    console.log("评论已提交:", comment.value);
  };
  </script>
  
  <style scoped>
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
  