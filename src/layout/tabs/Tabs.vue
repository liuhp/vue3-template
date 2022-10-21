<template>
  <div class="tag-content">
    <el-tag
      v-for="item in tabsList"
      :key="item.path"
      class="menu-tag"
      :closable="item.path === '/home' ? false : true"
      :disable-transitions="false"
      :type="route.path === item.path ? '' : 'info'"
      :effect="route.path === item.path ? 'dark' : 'plain'"
      @click="clickTag(item)"
      @close="removeTab(item.path)"
    >
      {{ item.title }}
    </el-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from "vue"
import { useStore } from "@/store"
import { useRoute, useRouter } from "vue-router"
import { ITabe } from "@/store/type"
const store = useStore()
const route = useRoute()
const router = useRouter()

// 获取tabs数据
const tabsList = computed(() => {
  return store.getters["tabs/getTabs"]
})
//当前激活的选项卡
const activeTab = ref("2")
const setActiveTab = () => {
  activeTab.value = route.path
}

//删除选项卡
const removeTab = (targetName: string) => {
  if (targetName === "/home") return
  if (store.state.tabs.tabList.length === 1) return
  //选项卡数据
  const tabs = tabsList.value
  let activeName = activeTab.value
  if (activeName === targetName) {
    tabs.forEach((tab: ITabe, index: number) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }
  //重新设置当前激活的选项卡
  activeTab.value = activeName
  //重新设置选项卡数据
  store.state.tabs.tabList = tabs.filter(
    (tab: ITabe) => tab.path !== targetName
  )
  //跳转路由
  router.push({ path: activeName })
}

//点击选项卡
const clickBtn = (tab: any) => {
  const { props } = tab
  //跳转路由
  router.push({ path: props.name })
}

//添加选项卡
const addTab = () => {
  const { path, meta } = route
  const tab: ITabe = {
    path: path,
    title: meta.title as string,
  }
  store.commit("tabs/addTab", tab)
}

//监听路由的变化
watch(
  () => route.path,
  () => {
    //设置激活的选项卡
    setActiveTab()
    //把当前路由添加到选项卡数据
    addTab()
  }
)

//解决刷新数据丢失的问题
const beforRefresh = () => {
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("tabsView", JSON.stringify(tabsList.value))
  })
  let tabSession = sessionStorage.getItem("tabsView")
  if (tabSession && tabSession.length) {
    let oldTabs = JSON.parse(tabSession)
    if (oldTabs.length > 0) {
      // ToDo： 在store中操作
      store.state.tabs.tabList = oldTabs
    }
  }
}

onMounted(() => {
  beforRefresh()
  setActiveTab()
  addTab()
})
//点击选项卡
const clickTag = (tag: object) => {
  const { path } = tag
  //跳转路由
  router.push({ path })
}
</script>

<style scoped lang="scss">
.tag-content {
  padding: 8px 20px;
  margin: 0 -20px;

  background: rgba(0, 0, 0, 0.05);
  .menu-tag {
    margin-right: 8px;
    cursor: pointer;
  }
}
.dark .tag-content {
  border-bottom: 1px solid #4c4d4f;
}
</style>
