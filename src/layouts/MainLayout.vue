<template>
    <t-layout>
      <div v-if="notLogin()">
        <Header/>
      </div>
      <t-content style="background-color: white;">
        <RouterView></RouterView>
      </t-content>
    </t-layout>
</template>

<script lang="ts" setup name="">
    import { onMounted } from 'vue'
    import Header from '@/components/header/Header.vue';
    import { useRoute } from 'vue-router';
    import { useCourseStore } from '@/store/modules/courseStore';
    import { usePostStore } from '@/store/modules/postStore';

    const route = useRoute()
    const courseStore = useCourseStore()
    const postStore = usePostStore()

    function notLogin() :boolean{
      return ((route.path != '/login') && (route.path != '/register'))
    }

    onMounted(() => {
      courseStore.fetchData();
      postStore.fetchData();
    })
</script>

<style scoped lang="scss">

</style>
