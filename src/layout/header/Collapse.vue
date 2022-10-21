<template>
  <el-icon class="icons" @click="changeIcon">
    <component class="icons" :is="status ? 'expand' : 'fold'" />
  </el-icon>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"
import { useMenuStore } from "@/store/menu"

const menuStore = useMenuStore()
const status = computed(() => {
  return menuStore.getCollapse
})
const changeIcon = () => {
  // status.value = !status.value
  menuStore.setCollapse(!status.value)
}
</script>

<style lang="scss" scoped>
.icons {
  display: flex;
  align-items: center;
  font-size: 36px;
  // color: #303133;
  color: rgb(244, 244, 245);
  cursor: pointer;
  margin-right: 15px;
}
.icons:hover {
  color: #409eff;
}
</style>
