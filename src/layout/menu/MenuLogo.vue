<template>
  <div class="logo" @click="gohome">
    <img src="@/assets/images/logo.png" alt="logo" />
    <span v-if="!isCollapse" class="title">云 管 平 台</span>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/store/menu'

const router = useRouter()
const menuStore = useMenuStore()
const isCollapse = computed(() => {
  return menuStore.getCollapse
})
const gohome = () => {
  router.push({ path: '/home' })
}
</script>
<style lang="scss" scoped>
.logo {
  // background-color: #212938;
  background: #000;
  padding: 8px 0;
  height: 50px;
  border: none;
  line-height: 50px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  color: #fff;
  box-sizing: border-box;
  cursor: pointer;
  img {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  span {
    font-weight: 600;
    line-height: 50px;
    font-size: 20px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
}
</style>
