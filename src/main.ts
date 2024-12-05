import { createApp } from 'vue'
import { createPinia } from 'pinia'

import TDesign from 'tdesign-vue-next'
import App from './App.vue'
import './styles/index.css'
import router from './router'
import 'tdesign-vue-next/es/style/index.css';
import './assets/style/global.scss'; // 引入全局样式文件

createApp(App).mount('#app');

const app = createApp(App)

app.use(createPinia())
app.use(TDesign)
app.use(router)

app.mount('#app')
