<template>
  <div class="card">
    <div class="latest-reviews-container">
      <span class="latest-reviews-text">全站最新点评</span>
    </div>
    <br>
    <br>
    <PostPreViewList
      :showAuthor="true"
      :showAvatar="true"
      @update:array-size="handleArraySizeChange"
      :author-id="-1"
    />
    <Pagination :totalNum="childArraySize"/>
  </div>
</template>

<script setup lang="ts">
  import {ref, onMounted} from 'vue';
  import Pagination from '../utils/Pagination.vue';
  import PostPreViewList from '@/components/postPreView/PostPreViewList.vue';
  import { usePostStore } from '@/store/modules/postStore';
  import { dataLoadedStore } from '@/store/modules/dataLoadStore';

  const postStore = usePostStore();
  const dataLoadedstore = dataLoadedStore();

  const childArraySize = ref(1);

  function handleArraySizeChange(newSize: number) {
    childArraySize.value = newSize;
  }

  onMounted(async () => {
    await postStore.fetchData();
    console.log(postStore.getPostsSize());
    dataLoadedstore.setDataLoadedPost(true);
  })
</script>

<style lang="css" scoped>
.card {
  width: 80%;
  margin: 0 auto;
  background-color: var(--background-color);
  padding: 16px;
  box-shadow: 0 2px 4px var(--border-color);
  border-radius: 8px;
}
.latest-reviews-text {
  text-align: center;
  font-weight: bold;
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: x-large;
}
.latest-reviews-container {
  text-align: center;
  margin-top: 10px;
  width: 100%;
}
</style>
