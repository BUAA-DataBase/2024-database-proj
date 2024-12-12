import { defineStore } from 'pinia';
import { ref } from 'vue';

// 定义一个 Pinia store
export const dataLoadedStore = defineStore('dataLoadedStore', () => {
  // 定义响应式状态 dataLoaded
  const dataLoadedPost = ref<boolean>(false);
const dataLoadedCourse = ref<boolean>(false);

  // 更新 dataLoaded 状态的方法
  const setDataLoadedPost = (value: boolean) => {
    dataLoadedPost.value = value;
  };

  const setDataLoadedCourse = (value: boolean) => {
    dataLoadedCourse.value = value;
};

  return { dataLoadedPost, dataLoadedCourse, setDataLoadedPost, setDataLoadedCourse };
});
