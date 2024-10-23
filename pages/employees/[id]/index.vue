<template>
  <div class="common-layout max-h-screen overflow-hidden">
    <el-container>
      <!-- Inner Sidebar -->
      <el-aside width="180px" class="h-screen">
        <FirstChildSidebar />
      </el-aside>
      <el-main
        v-loading="isLoading || isRefreshing"
        class="rounded-tl-3xl rounded-bl-3xl shadow-2xl bg-white !py-4 !pl-7 !pr-4"
      >
        <div v-if="error">Error: {{ errorMessage }}</div>
        <div v-else class="">
          <EmployeeDetail
            :employee="employeeDetails"
            @refreshing-data="refreshAllData"
          />
          <!-- child components -->
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import getUserById from "~/apollo/query/getUserById.graphql";
import EmployeeDetail from "../../../components/employees/EmployeeDetail.vue";

const route = useRoute();
const employeeId = parseInt(route.params.id, 10);

const variables = { id: employeeId };

const { data, loading, error } = useAsyncQuery(getUserById, variables);

const employeeDetails = computed(() => data.value?.userById || {});
const errorMessage = computed(() => error.value?.message);
const isLoading = computed(() => loading);
const isRefreshing = ref(false);

const refreshAllData = async () => {
  isRefreshing.value = true;
  try {
    await refreshNuxtData();
  } finally {
    isRefreshing.value = false;
  }
};
</script>

<style scoped></style>
