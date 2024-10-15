<template>
  <div class="common-layout">
    <el-container>
      <!-- Inner Sidebar -->
      <el-aside width="180px" class="h-screen">
        <FirstChildSidebar />
      </el-aside>
      <!-- Employee Directory Content -->
      <el-main class="rounded-tl-3xl rounded-bl-3xl shadow-2xl bg-white !p-0">
        <EmployeesDirectory />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import EmployeesDirectory from "../../components/employees/EmployeesDirectory.vue";
import FirstChildSidebar from "../../components/FirstChildSidebar.vue";
import { useEmployeesStore } from "../../stores/employees";

const employeeStore = useEmployeesStore();

onMounted(() => {
  employeeStore.getEmployeesData(1, 20);
});
</script>
