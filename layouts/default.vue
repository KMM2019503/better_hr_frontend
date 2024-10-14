<template>
  <div class="h-screen w-full common-layout bg-zinc-100">
    <el-container>
      <el-aside class="h-screen" width="60px">
        <MainSidebar />
      </el-aside>
      <el-main style="padding: 0px">
        <slot />
      </el-main>
    </el-container>
  </div>
</template>
