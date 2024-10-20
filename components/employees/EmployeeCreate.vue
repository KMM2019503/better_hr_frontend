<template>
  <div class="p-4">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/employees' }"
          >Employee</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/employees/create' }">
          Employee Create
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.el-breadcrumb__inner {
  font-size: 20px !important;
}
</style>
