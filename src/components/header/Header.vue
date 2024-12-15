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
                  <t-button shape="square" style="position: absolute; right: 0; top: 50%; transform: translateY(-50%);" @click="searchKeyWord"><SearchIcon /></t-button>
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
    import { useRoute, useRouter } from 'vue-router';
    import { useUserStore } from '@/store/modules/userStore';
    import type { HeadMenuProps } from 'tdesign-vue-next';
    import axios from 'axios';
    import { useCourseStore } from '@/store/modules/courseStore';
    import { usePostStore } from '@/store/modules/postStore';

    const value = ref('');
    const value2 = ref('');
    const options = ref<AutoCompleteProps<string>['options']>();
    const menuValue = ref('item1');
    const router = useRouter()
    const route = useRoute()
    const useStore = useUserStore() 
    const courseStore = useCourseStore()
    const postStore = usePostStore()

    const emit = defineEmits(['send-courses']);

    async function searchKeyWord() {
        if (value2.value) {
            const name = route.name;
            if (name === "courses") {
                const courses = await courseStore.search(value2.value);
                const select = true;
                if (courses) {}
                else {
                    alert("搜索失败")
                }
                emit('send-courses', {ids : courses, isSearch : select})
            }
            else {
                router.push({ path : "/courses/1"});
                const courses = await courseStore.search(value2.value);
                const select = true;
                if (courses) {}
                else {
                    alert("搜索失败")
                }
                emit('send-courses', {ids : courses, isSearch : select})
            }
        }
        else {
            alert("已显示全部课程")
            const courses: never[] = [];
            const select = false
            emit('send-courses', {ids : courses, isSearch : select})
        }
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
