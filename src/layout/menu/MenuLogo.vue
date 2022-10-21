<template>
  <div class="logo">
    <img src="../../assets/images/logo.png" alt="logo" />
    <span v-if="!isCollapse" class="title">LOGO</span>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, computed } from "vue"
import { useStore } from "@/store/index"

const store = useStore()
const isCollapse = computed(() => {
  return store.getters["menu/getCollapse"]
})
</script>
<style lang="scss" scoped>
.logo {
  background-color: #000;
  padding: 8px 0;
  height: 50px;
  border: none;
  line-height: 50px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  color: #fff;
  box-sizing: border-box;
  img {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  span {
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
}
</style>
