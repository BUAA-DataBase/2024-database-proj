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
    import {ref, defineProps, defineEmits, watch} from 'vue'
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
 
    // 在 <script setup> 中，emit 函数是自动可用的，无需从 setup 函数参数中解构
    // 声明组件发出的事件类型（可选，但有助于类型检查和 IDE 提示）
    const emit = defineEmits(['updateValues']);

    const emitUpdate = () => {
        // 使用 emit 函数发送自定义事件，并传递当前的值作为参数
        emit('updateValues', { value1: value1.value, value2: value2.value, value3: value3.value });
    };

    watch([value1, value2, value3], (newValues, oldValues) => {
        // 注意：newValues 和 oldValues 都是数组，与 watch 的源数组对应
        // 但在这个场景下，我们可能不需要 oldValues
        emitUpdate();
    }, { immediate: true });
</script>

<style scoped lang="scss">
    .selector-title {
        font-size: 16px;
        font-weight: bold;
        white-space: nowrap;
    }
</style>