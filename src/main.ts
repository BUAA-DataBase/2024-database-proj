import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import TDesign from 'tdesign-vue-next'
import router from './router'
import 'tdesign-vue-next/es/style/index.css';
import './styles/index.css'
import './assets/style/global.scss'; // 引入全局样式文件
import { useUserStore } from './store/modules/userStore';

const app = createApp(App)

app.use(createPinia())
app.use(TDesign)
app.use(router)

const userStore = useUserStore();
userStore.loadUserFromStorage();

app.mount('#app')
