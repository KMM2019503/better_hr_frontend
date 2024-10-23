<template>
  <div class="p-4">
    <div class="flex justify-between items-center">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/employees' }"
          >Employee Directory</el-breadcrumb-item
        >
        <el-breadcrumb-item
          >Employee Detail ({{ props.employee.name }})</el-breadcrumb-item
        >
      </el-breadcrumb>

      <el-button
        :disabled="updateBtnDisabled"
        :loading="isLoading"
        type="primary"
        class="!py-5 !px-5 !bg-[#1ed292] !text-white !rounded-md hover:!bg-[#2ebe4f] !border-none disabled:!bg-[#a1e9d0]"
        @click="handleUpdate"
      >
        Update
      </el-button>
    </div>

    <div class="mt-3" v-loading="isLoading">
      <client-only>
        <el-tabs
          :before-leave="handleTabsBeforeLeave"
          v-model="activeName"
          class="demo-tabs"
        >
          <el-scrollbar height="800px">
            <el-tab-pane label="Profile" name="profile">
              <Profile :empDetail="formData" @update-form="updateFormData" />
            </el-tab-pane>
            <el-tab-pane label="Job" name="job">
              <Job :empDetail="formData" @update-form="updateFormData" />
            </el-tab-pane>
            <el-tab-pane label="System" name="system">
              <System :empDetail="formData" />
            </el-tab-pane>
          </el-scrollbar>
        </el-tabs>
      </client-only>
    </div>
  </div>
</template>

<script setup>
import Profile from "./employeeDetail/Profile.vue";
import Job from "./employeeDetail/Job.vue";
import System from "./employeeDetail/System.vue";

import updateUserById from "~/apollo/mutation/updateUserById.graphql";

const props = defineProps({
  employee: {
    type: Object,
    required: true,
  },
});

const updateBtnDisabled = ref(true);
const isLoading = ref(false);
const activeName = ref("profile");
const isChanged = ref(false);
let formData = ref({ ...props.employee });

watch(
  () => props.employee,
  (newEmployee) => {
    formData.value = { ...newEmployee };
  }
);

// Function to update form data from child component
const updateFormData = (data) => {
  isChanged.value = true;
  formData.value = { ...props.employee, ...data };
  updateBtnDisabled.value = false;
};

const handleTabsBeforeLeave = async (newActiveName, oldActiveName) => {
  if (isChanged.value) {
    try {
      await open();
      return true;
    } catch {
      return false;
    }
  } else {
    return true;
  }
};

const { mutate: updateUser } = useMutation(updateUserById);

const handleUpdate = async () => {
  if (updateBtnDisabled.value) return;
  try {
    isLoading.value = true;
    updateBtnDisabled.value = true;

    const response = await updateUser({
      id: formData.value.id,
      name: formData.value.name,
      email: formData.value.email,
      password: "default-passwrod-123",
      position: formData.value.position,
      salary: formData.value.salary,
      role: formData.value.role,
      department: formData.value.department,
      address: formData.value.address,
      nrc: formData.value.nrc,
      date_of_birth: formData.value.date_of_birth,
      phone: formData.value.phone,
      gender: formData.value.gender,
      skills: formData.value.skills,
      emergency_contact: formData.value.emergency_contact,
      emergency_contact_number: formData.value.emergency_contact_number,
      joining_date: formData.value.joining_date,
      system_status: formData.value.system_status,
    });

    console.log("🚀 ~ handleUpdate ~ response:", response);

    ElNotification({
      title: "Success",
      message: "Employee Updated successfully.",
      type: "success",
    });

    window.location.reload();
  } catch (error) {
    console.log("🚀 ~ handleUpdate ~ error:", error);

    ElNotification({
      title: "Error",
      message: `Failed to update employee: Internal Server Error`,
      type: "error",
    });
  } finally {
    isLoading.value = false;
  }
};

// message box

const open = () => {
  return ElMessageBox.confirm(
    "You have unsaved changes. Are you sure you want to leave this page?",
    "Warning",
    {
      confirmButtonText: "Leave",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(() => {
      formData.value = { ...formData.value, ...props.employee };
      updateBtnDisabled.value = true;
      isChanged.value = false;
      return true;
    })
    .catch(() => {
      return Promise.reject(false);
    });
};
</script>

<style scoped>
.el-breadcrumb__item {
  font-size: 1rem;
}
</style>
