<template>
  <div class="card">
    <div class="latest-reviews-container">
      <span class="latest-reviews-text">全站最新点评</span>
    </div>
    <br>
    <br>
    <div v-for="(commentData, index) in comments" :key="index" class="comment-container">
      <Comment :author="commentData.author" :content="commentData.content" />
      <t-divider />
    </div>
    <Pagination/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Comment from '../components/comments/Comment.vue'
import Pagination from '../utils/Pagination.vue';

const comments = ref([
  { author: 'Alice', content: 'This is a great comment!' },
  { author: 'Bob', content: 'I agree with Alice.' },
  { author: 'AI', content: "I don't know." },
  { author: 'AI', content: "I don't know." },
  { author: 'AI', content: "I don't know." },
  { author: 'AI', content: "I don't know." },
  { author: 'AI', content: "I don't know." },
  { author: 'AI', content: "I don't know." },
  { author: 'AI', content: "I don't know." },
  { author: 'AI', content: "I don't know." },
  { author: 'AI', content: "I don't know." },
  { author: 'AI', content: "I don't know." },
])
</script>

<style lang="css" scoped>
.card {
  width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.comment-container {
  text-align: left;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.latest-reviews-text {
  text-align: center;
  font-weight: bold;
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: x-large;
}
.latest-reviews-container {
  text-align: center;
}
</style>
