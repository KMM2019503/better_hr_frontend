<template>
  <div class="mt-2">
    <el-form
      :model="form"
      label-width="auto"
      style="max-width: 600px"
      label-position="left"
    >
      <el-form-item label="Skills">
        <el-input v-model="form.skills" @input="emitFormChange" />
      </el-form-item>
      <el-form-item label="Department">
        <el-input v-model="form.department" @input="emitFormChange" />
      </el-form-item>
      <el-form-item label="Position">
        <el-input v-model="form.position" @input="emitFormChange" />
      </el-form-item>
      <el-form-item label="Emergency Contact">
        <el-input v-model="form.emergency_contact" @input="emitFormChange" />
      </el-form-item>
      <el-form-item label="Emergency Contact_number">
        <template v-if="form.emergency_contact_number !== undefined">
          <vue-tel-input
            v-model="form.emergency_contact_number"
            placeholder="Enter phone number"
            mode="international"
            @input="emitFormChange"
          />
        </template>
      </el-form-item>
      <el-form-item label="Joining Date">
        <el-date-picker
          v-model="form.joining_date"
          type="date"
          placeholder="Joining Date"
          @change="emitFormChange"
          clearable
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <div class="max-w-[600px] grid grid-cols-3 text-gray-600 text-sm">
        <p>Length of services</p>
        <p class="col-span-2">{{ lengthOfServices }}</p>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  empDetail: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["update-form"]);

const form = reactive({
  skills: props.empDetail.skills,
  department: props.empDetail.department,
  position: props.empDetail.position,
  emergency_contact: props.empDetail.emergency_contact,
  emergency_contact_number: props.empDetail.emergency_contact_number,
  joining_date: props.empDetail.joining_date,
});

watch(
  () => props.empDetail,
  (newEmpDetail) => {
    form.skills = newEmpDetail.skills;
    form.department = newEmpDetail.department;
    form.position = newEmpDetail.position;
    form.emergency_contact = newEmpDetail.emergency_contact;
    form.emergency_contact_number = newEmpDetail.emergency_contact_number;
    form.joining_date = newEmpDetail.joining_date;
  },
  { immediate: true } // To run the watcher immediately with the initial value
);

const lengthOfServices = computed(() => {
  if (!form.joining_date) return "N/A";
  const joiningDate = new Date(form.joining_date);
  const currentDate = new Date();
  const timeDiff = currentDate - joiningDate;

  if (timeDiff < 0) return "Not yet to count months and years";

  // Calculate years, months, and days
  const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );

  return `${years} years, ${months} months`;
});

const emitFormChange = () => {
  emits("update-form", form);
};
</script>

<style lang="scss" scoped></style>
