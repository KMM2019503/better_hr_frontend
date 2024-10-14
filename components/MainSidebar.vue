<template>
  <div class="w-[60px] flex flex-col items-center bg-zinc-200 h-full">
    <h1>BHR</h1>

    <ul class="flex flex-col items-center gap-2">
      <li
        class="border rounded-md p-2 hover:shadow-lg hover:text-green-500 w-full flex justify-center items-center"
      >
        <NuxtLink to="/" active-class="text-green-500">Ov</NuxtLink>
      </li>
      <li
        class="border rounded-md p-2 hover:shadow-lg hover:text-green-500 w-full flex justify-center items-center"
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
