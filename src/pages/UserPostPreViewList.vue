<template>
    <div class="card">
      <div class="title-container">
        <span class="author-name">{{authorName}}的点评</span>
        <span clsaa="num">(共{{childArraySize}}条)</span>
      </div>
      <br>
      <br>
      <PostPreViewList
        :showAuthor="false"
        :showAvatar="false"
        @update:array-size="handleArraySizeChange"
        :author-id="props.authorId"
      />
      <Pagination :totalNum="childArraySize"/>
    </div>
  </template>
  
  <script setup lang="ts">
    import {ref, onMounted, computed, defineProps} from 'vue';
    import Pagination from '../utils/Pagination.vue';
    import PostPreViewList from '@/components/postPreView/PostPreViewList.vue';

    const props = defineProps({
      authorId: { type: Number, required: true },
      authorName: { type: String, required: true },
    });
  
    const childArraySize = ref(1);
    
    function handleArraySizeChange(newSize: number) {
      childArraySize.value = newSize;
    }
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
    .title-container {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        gap: 10px;
        margin-top: 20px;
        margin-bottom: 0px;
    }
    .author-name {
        font-size: 24px;
        font-weight: bold;
        align-items: center;
        color: var(--author-name);
    }
    .num {
        margin-left: 20px;
        font-size: 16px;
        color: var(--date-color);
    }
  </style>
  