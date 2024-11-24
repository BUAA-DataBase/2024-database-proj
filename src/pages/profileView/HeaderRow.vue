<template>
    <div class="content-container-header">
        <span class="header-style">共{{ num }}{{ word }}</span>
        <router-link to="/"><span class="header-style1">查看全部>></span></router-link>
    </div>
</template>

<script lang="ts" setup name="">
    import {defineProps} from 'vue'
    
    defineProps({
        num: {type: Number, required: true},
        word: {type: String, required: true}
    })
</script>

<style scoped lang="scss">
    a {
        text-decoration: none;
    }
    .content-container-header {
        display: flex;
        align-items: flex-end; /* 垂直居中 */
        justify-content: space-between; /* 左右分布 */
        margin-bottom: 15px;
        width: 100%;
    }
    .header-style {
        font-size: 18px;
        color: rgb(74, 129, 222);
        font-weight: bold;
    }
    .header-style1 {
        font-size: 14px;
        color: rgb(74, 129, 222);
    }
</style>