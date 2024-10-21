<template>
  <div class="common-layout">
    <el-container>
      <!-- Inner Sidebar -->
      <el-aside width="180px" class="h-screen">
        <FirstChildSidebar />
      </el-aside>
      <el-main class="rounded-tl-3xl rounded-bl-3xl shadow-2xl bg-white !p-0">
        <div v-if="loading" class="p-10">Loading...</div>
        <div v-else-if="error">Error: {{ errorMessage }}</div>
        <div v-else class="p-10">
          <h1>Emp Detail</h1>
          <h2>{{ employeeDetails.name }}</h2>
          <p>{{ employeeDetails.email }}</p>

          <!-- child components -->
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import getUserById from "~/apollo/query/getUserById.graphql";

const route = useRoute();
const employeeId = parseInt(route.params.id, 10);

const variables = { id: employeeId };

const { data, loading, error } = useAsyncQuery(getUserById, variables);

const employeeDetails = computed(() => data.value?.userById || {});
const errorMessage = computed(() => error.value?.message);
</script>

<style scoped></style>
