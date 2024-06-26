import '../src/assets/styles/main.scss'
import { createYmaps } from 'vue-yandex-maps'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
    expireTimes: "30d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
});

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(createYmaps({
    apikey: '944fc6bf-e1df-44cd-a5b6-744b76d17157',
}))
app.use(pinia)

app.mount('#app')
