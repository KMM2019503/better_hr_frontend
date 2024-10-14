<template>
  <div class="common-layout">
    <el-container>
      <!-- Inner Sidebar -->
      <el-aside width="180px" class="h-screen">
        <FirstChildSidebar />
      </el-aside>
      <!-- Emplyee Directory Content  -->
      <el-main class="rounded-tl-3xl rounded-bl-3xl shadow-2xl">
        <EmployeesDirectory />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import EmployeesDirectory from "../../components/employees/EmployeesDirectory.vue";
import FirstChildSidebar from "../../components/FirstChildSidebar.vue";
import fetchEmployeeDataQuery from "~/apollo/query/fetchEmployeeData.graphql";
async function getEmployeesData() {
  console.log("click");
  try {
    let variables = {
      page: 1,
      limit: 20,
    };
    const response = await useQuery(fetchEmployeeDataQuery, variables, {
      fetchPolicy: "network-only",
    });
    console.log("🚀 ~ getEmployeesData ~ response:", response);
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  getEmployeesData();
});
</script>
