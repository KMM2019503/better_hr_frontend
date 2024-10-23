<template>
  <div class="mt-2">
    <el-form
      :model="form"
      label-width="auto"
      style="max-width: 600px"
      label-position="left"
    >
      <el-form-item label="Name">
        <el-input
          v-model="form.name"
          @input="emitFormChange"
          :class="{ onError: isError }"
        />
      </el-form-item>

      <el-form-item label="Date of Birth">
        <el-date-picker
          v-model="form.date_of_birth"
          type="date"
          placeholder="Date of Birth"
          @change="emitFormChange"
          clearable
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item label="Phone">
        <vue-tel-input
          v-model="form.phone"
          placeholder="Enter phone number"
          mode="international"
          @input="emitFormChange"
        />
      </el-form-item>

      <el-form-item label="Gender">
        <el-select
          v-model="form.gender"
          placeholder="Select Gender"
          @change="emitFormChange"
        >
          <el-option
            v-for="gender in genders"
            :key="gender.value"
            :label="gender.label"
            :value="gender.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Work Email">
        <el-input
          v-model="form.email"
          :class="{ onError: isError }"
          @input="emitFormChange"
        />
      </el-form-item>

      <el-form-item label="Home Address">
        <el-input
          v-model="form.address"
          type="textarea"
          @input="emitFormChange"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
const props = defineProps({
  empDetail: {
    type: Object,
    required: true,
  },
  isError: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update-form"]);

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const form = reactive({
  name: props.empDetail.name,
  email: props.empDetail.email,
  date_of_birth: props.empDetail.date_of_birth,
  gender: props.empDetail.gender,
  phone: props.empDetail.phone,
  address: props.empDetail.address,
});

watch(
  () => props.empDetail,
  (newEmpDetail) => {
    form.name = newEmpDetail.name;
    form.email = newEmpDetail.email;
    form.date_of_birth = newEmpDetail.date_of_birth;
    form.gender = newEmpDetail.gender;
    form.phone = newEmpDetail.phone;
    form.address = newEmpDetail.address;
  },
  { immediate: true }
);

const emitFormChange = () => {
  emits("update-form", form);
};
</script>

<style scoped>
.onError {
  --el-input-border-color: red !important;
}
</style>
