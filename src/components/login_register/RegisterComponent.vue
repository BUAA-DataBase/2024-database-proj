<template>
  <t-button class="top-left-button" shape="round" @click="returnToLogin"> 返回登录页 </t-button>
  <div class="card">
    <t-card :style="{ width: '500px' }">
      <div class="container">
        <Typewriter
          text="欢迎来到我们的网站
注册一个属于自己的账号并加入我们吧"
        />
        <t-input v-model="username" placeholder="请输入您的用户名" autofocus showClearIconOnEmpty />
        <t-input v-model="email" placeholder="请输入您的北航邮箱" autofocus showClearIconOnEmpty />
        <t-input
          type="password"
          v-model="password"
          placeholder="请输入您的密码(6-20字母和数字)"
          autofocus
          showClearIconOnEmpty
        />
        <t-input
          type="password"
          v-model="contrayPassword"
          placeholder="请再次输入您的密码"
          autofocus
          showClearIconOnEmpty
        />
        <t-button type="primary" @click="handlePositiveClick"> 注册账号 </t-button>
      </div>
    </t-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Typewriter from '@/components/typewriter/Typewriter.vue'
import { ErrorCode } from '@/constants/error-codes'
import axios from 'axios'

export default defineComponent({
  name: 'Register',
  components: { Typewriter },

  setup() {
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const contrayPassword = ref('')
    const returnMessage = ref('')
    const autoLogin = ref(true)
    const registering = ref(false)
    const router = useRouter()
    const route = useRoute()
    const emailRegex = /^[a-zA-Z0-9]+@buaa\.edu\.cn$/;
    const emailError = computed(() => {
      return emailRegex.test(email.value)
    })
    const passwordRegex = /^[a-zA-Z0-9]{6,20}$/
    const passwordError = computed(() => {
      return passwordRegex.test(password.value)
    })
    const contrayPasswordError = computed(() => {
      return contrayPassword.value === password.value
    })
    const errorMessage = ref('')
    const returnToLogin = () => {
      router.push({ path: '/login' })
    }
    const handlePositiveClick = async () => {
      if (
        username.value &&
        email.value &&
        password.value &&
        contrayPassword.value &&
        emailError.value &&
        passwordError.value &&
        contrayPasswordError.value
      ) {
        registering.value = true
        try {
          const response = await axios.post('/api/users/signup', {
            email: email.value,
            name: username.value,
            password: password.value,
          })
          if (response.data.result == 'ok') {
            router
              .push({
                path: route.query.redirect ? (route.query.redirect as string) : '/login',
              })
              .then(() => {
                registering.value = false
              })
              .catch((error) => {
                registering.value = false
                //message.error(error.message)
              })
              alert('恭喜您完成注册，现在您可以登陆网站了！')
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
      } else if (
        username.value &&
        email.value &&
        password.value &&
        contrayPassword.value)  {
          if (!emailError.value) {
            alert('邮箱填写不符合北航邮箱格式规范，请检查已填信息。') 
          }
          else if (!passwordError.value) {
            alert('密码不符合格式规范，请检查已填信息。') 
          }
          else if (!contrayPasswordError.value) {
            alert('两次密码填写不一致，请检查已填信息。') 
          }
      } else {
        alert('您未完成信息填写，请检查已填信息。')
      }
    }
    return {
      username,
      email,
      emailError,
      password,
      passwordError,
      contrayPassword,
      contrayPasswordError,
      returnMessage,
      autoLogin,
      registering,
      returnToLogin,
      handlePositiveClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.card {
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
