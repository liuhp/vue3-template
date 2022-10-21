import { createApp } from "vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import App from "./App.vue"
import router from "./router/index"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "element-plus/theme-chalk/dark/css-vars.css"
import { createPinia } from "pinia"

const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia).use(ElementPlus).mount("#app")

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
