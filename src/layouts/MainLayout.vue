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
    import {} from 'vue'
    import Header from '@/components/header/Header.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute()

    function notLogin() :boolean{
      return ((route.path != '/login') && (route.path != '/register'))
    }
</script>

<style scoped lang="scss">

</style>
