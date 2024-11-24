<template>
  <t-comment
    :avatar="avatarUrl"
    :author="author"
    :datetime="formattedDatetime"
    :content="content"
    class="comment-reply"
  >

    <template #actions>
      <t-space>
        <span @click="toReadMore" class="read_more">{{ ">>更多" }}</span>
      </t-space>
    </template>

    <template>
      <t-comment avatar="https://tdesign.gtimg.com/site/avatar.jpg">
        <template #content>
          <div class="form-container" v-if="isReply">
            <t-textarea v-model="replyData" placeholder="请输入内容" />
            <t-button class="form-submit" @click="submitReply">回复</t-button>
          </div>
        </template>
      </t-comment>
    </template>

    <template #reply v-if="hasReply" >
      <t-comment
        avatar="https://tdesign.gtimg.com/site/avatar.jpg"
        :datetime="replyTime"
        :content="replyData"
      >
        <template #author>
          <span>评论作者名B</span>
          <t-icon name="caret-right-small" size="medium" style="margin: 0 4px" />
          <span>评论作者名A</span>
        </template>

        <template #actions>
          <t-space key="thumbUp" :size="6">
            <t-icon name="thumb-up" />
            <span>6</span>
          </t-space>
          <t-space key="chat" :size="6">
            <t-icon name="chat" />
            <span>回复</span>
          </t-space>
        </template>
      </t-comment>
    </template>

  </t-comment>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router'
import { NotifyPlugin, type ButtonProps } from 'tdesign-vue-next';

export default {
  name: 'CommentComponent',
  props: {
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: 'https://tdesign.gtimg.com/site/avatar.jpg',
    },
  },
  setup(props) {
    const currentDatetime = ref(new Date().toLocaleString());

    const thumbs_up_num = ref(0)
    const isReply = ref(false)
    const hasReply = ref(false)
    const replyData = ref('');
    const replyTime = ref('')
    const router = useRouter()
    const route = useRoute()

    const toReadMore = () => {
      router.replace({path:  '/more',})
    }

    const submitReply: ButtonProps['onClick'] = () => {
      NotifyPlugin.info({
        title: '回复内容',
        content: replyData.value,
        duration: 3000,
      });
    };

    const handleReplyBoxClosed = () => {
        replyTime.value = new Date().toLocaleString();
        isReply.value = false;
        hasReply.value = true;
    };

    const thumbs_up = () => {
      thumbs_up_num.value ++;
    }

    const setIsReply = () => {
      isReply.value = true;
      console.log(isReply.value)
    }
    // 由于 datetime 应该在评论创建时设置，这里我们模拟一个 formattedDatetime，
    // 但在实际应用中应该在父组件创建评论对象时设置它。
    const formattedDatetime = computed(() => {
      // 这里仅作为示例，实际上应该使用父组件传递或在创建时固定的 datetime
      return currentDatetime.value;
    });

    // 注意：datetime 应该在父组件中设置。
    onMounted(() => {
      //  datetime 应该在评论创建时设置。
      currentDatetime.value = new Date().toLocaleString(); // 不建议这样做
    });

    return {
      route,
      thumbs_up_num,
      isReply,
      hasReply,
      thumbs_up,
      replyData,
      replyTime,
      setIsReply,
      submitReply,
      toReadMore,
      handleReplyBoxClosed,
      formattedDatetime,
    };
  },
};
</script>


<style lang="less" scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .form-submit {
    margin-top: 8px;
  }
}
.read_more {
  color: cornflowerblue;
}
</style>
