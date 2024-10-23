<template>
  <div class="py-4 px-4">
    <div class="flex justify-between items-center">
      <h3 class="text-[#1ED292]">Employee Directory</h3>
      <NuxtLink
        to="/employees/create"
        class="py-2 px-4 bg-[#1ed292] text-white rounded-md hover:bg-[#2ebe4f]"
        >Create Employee</NuxtLink
      >
    </div>
    <!-- Data Table -->
    <client-only>
      <div class="mt-3" v-if="employees">
        <!-- table -->
        <el-table
          v-loading="isLoading"
          v-if="isMounted"
          :data="employees"
          stripe
          ref="multipleTableRef"
          @selection-change="handleSelectionChange"
          style="width: 100%; height: 800px"
          max-height="100%"
        >
          <el-table-column
            type="selection"
            :selectable="selectable"
            width="55"
          />
          <el-table-column
            v-for="column in EmployeetableColumns"
            :key="column.prop"
            :fixed="column.fixed"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :show-overflow-tooltip="column?.show_overflow_tooltip"
          >
            <template v-if="column.prop === 'name'" #default="scope">
              <p
                @click="handleClickName(scope.row.id)"
                class="cursor-pointer hover:text-[#1ed292]"
              >
                {{ scope.row.name }}
              </p>
            </template>

            <template v-if="column.prop === 'date_of_birth'" #default="scope">
              <p>
                {{
                  scope.row.date_of_birth
                    ? calculateYearsFromDate(scope.row.date_of_birth)
                    : "N/A"
                }}
              </p>
            </template>

            <template v-if="column.prop === 'joining_date'" #default="scope">
              <p>
                {{
                  scope.row.joining_date
                    ? formatDateTime(scope.row.joining_date)
                    : "N/A"
                }}
              </p>
            </template>
          </el-table-column>
        </el-table>
        <!-- pagination -->
        <div class="demo-pagination-block mt-2 float-right">
          <el-pagination
            color="#84cc16"
            v-model:current-page="current_page"
            v-model:page-size="page_size"
            :page-sizes="[10, 20, 30, 40]"
            background
            size="large"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </client-only>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { formatDate, calculateYearsFromDate } from "~/utils/helper.js";
import { EmployeetableColumns } from "../../constants/employeeTable";
import { formatDateTime } from "../../utils/helper";
import { useEmployeesStore } from "../../stores/employees";

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

// using Employee Store
const employeesStore = useEmployeesStore();

const employees = computed(() => employeesStore.employees);
const isLoading = computed(() => employeesStore.isLoading);
const current_page = computed(() => employeesStore.current_page);
const page_size = computed(() => employeesStore.per_page);
const total = computed(() => employeesStore.total);

const multipleTableRef = ref();
const multipleSelection = ref([]);

const selectable = () => true;

const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

const router = useRouter();

// handle click name
const handleClickName = (id) => {
  router.push(`/employees/${id}`);
};

// pagination logic
const handleCurrentChange = async (value) => {
  await employeesStore.setCurrentPage(value);
  await employeesStore.getEmployeesData(value, employeesStore.per_page);
};

const handleSizeChange = async (value) => {
  await employeesStore.setPageSize(value);
  await employeesStore.getEmployeesData(employeesStore.current_page, value);
};
</script>

<style scoped>
:deep(.el-pagination.is-background .btn-next.is-active),
:deep(.el-pagination.is-background .btn-prev.is-active),
:deep(.el-pagination.is-background .el-pager li.is-active) {
  background-color: #1ed292 !important;
  color: var(--el-color-white) !important;
}
</style>
