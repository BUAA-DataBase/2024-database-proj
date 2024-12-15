<template>
    <div class="content-container">
        <div class="user-container">
            <div class="avatar-wrapper" @click="triggerFileInput">
                <!-- 头像展示 -->
                <t-avatar 
                    v-if="props.user.avatar"
                    size="100px" 
                    :image="props.user.avatar" 
                    alt="用户头像" 
                    shape="circle"
                />
                <t-avatar 
                    v-if="!props.user.avatar" 
                    size="100px" 
                    shape="circle" 
                    style="background-color: #f0f0f0; color: #4983c9; display: flex; justify-content: center; align-items: center; font-size: 24px; cursor: pointer;">
                </t-avatar>
                <!-- 隐藏的文件选择框 -->
                <input v-if="isMyProfile"
                    ref="fileInput" 
                    type="file" 
                    accept="image/*" 
                    style="display: none;" 
                    @change="handleFileChange"
                />
            </div>
            <div v-if="isMyProfile">
                <!-- 显示用户名，点击时变为输入框 -->
                <span v-if="!isEditing" class="UserName" @click="editUsername">{{ props.user.userName }}</span>
                
                <!-- 编辑状态下显示输入框 -->
                <input v-if="isEditing" v-model="editedUsername" @blur="saveUsername" @keyup.enter="saveUsername" />

            </div>
            <span v-if="!isMyProfile" class="UserName" @click="editUsername">{{ props.user.userName }}</span>
        </div>
        <div style="margin-bottom: -10px;">
            <t-head-menu v-model="menuValue">
                <t-menu-item value="item1">我的点评</t-menu-item>
                <t-divider layout="vertical"/>
                <t-menu-item value="item2">关注用户</t-menu-item>
                <t-divider layout="vertical"/>
                <t-menu-item value="item3"> 关注课程 </t-menu-item>
            </t-head-menu>
        </div>
        <t-divider style="margin-top: 0; margin-bottom: 0"/>
        <div style="width:100%">
            <ProfileReviewList v-if="menuValue === 'item1'"
                :user="props.user"
                :isMyProfile="isMyProfile"
            />
            <ProfileCourseList v-if="menuValue === 'item3'" 
                :user="props.user"
                :isMyProfile="isMyProfile"
            />
            <ProfileFollowUserList v-if="menuValue === 'item2'" 
                :user="props.user"
                :isMyProfile="isMyProfile"
                @custom-event-forwarded-again="handleCustomEvent"
            />
        </div>
    </div>
</template>

<script lang="ts" setup name="">
    import {ref,computed,watch,onMounted, type PropType} from 'vue';
    import ProfileReviewList from '@/pages/profileView/ProfileReviewList.vue';
    import ProfileFollowUserList from '@/pages/profileView/ProfileFollowUserList.vue';
    import ProfileCourseList from '@/pages/profileView/ProfileCourseList.vue';
    import { UploadIcon, PlusIcon } from 'tdesign-icons-vue-next';
    import { useUserStore } from '@/store/modules/userStore';
    import { useRoute,useRouter } from 'vue-router';
    import axios from 'axios';
    import { ErrorCode } from '@/constants/error-codes'
    import type { UserState } from '@/store/types';
    import { Role } from '@/store/types';


    const props = defineProps({
        user: {
            type: Object as PropType<UserState>,
            required: true
        },
        isMyProfile: {
            type: Boolean,
            required: true
        }
    });

    const menuValue = ref('item1');
    const changeUser = ref<UserState>()
    const fileInput = ref<HTMLInputElement | null>(null);
    const editedUsername = ref(props.user.userName);  // 存储正在编辑的用户名
    const isEditing = ref(false);  // 是否正在编辑
    const useStore = useUserStore()

    // 触发文件选择框
    function triggerFileInput() {
        if (fileInput.value) {
            fileInput.value.click();  // 手动点击隐藏的 input
        }
    }

    const errorMessage = ref<string | null>("")
    const emit = defineEmits(['refetch', 'custom-event-forwarded-triple']);

    const handleFileChange = async (event: Event) => {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
 
      if (!file) {
        return;
      }
 
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        errorMessage.value = 'Please upload a valid image file.';
        return;
      }
 
      // 清除之前的错误信息
      errorMessage.value = null;
 
      // 准备上传
      const formData = new FormData();
      formData.append('file', file);
 
      try {
        const response = await axios.post("/api/resources/upload", formData, {
          headers: {
          }
        });

        if (response.data.result === 'ok') {
          console.log("Successfully uploaded!");
          useStore.updateAvatar(response.data.file_info.url);
          emit('refetch');
        }
      } catch (error:any) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else if (error.response) {
          // 服务器响应了一个状态码，并且状态码在2xx之外
          errorMessage.value = 'Failed to upload image.'; // 或者使用error.response.data中的具体错误信息
        } else if (error.request) {
          // 请求已经发出，但没有收到响应
          errorMessage.value = 'No response from server.';
        } else {
          // 在设置请求时发生了错误
          console.error('Error occurred during the request:', error.message);
          errorMessage.value = 'An error occurred during the request.';
        }
      }
    };

    // 点击用户名时进入编辑状态
    function editUsername() {
        editedUsername.value = props.user.userName
        isEditing.value = true;
    }

    // 保存用户名并退出编辑状态
    function saveUsername() {
        if (editedUsername.value && !(/^\s*$/.test(editedUsername.value))) {
            changeUser.value = props.user;
            changeUser.value.userName = editedUsername.value;
            useStore.updateProfile(changeUser.value)
            emit('refetch')
        }
        isEditing.value = false;
    }


    const handleCustomEvent = (data : number) => {
        emit('custom-event-forwarded-triple', data);
    };
</script>

<style scoped lang="scss">
    .avatar-wrapper {
        display: inline-block;
        cursor: pointer;
    }
    .content-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        width: 100%;
    }
    .user-container {
        display: flex;
        align-items: flex-end;
        gap: 10px;
        width: 100%;
    }
    .UserName {
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
    }

    input {
        font-size: 18px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>