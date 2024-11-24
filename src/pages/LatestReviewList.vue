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
    />
    <Pagination/>
  </div>
</template>

<script setup lang="ts">
  import Pagination from '../utils/Pagination.vue';
  import ReviewList from '@/components/reviews/ReviewList.vue';
  import Header from '@/components/header/Header.vue';

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
