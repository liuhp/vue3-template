<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <div class="avatar">
        <el-avatar icon="user" />
      </div>
      <el-icon class="el-icon--right">
        <CaretBottom />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

const router = useRouter();

// 处理下拉菜单点击事件
const handleCommand = (command: string) => {
  console.log('command', command)
  switch(command){
    case 'logout':
      router.push({path:'/login'})
      break;
    case 'userCenter':
       ElMessage({
        message: '敬请期待...',
        type: 'warning',
      })
  }
}
</script>
<style type='scss' scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-dropdown:hover{
  cursor: pointer;
}
.el-dropdown-link{
  display: flex;
  align-items: end;
}
.el-avatar--icon{
  width: 32px;
  height: 32px;
}
</style>
