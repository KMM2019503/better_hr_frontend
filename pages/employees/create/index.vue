<template>
  <div class="common-layout">
    <el-container>
      <!-- Inner Sidebar -->
      <el-aside width="180px" class="h-screen">
        <FirstChildSidebar />
      </el-aside>
      <!-- Employee Directory Content -->
      <el-main class="rounded-tl-3xl rounded-bl-3xl shadow-2xl bg-white !p-0">
        <EmployeeCreate />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import EmployeeCreate from "../../../components/employees/EmployeeCreate.vue";
</script>

<style lang="scss" scoped></style>
