<template>
  <div class="card">
  <t-card :style="{ width: '450px' }">
    <div class="container">
      <div class="title_center">账号登录</div>
      <t-input v-model="username" placeholder="请输入您的账号" autofocus showClearIconOnEmpty/>
      <t-input type="password" v-model="password" placeholder="请输入您的密码" autofocus showClearIconOnEmpty />
      <t-button type="primary" @click="onLogin">
        登录
      </t-button>
      <div class="button-container">
        <t-button type="primary" shape="round" theme="success" class="right-button" @click="goToRegister">注册账号</t-button>
      </div>
    </div>
  </t-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'
  //import ImageBg1 from '@/assets/img_login_bg.png'
  import Typewriter from '@/components/typewriter/Typewriter.vue'
  export default defineComponent({
    name: 'Login',
    components: { Typewriter },
    setup() {
      //const { version } = useAppInfo()
      const username = ref('')
      const password = ref('')
      const loading = ref(false)
      const router = useRouter()
      //const message = useMessage()
      const goToRegister = () => {
        router.push({ path: '/register' });
      };
      const onLogin = async () => {
        loading.value = true;
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              if (username.value && password.value) {
                resolve("登录成功!");
              } else {
                reject(new Error('登录失败：用户名或密码错误'));
              }
            });
          })
          .then(() => {
            // 登录成功后跳转
            router.push({ path: '/latestComments' });
          })
          .catch(error => {
            // 处理登录失败
            console.error(error.message);
            alert(error.message);
          })
          .finally(() => {
            loading.value = false;
          });
      };
      return {
        username,
        password,
        loading,
        goToRegister,
        onLogin,
      }
    },
  })
</script>

<style lang="scss" scoped>
.card{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
.title_center {
  text-align: center;
  font-family: 'Heiti SC', 'STHeiti', sans-serif;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}
.container {
  display: grid;
  gap: 12px;
}
.button-container {
  margin-top: 4px;
  display: flex;
  align-items: center;
}
.right-button {
  margin-left: auto;
}
</style>
