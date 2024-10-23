<template>
  <div class="p-4 overflow-hidden">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/employees' }"
          >Employee</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/employees/create' }"
          >Employee Create</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <client-only>
      <div class="mt-3">
        <el-form :model="newEmployees[0]" :rules="rules" ref="employeeForm">
          <!-- Table -->
          <el-table
            :scrollbar-always-on="true"
            v-loading="isLoading"
            v-if="isMounted"
            :data="newEmployees"
            stripe
            style="width: 100%; height: 800px"
            max-height="100%"
            class="!z-20"
          >
            <el-table-column
              v-for="column in EmployeeCreateTableColumns"
              :key="column.prop"
              :fixed="column.fixed"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
              :show-overflow-tooltip="column?.show_overflow_tooltip"
            >
              <template #default="scope" v-if="column.prop === 'phone'">
                <div class="!z-50 !absolute pb-[30px] !top-4">
                  <vue-tel-input
                    class="!z-[1000]"
                    v-model="scope.row[column.prop]"
                    placeholder="Enter phone number"
                    mode="international"
                  />
                </div>
              </template>
              <template v-else-if="column.prop === 'salary'" #default="scope">
                <el-input-number
                  class="!border-none !border-b"
                  v-model="scope.row[column.prop]"
                  :min="1"
                  :max="99999999999999"
                  :controls="false"
                  :style="{
                    width: column.width
                      ? `${parseInt(column.width) * 0.8}px`
                      : '80% !important',
                  }"
                >
                  <template #suffix>
                    <span>MMK</span>
                  </template>
                </el-input-number>
              </template>
              <template
                v-else-if="
                  ['date_of_birth', 'joining_date'].includes(column.prop)
                "
                #default="scope"
              >
                <el-date-picker
                  :style="{
                    width: column.width
                      ? `${parseInt(column.width) * 0.8}px`
                      : '80% !important',
                  }"
                  v-model="scope.row[column.prop]"
                  type="date"
                  placeholder="Pick a date"
                  clearable
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                />
              </template>
              <template v-else-if="column.prop === 'gender'" #default="scope">
                <el-select
                  v-model="scope.row[column.prop]"
                  placeholder="Select"
                  :style="{
                    width: column.width
                      ? `${parseInt(column.width) * 0.8}px`
                      : '80% !important',
                  }"
                >
                  <el-option
                    v-for="item in genders"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
              <template
                v-else-if="column.prop === 'system_status'"
                #default="scope"
              >
                <div>
                  <el-checkbox
                    v-model="scope.row[column.prop]"
                    label="Active"
                  />
                </div>
              </template>
              <template #default="scope">
                <el-form-item :prop="column.prop">
                  <el-input
                    v-model="scope.row[column.prop]"
                    :style="{
                      width: column.width
                        ? `${parseInt(column.width) * 0.8}px`
                        : '80% !important',
                    }"
                  />
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
          <div class="flex justify-start items-center gap-3 mt-3">
            <el-button plain size="large">Cancel</el-button>
            <el-button
              type="success"
              size="large"
              :loading="isLoading"
              @click="submitForm(employeeForm)"
              >Create Employee</el-button
            >
          </div>
        </el-form>
      </div>
    </client-only>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { EmployeeCreateTableColumns } from "../../constants/employeeTable";
import createNewUser from "~/apollo/mutation/createNewUser.graphql";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

const router = useRouter();

const isLoading = ref(false);
const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const newEmployees = ref([
  {
    name: null,
    email: null,
    position: null,
    salary: 500000,
    role: null,
    department: null,
    date_of_birth: null,
    nrc: null,
    address: null,
    phone: null,
    joining_date: new Date().toISOString().split("T")[0],
    gender: null,
    skills: null,
    emergency_contact: null,
    emergency_contact_number: null,
    system_status: true,
  },
]);

// Validation rules
const rules = {
  name: [
    { required: true, message: "Name is required", trigger: "blur" },
    { min: 3, message: "Name must be at least 3 characters", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Email is required", trigger: "blur" },
    { type: "email", message: "Email must be valid", trigger: "blur" },
  ],
};

const employeeForm = ref();

const {
  mutate: createUserMutation,
  onDone,
  onError,
} = useMutation(createNewUser);

const submitForm = async (formEl) => {
  if (!formEl) return;

  await formEl.validate(async (valid, fields) => {
    // Make this async
    if (valid) {
      try {
        isLoading.value = true;
        const employee = newEmployees.value[0];

        const response = await createUserMutation({
          name: employee.name,
          email: employee.email,
          password: "defaultPassword123",
          position: employee.position,
          salary: employee.salary.toString(),
          department: employee.department,
          date_of_birth: employee.date_of_birth,
          nrc: employee.nrc,
          address: employee.address,
          // phone: employee.phone,
          phone: null,
          gender: employee.gender,
          skills: employee.skills,
          emergency_contact: employee.emergency_contact,
          emergency_contact_number: employee.emergency_contact_number,
          joining_date: employee.joining_date,
          system_status: employee.system_status ? "active" : "inactive",
          role: "user",
        });

        // Success Notification
        ElNotification({
          title: "Success",
          message: "Employee created successfully.",
          type: "success",
        });

        // Clear the form after success
        newEmployees.value = [
          {
            name: "",
            email: "",
            position: "",
            salary: 500000,
            role: "",
            department: "",
            date_of_birth: "",
            nrc: "",
            address: "",
            phone: "",
            joining_date: new Date().toISOString().split("T")[0],
            gender: "",
            skills: "",
            emergency_contact: "",
            emergency_contact_number: "",
            system_status: true,
          },
        ];

        router.push(`/employees`);
      } catch (error) {
        console.log("🚀 ~ handleCreateEmployee ~ error:", error);
        // const errorMessage = error.message;
        // if (error.message === " error: validation") {
        //   console.log("running");
        //   errorMessage = "User Email already exists";
        // }
        // Error Notification
        ElNotification({
          title: "Internal Server Error",
          message: "May be user email already exists",
          type: "error",
        });
      } finally {
        isLoading.value = false;
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped>
.el-breadcrumb__inner {
  font-size: 20px !important;
}

.el-input {
  --el-input-border: none !important;
  --el-input-border-color: transparent !important;
  --el-input-hover-border-color: transparent !important;
  --el-input-focus-border-color: transparent !important;
  --el-input-focus-border: transparent !important;
  border-bottom: 1px solid var(--el-border-color) !important;
}

.el-input__wrapper {
  border: none !important;
}

.vue-tel-input {
  border: none !important;
}

.vue-tel-input:focus-within {
  box-shadow: none !important;
}

.el-table tr {
  background: red !important;
}

.el-table {
  --el-table-row-hover-bg-color: white !important;
}

.el-input__wrapper .is-focus {
  box-shadow: none !important;
}

.el-data-editor {
  --el-input-focus-border-color: var(--el-color-primary);
}
</style>
