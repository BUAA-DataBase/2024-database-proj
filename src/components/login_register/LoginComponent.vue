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
  import { ErrorCode } from '@/constants/error-codes'
  import axios from 'axios'
import useDestroyOnClose from 'tdesign-vue-next/es/hooks/useDestroyOnClose';

  export default defineComponent({
    name: 'Login',
    components: { Typewriter },
    setup() {
      //const { version } = useAppInfo()
      const username = ref('')
      const password = ref('')
      const loading = ref(false)
      const router = useRouter()
      const errorMessage = ref('')
      //const message = useMessage()
      const goToRegister = () => {
        router.push({ path: '/register' });
      };
      const url = () => {
        return '/api/users/login?token&email=' + username.value + '&password=' + password.value
      }
      const onLogin = async () => {
        console.log(url())
        loading.value = true;
        try {
        // 在本地对密码进行哈希处理
        const hashedPassword = CryptoJS.SHA256(password.value).toString(CryptoJS.enc.Hex);

        // 发送POST请求到后端
        const response = await axios.post(
          "/api/users/login?token&email=Kaleid&password=123456", {
          email: username.value,
          password: hashedPassword,
        });
        // 处理响应
        if (response.data.result == 'ok') {
          router
              .push({
                path: '/latestComments',
              })
              .then(() => {
                loading.value = false
              })
              .catch((error) => {
                loading.value = false
                //message.error(error.message)
              })
          // 登录成功，保存token和用户id到本地存储或Vuex
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId);
          // 跳转到其他页面或显示成功消息
          alert('Login successful!');
          // 例如，使用router跳转到首页
          // this.$router.push('/');
        }
      } catch (error: any) {
          switch (error.response.data.error) {
            case ErrorCode.USER_EXIST_ERROR:
              errorMessage.value = '用户已存在'
              alert(errorMessage.value)
              break
            case ErrorCode.UNKNOWN_ERROR:
              errorMessage.value = '未知错误'
              alert(errorMessage.value)
              break
          }
        }
    }
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
