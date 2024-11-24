<template>
  <t-button class="top-left-button" shape="round" @click="returnToLogin">
      返回登录页
  </t-button>
  <div class="card">
  <t-card :style="{ width: '500px' }">
    <div class="container">
      <Typewriter text="欢迎来到我们的网站
注册一个属于自己的账号并加入我们吧"/>
      <t-input v-model="username" placeholder="请输入您的账号" autofocus showClearIconOnEmpty/>
      <t-input v-model="email" placeholder="请输入您的邮箱" autofocus showClearIconOnEmpty/>
      <t-input type="password" v-model="password" placeholder="请输入您的密码" autofocus showClearIconOnEmpty />
      <t-input type="password" v-model="contrayPassword" placeholder="请再次输入您的密码" autofocus showClearIconOnEmpty />
      <t-button type="primary" @click="handlePositiveClick">
        注册账号
      </t-button>
    </div>
  </t-card>
  </div>
</template>

  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import Typewriter from '@/components/typewriter/Typewriter.vue'

  export default defineComponent({
    name: 'Register',
    components: { Typewriter },

    setup() {
      const username = ref('');
      const email = ref('');
      const password = ref('');
      const contrayPassword = ref('')
      const returnMessage = ref('')
      const autoLogin = ref(true)
      const registering = ref(false)
      const router = useRouter()
      const route = useRoute()
      const nameRegex = /^[a-zA-Z0-9_]{1,12}$/
      const nameError = ref(false)
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.((com)|(cn)|(org)|(net)|(email)|(us))$/
      const emailError = ref(false)
      const passwordRegex = /^[a-zA-Z0-9]{6,20}$/
      const passwordError = ref(false)
      const contrayPasswordError = ref(false)
      const nameCorrect = ref(false)
      const emailCorrect = ref(false)
      const returnToLogin = () => {
        router.replace({path: '/login'})
      }
      const handlePositiveClick = () => {
        if (username.value && email.value && password.value && contrayPassword.value &&
        !nameError.value && !emailError.value && !passwordError.value && !contrayPasswordError.value) {
          registering.value = true
          alert('恭喜您完成注册，现在您可以登陆网站了！')
          router
            .replace({
              path: route.query.redirect ? (route.query.redirect as string) : '/login',
            })
            .then(() => {
              registering.value = false
            })
        }
        else if(username.value && email.value && password.value && contrayPassword.value &&
          (nameError.value || emailError.value || passwordError.value || contrayPasswordError.value)
        ) {
          alert('信息填写存在错误，请检查已填信息。')
        }
        else {
          alert('您未完成信息填写，请检查已填信息。')
        }
      }
      const handleNegativeClick = () => {
        alert('慎终如始，则无败事。')
      }
      const onTrigger = () => {
        if (!(username.value && email.value && password.value && contrayPassword.value)) {
          alert('请填写所有字段。')
        }
      };
      const validateName = () => {
        nameError.value = !nameRegex.test(username.value)
        nameCorrect.value = !nameError.value
      }
      const validateEmail = () => {
        emailError.value = !emailRegex.test(email.value)
        emailCorrect.value = !emailError.value
      }
      const validatePassword = () => {
        passwordError.value = !passwordRegex.test(password.value)
        contrayPasswordError.value = (!(password.value === contrayPassword.value)) || (!passwordRegex.test(password.value))
      }
      return {
        username,
        nameError,
        email,
        emailError,
        password,
        passwordError,
        contrayPassword,
        contrayPasswordError,
        nameCorrect,
        emailCorrect,
        returnMessage,
        autoLogin,
        registering,
        returnToLogin,
        onTrigger,
        handlePositiveClick,
        handleNegativeClick,
        validateName,
        validateEmail,
        validatePassword,
      }
    },
  });
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
