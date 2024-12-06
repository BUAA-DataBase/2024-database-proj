<template>
    <t-space>
        <t-space align="baseline">
            <span class="selector-title">排序</span>
            <t-select
                v-model="value1"
                :options="options1"
                @focus="onFocus"
                @blur="onBlur"
            ></t-select>
        </t-space>
        <t-space align="baseline">
            <span class="selector-title">学期</span>
            <t-select
                v-model="value2"
                :options="options2"
                @focus="onFocus"
                @blur="onBlur"
            ></t-select>
        </t-space>
        <t-space align="baseline">
            <span class="selector-title">评分</span>
            <t-select
                v-model="value3"
                :options="options3"
                @focus="onFocus"
                @blur="onBlur"
            ></t-select>
        </t-space>
    </t-space>
</template>

<script lang="ts" setup name="">
    import {ref, defineProps} from 'vue'
    import type { SelectProps } from 'tdesign-vue-next'

    const props = defineProps({
        courseYear: { type: Array, required: true }
    })

    const courseYearOptions = ref(
    props.courseYear.map(year => ({
        label: year,
        value: year
    })))

    const options1: SelectProps['options'] = [
        { label: '最新', value: 'new' },
        { label: '最热', value: 'hot' },
        { label: '评分：高-低', value: 'good' },
        { label: '评分：低-高', value: 'bad' }
    ]
    const options2: SelectProps['options'] = courseYearOptions.value
    const options3: SelectProps['options'] = [
        { label: '五星', value: '5' },
        { label: '四星', value: '4' },
        { label: '三星', value: '3' },
        { label: '二星', value: '2' },
        { label: '一星', value: '1'}
    ]
    const value1 = ref('')
    const value2 = ref('')
    const value3 = ref('')
    const onFocus: SelectProps['onFocus'] = (ctx) => {
        console.log('focus:', ctx);
    };
    const onBlur: SelectProps['onBlur'] = (ctx) => {
        console.log('blur:', ctx);
    };
</script>

<style scoped lang="scss">
    .selector-title {
        font-size: 16px;
        font-weight: bold;
        white-space: nowrap;
    }
</style>