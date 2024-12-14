<template>
    <t-layout>
      <div v-if="notLogin()">
        <Header @send-courses="setCourses"/>
      </div>
      <t-content style="background-color: white;" v-if="dataLoaded">
        <RouterView :courses="courses" :isSearch="isSearch"></RouterView>
      </t-content>
    </t-layout>
</template>

<script lang="ts" setup name="">
    import { onMounted, ref } from 'vue'
    import Header from '@/components/header/Header.vue';
    import { useRoute } from 'vue-router';
    import { useCourseStore } from '@/store/modules/courseStore';
    import { usePostStore } from '@/store/modules/postStore';

    const route = useRoute()
    const courseStore = useCourseStore()
    const postStore = usePostStore()

    const courses = ref<number[]>([])
    const isSearch = ref(false)

    function setCourses(data: { ids: number[]; isSearch: boolean }) {
      courses.value = data.ids;
      isSearch.value = data.isSearch;
      console.log(courses.value)
      console.log(isSearch.value)
    }

    const dataLoaded = ref(false);

    function notLogin() :boolean{
      return ((route.path != '/login') && (route.path != '/register'))
    }

    onMounted(async () => {
      await postStore.fetchData();
      await courseStore.fetchData();
      courseStore.initialParams();
      dataLoaded.value = true; // 数据加载完成后设置标志
    })
</script>

<style scoped lang="scss">

</style>
