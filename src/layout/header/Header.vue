<template>
  <div class="header-left">
    <Collapse />
    <BreadCom />
  </div>
  <Avatar />
</template>
<script setup lang="ts">
import Collapse from './Collapse.vue'
import BreadCom from './BreadCom.vue'
import Avatar from './Avatar.vue'
</script>

<style lang="scss" scoped>
.header-left{
  display: flex;
  align-items: center;
}
</style>
