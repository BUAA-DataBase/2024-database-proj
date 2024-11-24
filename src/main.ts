import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import TDesign from 'tdesign-vue-next';
import router from './router'
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(TDesign);

app.mount('#app')
