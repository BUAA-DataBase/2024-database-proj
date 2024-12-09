<template>
    <div class="content-container">
        <div class="user-container">
            <div class="avatar-wrapper" @click="triggerFileInput">
                <!-- 头像展示 -->
                <t-avatar 
                    v-if="avatarImage"
                    size="100px" 
                    :image="avatarImage" 
                    alt="用户头像" 
                    shape="circle"
                />
                <t-avatar 
                    v-if="!avatarImage" 
                    size="100px" 
                    shape="circle" 
                    style="background-color: #f0f0f0; color: #4983c9; display: flex; justify-content: center; align-items: center; font-size: 24px; cursor: pointer;">
                </t-avatar>
                <!-- 隐藏的文件选择框 -->
                <input 
                    ref="fileInput" 
                    type="file" 
                    accept="image/*" 
                    style="display: none;" 
                    @change="handleFileChange"
                />
            </div>
            <div>
                <!-- 显示用户名，点击时变为输入框 -->
                <span v-if="!isEditing" class="UserName" @click="editUsername">{{ userName }}</span>
                
                <!-- 编辑状态下显示输入框 -->
                <input v-if="isEditing" v-model="editedUsername" @blur="saveUsername" @keyup.enter="saveUsername" />

            </div>
        </div>
        <div>
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
                :authorId="author_id"
                :authorName="userName"
            />
            <ProfileCourseList v-if="menuValue === 'item3'"/>
            <ProfileFollowUserList v-if="menuValue === 'item2'"/>
        </div>
    </div>
</template>

<script lang="ts" setup name="">
    import {ref} from 'vue'
    import ProfileReviewList from '@/pages/profileView/ProfileReviewList.vue';
    import ProfileFollowUserList from '@/pages/profileView/ProfileFollowUserList.vue';
    import ProfileCourseList from '@/pages/profileView/ProfileCourseList.vue';
    import { UploadIcon, PlusIcon } from 'tdesign-icons-vue-next';

    const userName = ref('周子皓')
    const author_id = ref(1)
    const menuValue = ref('item1')
    const avatarImage = ref('')
    const fileInput = ref<HTMLInputElement | null>(null);
    const editedUsername = ref(userName.value);  // 存储正在编辑的用户名
    const isEditing = ref(false);  // 是否正在编辑

    // 触发文件选择框
    function triggerFileInput() {
        if (fileInput.value) {
            fileInput.value.click();  // 手动点击隐藏的 input
        }
    }

    // 处理文件选择
    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input && input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();
            
            reader.onload = () => {
            avatarImage.value = reader.result as string;  // 更新头像
            };

            reader.readAsDataURL(file);  // 将文件读取为 Data URL
        }
    }

    // 点击用户名时进入编辑状态
    function editUsername() {
        isEditing.value = true;
    }

    // 保存用户名并退出编辑状态
    function saveUsername() {
        userName.value = editedUsername.value;
        isEditing.value = false;
    }


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