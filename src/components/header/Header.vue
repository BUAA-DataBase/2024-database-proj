<template>
    <t-header >
      <t-head-menu theme="light" v-model="menuValue" height="120px" @change="changeHandler">
        <template #logo>
          <h1 class="title">BUAA评课社区</h1>
        </template>
        <t-menu-item value="item1" @click="toLatestComments">最新点评</t-menu-item>
        <t-divider layout="vertical" />
        <t-menu-item value="item2" @click="toCourses">课程</t-menu-item>
        <t-divider layout="vertical" />
        <template #operations>
          <t-auto-complete
          v-model="value2"
          :options="options"
          placeholder="搜索您感兴趣的课程"
          highlight-keyword
          filterable
          style="position: relative; width: 300px; padding-right: 0; margin-right: 40px;"
          class="header-oprations"
          >
              <template v-if="value2" #suffix>
                  <CloseCircleFilledIcon class="t-input__suffix-clear" @click="value2 = ''" />
              </template>
              <template #suffixIcon>
                  <t-button shape="square" style="position: absolute; right: 0; top: 50%; transform: translateY(-50%);"><SearchIcon /></t-button>
              </template>
          </t-auto-complete>
          <t-button theme="default" style="margin-right: 25px;" @click="goToEditor">
                <template #icon>
                    <t-icon name="pen-ball" size="20" />
                </template>
                创建
          </t-button>

          <t-dropdown :min-column-width="120" trigger="click">
              <template #dropdown>
                  <t-dropdown-menu>
                      <t-dropdown-item @click="toPerson">
                          <user-circle-icon size="20" style="margin-right: 10px;"/>个人中心
                      </t-dropdown-item>
                      <t-dropdown-item @click="toLogin">
                            <div v-if="useStore.getNowUser().userId == 0">
                                <poweroff-icon size="20" style="margin-right: 10px;"/>登录
                            </div>
                            <div v-if="useStore.getNowUser().userId != 0">
                                <poweroff-icon size="20" style="margin-right: 10px;"/>退出登录
                            </div>
                      </t-dropdown-item>
                  </t-dropdown-menu>
              </template>

              <t-button class="header-user-btn" theme="default" variant="text">
                  <template #icon>
                      <t-avatar size="50" :image="useStore.getNowUser().avatar" alt="用户头像" shape="circle"/>
                  </template>
                  <template #suffix><chevron-down-icon /></template>
              </t-button>

          </t-dropdown>
        </template>
      </t-head-menu>
    </t-header>
    <div class="custom-divider"></div>
</template>


<script lang="tsx" setup name="Header">
    import { ref } from 'vue';
    import { ChevronDownIcon, PoweroffIcon, SettingIcon, TranslateIcon, UserCircleIcon } from 'tdesign-icons-vue-next';
    import type { AutoCompleteProps } from 'tdesign-vue-next';
    import { SearchIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
    import avatarImage from '@/assets/img_avatar.jpg';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/store/modules/userStore';
    import type { HeadMenuProps } from 'tdesign-vue-next';
    import axios from 'axios';

    const value = ref('');
    const value2 = ref('');
    const options = ref<AutoCompleteProps<string>['options']>(['第一个默认联想词', '第二个默认联想词', '第三个默认联想词']);
    const timer = ref(0);
    const menuValue = ref('item1');
    const router = useRouter()
    const useStore = useUserStore() 

    // 输入框内容发生变化时进行搜索，200ms 搜索一次
    function onChange(value: string) {
        clearTimeout(timer.value);
        timer.value = setTimeout(() => {
            const text = '搜索联想词';
            const pureValue = value.replace(`第一个${text}`, '').replace(`第二个${text}`, '').replace(`第三个${text}`, '');
            options.value = [`${pureValue}第一个${text}`, `${pureValue}第二个${text}`, `${pureValue}第三个${text}`];
            clearTimeout(timer.value);
        }, 200);
    }

    function toLatestComments() {
        router.push({ path: `/latestComments/${1}`})
    }

    function toCourses() {
        router.push({ path: `/courses/${1}`})
    }

    function toPerson() {
        if (useStore.getNowUser().userId != 0) {
            router.push({path: `/user/${useStore.getNowUser().userId}`})
        }
        else {
            alert("请先登录！")
            router.push({path:"/login"})
        }
    }

    function goToEditor() {
        if (useStore.getNowUser().userId != 0) {
            router.push({ path:"/editor" })
        }
        else {
            alert("请先登录！")
            router.push({path:"/login"})
        }
    }

    async function toLogin() {
        if (useStore.getNowUser().userId != 0) {
            useStore.logout();
        }
        console.log(useStore.getNowUser());
        router.push({path: "/login"})
    }

    const changeHandler: HeadMenuProps['onChange'] = (active) => {
        console.log('change', active);
    };

</script>

<style scoped lang="scss">
    .HeaderContainer {
        width: 100vw;
        height: 120px;
        background-color: white;
    }
  .header-operations {
      margin-right: 40px;
  }
  .t-demo-auto-complete__base .t-button svg {
      font-size: 20px;
  }
  .title {
      color: #00509B
  }
  .custom-divider {
        width: 100%;
        height: 1px;
        background-color: #e0e0e0;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 0;
    }
</style>
