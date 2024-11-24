<template>
  <div class="typing">{{ displayedText }}</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, type PropType } from 'vue';

export default defineComponent({
  name: 'TypingEffect',
  props: {
    text: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const displayedText = ref('');
    const index = ref(0);

    const typeWriter = () => {
      if (index.value < props.text.length) {
        displayedText.value += props.text[index.value];
        index.value++;
        setTimeout(typeWriter, 100);
      }
    };

    onMounted(() => {
      typeWriter();
    });

    return { displayedText };
  }
});
</script>

<style scoped>
.typing {
  font-family: 'FangSong', '仿宋', serif;
  font-size: 26px;
  margin-bottom: 5px;
  /*font-weight: bold;*/
  white-space: pre;
  overflow: hidden;
  line-height: 30px;
  animation: caret 0.5s steps(1) infinite;
}

@keyframes caret {
  50% { border-color: transparent; }
}
</style>
