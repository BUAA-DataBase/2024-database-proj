<template>
  <t-comment avatar="https://tdesign.gtimg.com/site/avatar.jpg">
    <template #content>
      <div class="form-container" v-if="visible">
        <t-textarea v-model="replyData" placeholder="请输入内容" />
        <t-button class="form-submit" @click="submitReply">回复</t-button>
        <t-button class="form-close" @click="closeReplyBox">取消</t-button>
      </div>
    </template>
  </t-comment>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { NotifyPlugin } from 'tdesign-vue-next';

const replyData = ref('');
const visible = ref(true); // 初始状态由父组件控制

const emit = defineEmits(['reply-closed']);

const submitReply = () => {
  NotifyPlugin.info({
    title: '回复内容',
    content: replyData.value,
    duration: 3000,
  });
  closeReplyBox(); // 提交后关闭回复框
};

const closeReplyBox = () => {
  visible.value = false;
  emit('reply-closed');
};
</script>

<style lang="less" scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .form-submit, .form-close {
    margin-top: 8px;
  }
}
</style>
