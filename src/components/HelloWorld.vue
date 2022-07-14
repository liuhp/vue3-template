<template>
  <button type="button" @click="addBtn">点我自增{{count}}</button>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '@/store'
const store = useStore()
const count = ref(0)
const showcount = computed(()=>{
  return store.getters.getCount()
})
const addBtn = () => {
  store.commit('setCount', ++count.value)
}


</script>

