<template>
  <div class="flex login-container">
    <n-button class="top-left-button" strong secondary round type="info" @click="returnToLogin">
      返回登录页
    </n-button>
    <div class="right">
      <div class="form-wrapper">
        <Typewriter text="欢迎来到我们的网站
注册一个属于自己的账号并加入我们吧"/>
        <div class="item-wrapper">
          <n-input
            v-model:value="username"
            placeholder="请输入用户名(用户名仅可由至多12位英文字母数字以及下划线构成)"
            prefix-icon="el-icon-user"
            clearable
            @input="validateName"
          />
          <n-icon v-if="nameError" size="20" color="#ff0000">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96a48.01 48.01 0 0 1 0 96z" fill="currentColor">
              </path>
            </svg>
          </n-icon>
          <span v-if="nameError">请检查username格式</span>
        </div>
        <div v-if="nameCorrect" class="mt-4 item-wrapper">
          <n-input
            v-model:value="email"
            placeholder="请输入邮箱地址(用户名@主机名.域名)"
            prefix-icon="el-icon-user"
            clearable
            @input="validateEmail"
          />
          <n-icon v-if="emailError" size="20" color="#ff0000">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96a48.01 48.01 0 0 1 0 96z" fill="currentColor">
              </path>
            </svg>
          </n-icon>
        </div>
        <div v-if="emailCorrect" class="mt-4 item-wrapper">
          <n-input
            v-model:value="password"
            placeholder="请输入密码(密码可由6-20位字母及数字构成)"
            type="password"
            clearable
            prefix-icon="el-icon-lock"
            @input="validatePassword"
          />
          <n-icon v-if="passwordError" size="20" color="#ff0000">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96a48.01 48.01 0 0 1 0 96z" fill="currentColor">
              </path>
            </svg>
          </n-icon>
        </div>
        <div v-if="emailCorrect" class="mt-4 item-wrapper">
          <n-input
            v-model:value="contrayPassword"
            placeholder="请再次输入密码"
            type="password"
            clearable
            prefix-icon="el-icon-lock"
            @input="validatePassword"
          />
          <n-icon v-if="contrayPasswordError" size="20" color="#ff0000">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96a48.01 48.01 0 0 1 0 96z" fill="currentColor">
              </path>
            </svg>
          </n-icon>
        </div>
        <div class="mt-6">
          <n-popconfirm
            @positive-click="handlePositiveClick"
            @negative-click="handleNegativeClick"
            :positive-text="'确定'"
            :negative-text="'取消'"
          >
            <template #trigger>
              <div @click="onTrigger">
                <n-button type="primary" class="register" :registering="registering">
                  注册
                </n-button>
              </div>
            </template>
            是否确认信息？
          </n-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>

  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import Typewriter from '../typewriter/Typewriter.vue'
  import apiClient from '@/api';
  import { ErrorCode } from '@/constants/error-codes';
import axios from 'axios';

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
      //const userStore = useUserStore()
      const nameRegex = /^[a-zA-Z0-9_]{1,12}$/
      const nameError = ref(false)
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.((com)|(cn)|(org)|(net)|(email)|(us))$/
      const emailError = ref(false)
      const passwordRegex = /^[a-zA-Z0-9]{6,20}$/
      const passwordError = ref(false)
      const contrayPasswordError = ref(false)
      const errorMessage = ref('');
      //const appConfig = useAppConfigStore()
      /*const isMobileScreen = computed(() => {
        return appConfig.deviceType === DeviceType.MOBILE
      })*/
      const nameCorrect = ref(false)
      const emailCorrect = ref(false)
      const returnToLogin = () => {
        router.replace({path: '/login'})
      }
      const handlePositiveClick = async () => {
        if (username.value && email.value && password.value && contrayPassword.value &&
        !nameError.value && !emailError.value && !passwordError.value && !contrayPasswordError.value) {
          registering.value = true
          //message.success('恭喜您完成注册，现在您可以登陆网站了！')

          try {
            const response = await axios.post('/api/users/signup', {
              email: email.value,
              name: username.value,
              password: password.value,
            })

            if (response.data.result == 'ok') {
                  router
                .replace({
                  path: route.query.redirect ? (route.query.redirect as string) : '/login',
                })
                .then(() => {
                  registering.value = false
                })
              .catch((error) => {
                registering.value = false
                //message.error(error.message)
              })
            }
          } catch (error: any) {
            switch (error.response.data.error) {
                case ErrorCode.USER_EXIST_ERROR:
                  errorMessage.value = '用户已存在';
                  alert(errorMessage.value);
                  break;
                case ErrorCode.UNKNOWN_ERROR:
                  errorMessage.value = '未知错误';
                  alert(errorMessage.value);
                  break;
            }
          }
        }
        else if(username.value && email.value && password.value && contrayPassword.value &&
          (nameError.value || emailError.value || passwordError.value || contrayPasswordError.value)
        ) {
          //message.info('信息填写存在错误，请检查已填信息。')
        }
        else {
          //message.info('您未完成信息填写，请检查已填信息。')
        }
      }
      const handleNegativeClick = () => {
        //message.info('慎终如始，则无败事。')
      }
      const onTrigger = () => {
        if (!(username.value && email.value && password.value && contrayPassword.value)) {
          //message.error('请填写所有字段。')
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
  @keyframes left-to-right {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
  .login-container {
    position: relative;
    overflow: hidden;
    height: 100vh;
    width: 100%;
    @media screen and (max-width:960px) {
      .left {
        display: none !important;
      }
    }
    .top-left-button {
      position: absolute; /* 使用绝对定位 */
      top: 10px; /* 距离容器顶部0px */
      left: 10px; /* 距离容器左侧0px */
    }
    .left {
      display: block;
      position: relative;
      min-width: 450px;
      width: 450px;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 2;
      }
      .content-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .logo-wrapper {
          width: 80px;
          margin-top: 30%;
        }
        .title {
          margin-top: 10px;
          color: #ffffff;
          font-weight: bold;
          font-size: 24px;
        }
        .sub-title {
          margin-top: 10px;
          color: #f5f5f5;
          font-size: 16px;
        }
        .ttppii {
          color: #ffffff;
          font-weight: 500;
          font-size: 30px;
          // text-shadow: 1px 1px 2px #f5f5f5;
          animation: left-to-right 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-shadow: 0 0 5px var(--primary-color), 0 0 15px var(--primary-color),
            0 0 50px var(--primary-color), 0 0 150px var(--primary-color);
        }
        .bottom-wrapper {
          margin-bottom: 5%;
          color: #c0c0c0;
          font-size: 16px;
        }
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(to bottom, var(--primary-color));
      .form-wrapper {
        width: 50%;
        max-width: 500px;
        border-radius: 5px;
        border: 1px solid #f0f0f0;
        padding: 20px;
        box-shadow: 0px 0px 7px #dddddd;
        .form-title {
          font-size: 26px;
          margin-bottom: 20px;
          font-weight: bold;
        }
        .item-wrapper {
          width: 100%;
        }
        .login {
          width: 100%;
        }
        .register {
          width: 100%;
        }
        .returnToLogin {
          width: 30%;
        }
      }
      .third-login {
        width: 50%;
      }
    }
  }
  .m-login-container {
    position: relative;
    height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    background: linear-gradient(#7a9ad7, #3b5a94, #133064);
    // background-image: url(../../assets/img_login_mobile_bg_01.jpg);
    .header {
      height: 25vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .the-p {
        width: 100px;
        height: 100px;
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid #f5f5f5;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 56px;
        font-weight: bold;
      }
    }
    .top-line {
      background-image: linear-gradient(
        to right,
        rgba(117, 117, 117, 0.9) 25%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(117, 117, 117, 0.9) 75%
      );
      height: 1px;
      background-color: #ffffff;
    }
    .content {
      height: 40vh;
      margin: 5% 10%;
      border-radius: 10px;
      :deep(.n-input) {
        background-color: rgba(183, 183, 183, 0);
      }
      :deep(.n-input .n-input__input-el, .n-input .n-input__textarea-el) {
        color: #fff;
      }
      :deep(.n-checkbox .n-checkbox__label) {
        color: #fff;
      }
    }
    .footer {
      position: absolute;
      left: 10%;
      right: 10%;
      bottom: 10%;
      :deep(.n-divider .n-divider__title) {
        color: #c3c3c3;
        font-size: 14px;
      }
      :deep(.n-divider:not(.n-divider--dashed) .n-divider__line) {
        background-color: rgba(117, 117, 117);
      }
    }
  }
</style>
