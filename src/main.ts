import { createApp } from 'vue'
import TDesign from 'tdesign-vue-next'
import App from './App.vue'
import './styles/index.css'
import pinia from './store'
import router from './router'
import naive from 'naive-ui'
import 'tdesign-vue-next/es/style/index.css';
import './assets/style/global.scss'; // 引入全局样式文件

createApp(App).mount('#app');

const app = createApp(App)

app.use(pinia)
app.use(TDesign)
app.use(naive)
app.use(router)

app.mount('#app')
