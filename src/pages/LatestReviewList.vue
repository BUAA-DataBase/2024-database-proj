<template>
  <div class="card">
    <div class="latest-reviews-container">
      <span class="latest-reviews-text">全站最新点评</span>
    </div>
    <br>
    <br>
    <ReviewList
      :showAuthor="true"
      :showAvatar="true"
      @update:array-size="handleArraySizeChange"
    />
    <Pagination :totalNum="childArraySize"/>
  </div>
</template>

<script setup lang="ts">
  import {ref, onMounted} from 'vue';
  import Pagination from '../utils/Pagination.vue';
  import ReviewList from '@/components/reviews/ReviewList.vue';

  const childArraySize = ref(1);

  function handleArraySizeChange(newSize) {
    childArraySize.value = newSize;
  }
</script>

<style lang="css" scoped>
.card {
  width: 1000px;
  margin: 0 auto;
  background-color: var(--background-color);
  padding: 16px;
  box-shadow: 0 2px 4px var(--border-color);
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
