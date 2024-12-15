<template>
  <t-pagination
    class="pagination"
    v-model="current"
    v-model:pageSize="pageSize"
    :total="totalNum"
    show-jumper
    @change="onChange"
    @page-size-change="onPageSizeChange"
    @current-change="onCurrentChange"
    :showPageSize="false"
    :totalContent="false"
  />
</template>

<script lang="ts" setup>
  import { ref, defineProps } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { MessagePlugin, type PaginationProps } from 'tdesign-vue-next';
  const props = defineProps({
    totalNum: {
      type: Number,
      required: true
    }
  });

  const route = useRoute();
  const router = useRouter();
  const current = ref(1);
  const pageSize = ref(10);
  const onPageSizeChange: PaginationProps['onPageSizeChange'] = (size) => {
    console.log('page-size:', size);
    MessagePlugin.success(`pageSize变化为${size}`);
  };
  const onCurrentChange: PaginationProps['onCurrentChange'] = (index, pageInfo) => {
    MessagePlugin.success(`转到第${index}页`);
    const name = route.name;
    router.push({ name: name, params: { page: index }})
  };
  const onChange: PaginationProps['onChange'] = (pageInfo) => {
  };
</script>

<style lang="scss" scoped>

</style>
