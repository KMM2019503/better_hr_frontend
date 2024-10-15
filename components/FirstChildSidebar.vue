<template>
  <div class="w-full flex flex-col h-full bg-zinc-100 py-6 px-4">
    <h3 class="text-lg font-semibold text-[#4A4A4A]">Employees</h3>
    <ul class="py-2 flex flex-col gap-6">
      <li class="w-full flex justify-start group">
        <NuxtLink
          to="/employees"
          active-class="text-green-500"
          class="w-full text-[14px] group-hover:text-green-500 transition"
        >
          Directory</NuxtLink
        >
      </li>
      <li class="w-full flex justify-start group">
        <NuxtLink
          to="/update_request"
          active-class="text-green-500"
          class="w-full text-[14px] group-hover:text-green-500 transition"
        >
          Update Request</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
