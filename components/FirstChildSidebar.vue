<template>
  <div class="w-full flex flex-col h-full bg-[#F1F1F1]">
    <div class="w-full">
      <h3 class="text-lg font-semibold text-[#4A4A4A] mt-[1rem] mx-[12px]">
        Employees
      </h3>
    </div>
    <ul class="py-2 flex flex-col gap-6">
      <NuxtLink
        to="/employees"
        active-class="text-green-500"
        class="w-full text-[14px] group-hover:text-green-500 transition p-[12px]"
      >
        Directory</NuxtLink
      >
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
