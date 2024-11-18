<template>
    <t-layout>
        <Header/>
        <t-content style="background-color: white;">
            <RouterView></RouterView>
        </t-content>
    </t-layout>
</template>

<script lang="ts" setup name="">
    import {} from 'vue'
    import Header from '@/components/header/Header.vue';
</script>

<style scoped lang="scss">
    
</style>