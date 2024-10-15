<template>
  <div class="w-[60px] flex flex-col items-center bg-zinc-200 h-full">
    <h1 class="py-5">BHR</h1>

    <ul class="flex flex-col w-full">
      <li
        class="border hover:text-green-500 hover:bg-white w-full flex justify-center items-center py-2 transition"
      >
        <NuxtLink to="/" active-class="text-green-500">Ov</NuxtLink>
      </li>
      <li
        class="border hover:text-green-500 hover:bg-white w-full flex justify-center items-center py-2 transition"
      >
        <NuxtLink to="/employees" active-class="text-green-500">Emp</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const route = useRoute();
</script>

<style lang="scss" scoped></style>
