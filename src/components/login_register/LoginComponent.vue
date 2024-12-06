<template>
  <div class="card">
  <t-card :style="{ width: '450px' }">
    <div class="container">
      <div class="title_center">账号登录</div>
      <t-input v-model="username" placeholder="请输入您的邮箱" autofocus showClearIconOnEmpty/>
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
  import { useUserStore } from '@/store/modules/userStore'
  import type { UserState } from '@/store/types'
  import { Role } from '@/store/types'
  import CryptoJS from 'crypto-js';
  import axios from 'axios'

  export default defineComponent({
    name: 'Login',
    components: { Typewriter },
    setup() {
      const userStore = useUserStore()
      const username = ref('')
      const password = ref('')
      const userId = ref('')
      const token = ref('')
      const loading = ref(false)
      const router = useRouter()
      const errorMessage = ref('')
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
          // 发送POST请求到后端（注意：移除了URL中的查询参数）
          const response = await axios.post(url(), {
              email: username.value,
              password: hashedPassword,
          });
          // 检查response.data是否存在
          if (response.data && response.data.result == 'ok') {
            router.push({
                path: '/latestComments/1',
            }).then(() => {
                loading.value = false;
            }).catch((error) => {
                loading.value = false;
                // 处理路由错误（可选）
            });
            // 登录成功，保存token和用户id到本地存储
            if (response.data.token && response.data.id) {
                token.value = response.data.token;
                userId.value = response.data.id;
            }
            alert('Login successful!');
          }
        } catch (error:any) {
          // 检查error.response是否存在
          if (error.response && error.response.data && error.response.data.error) {
            switch (error.response.data.error) {
              case ErrorCode.USER_NOT_EXIST_ERROR:
                errorMessage.value = '用户不存在';
                break;
              case ErrorCode.WRONG_PASSWORD_ERROR:
                errorMessage.value = '密码错误';
                break;
              case ErrorCode.UNKNOWN_ERROR:
              default:
                errorMessage.value = '未知错误';
                break;
            }
            alert(errorMessage.value);
          } else {
            // 处理非服务器响应错误（如网络错误）
            errorMessage.value = '请求失败，请检查您的网络连接';
            alert(errorMessage.value);
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
