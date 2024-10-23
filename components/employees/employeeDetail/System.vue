<template>
  <div class="w-full" v-loading="isLoading">
    <div
      class="max-w-[600px] grid grid-cols-3 text-gray-600 text-sm items-center"
    >
      <p>System Status</p>
      <div>
        <el-button
          type="danger"
          v-if="empDetail.system_status === 'active'"
          @click="handleDelete(empDetail.id)"
        >
          Deleted Now
        </el-button>
        <p v-else class="font-bold text-red-500">User is already deleted</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import deleteUserById from "~/apollo/mutation/deleteUserById.graphql";

const props = defineProps({
  empDetail: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["deleted-employee"]);

const isLoading = ref(false);
const route = useRoute();

const { mutate: deleteUser } = useMutation(deleteUserById);

const handleDelete = async (value) => {
  emits("deleted-employee", value);
};
</script>

<style lang="scss" scoped></style>
