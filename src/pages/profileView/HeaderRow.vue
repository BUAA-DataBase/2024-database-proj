<template>
    <div class="content-container-header">
        <span class="header-style">共{{ num }}{{ word }}</span>
        <router-link v-if="num > 6" to="/latestComments/1"><span class="read-more">查看全部>></span></router-link>
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
        color: var(--read-more-color);
        font-weight: bold;
    }
    .read-more {
        font-size: 14px;
        color: var(--read-more-color);
    }
</style>