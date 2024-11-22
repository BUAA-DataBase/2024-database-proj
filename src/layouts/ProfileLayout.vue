<template>
    <t-layout style="background-color: white;">
        <Header/>
        <t-content class="ProfileContent">
            <ProfileContent/>
            <ProfileAside/>
        </t-content>
    </t-layout>
</template>

<script lang="ts" setup name="">
    import ProfileAside from '@/components/aside/ProfileAside.vue';
    import Header from '@/components/header/Header.vue';
    import ProfileContent from '@/pages/ProfileContent.vue';
    import {} from 'vue'
    
</script>

<style scoped lang="scss">
    .ProfileContent {
        background-color: white;
        width: 80%;
        margin: auto;
        display: flex;
        justify-content: center;
        padding: 20px;
    }
</style>