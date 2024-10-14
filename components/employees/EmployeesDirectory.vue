<template>
  <div class="py-4 over">
    <div>
      <h3 class="text-green-500">Employee Directory</h3>
    </div>
    <!-- Data Table -->
    <div class="my-3">
      <!-- table -->
      <el-table
        v-if="isMounted"
        :data="EmployeetableData"
        stripe
        ref="multipleTableRef"
        @selection-change="handleSelectionChange"
        style="width: 100%; height: 780px"
        max-height="100%"
      >
        <el-table-column type="selection" :selectable="selectable" width="55" />
        <el-table-column
          v-for="column in EmployeetableColumns"
          :fixed="column.fixed"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :show-overflow-tooltip="column?.show_overflow_tooltip"
        >
        </el-table-column>
      </el-table>
      <!-- pagination -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  EmployeetableColumns,
  EmployeetableData,
} from "../../constants/employeeTable";

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

const multipleTableRef = ref();
const multipleSelection = ref([]);

// Define the selectable function to always return true
const selectable = () => true;

const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

const onCellClick = (row) => {
  console.log("🚀 ~ onCellClick ~ row:", row);
};
</script>

<style lang="scss" scoped></style>
