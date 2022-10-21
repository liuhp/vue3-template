<template>
  <div class="header-left">
    <Collapse />
    <BreadCom />
  </div>
  <div>
    <el-switch
      v-model="themeMode"
      class="switch-theme"
      inline-prompt
      :active-icon="Sunny"
      :inactive-icon="Moon"
      active-value="auto"
      inactive-value="dark"
      @click="switchThemes"
    />
    <Avatar />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue"
import { Sunny, Moon } from "@element-plus/icons-vue"
import { useDark, useToggle } from "@vueuse/core"
import Collapse from "./Collapse.vue"
import BreadCom from "./BreadCom.vue"
import Avatar from "./Avatar.vue"

const isDark = useDark()
const themeMode = ref("")
onMounted(() => {
  themeMode.value = localStorage.getItem("vueuse-color-scheme")
  console.log(" themeMode.value", localStorage.getItem("vueuse-color-scheme"))
})
const switchThemes = (val: string) => {
  const toggleDark = useToggle(isDark)
  // 不要删
  console.log(toggleDark())
}
</script>

<style lang="scss" scoped>
.header-left {
  display: flex;
  align-items: center;
}
.switch-theme {
  margin-right: 24px;
}
</style>
