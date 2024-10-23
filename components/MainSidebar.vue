<template>
  <div class="w-[60px] flex flex-col bg-zinc-200 h-full gap-0">
    <!-- <h1 class="py-5">BHR</h1> -->
    <div class="w-full flex justify-center items-center">
      <img src="~/assets/img/better_icon.svg" alt="Logo" class="size-11 mt-2" />
    </div>
    <ul class="flex flex-col w-full p-0">
      <NuxtLink
        to="/"
        active-class="text-green-500 w-full bg-[#F1F1F1] flex justify-center items-center"
        class="border hover:text-green-500 hover:bg-white w-full flex justify-center items-center py-2 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-monitor"
        >
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      </NuxtLink>

      <NuxtLink
        to="/employees"
        active-class="text-green-500 w-full bg-[#F1F1F1] flex justify-center items-center"
        class="border hover:text-green-500 hover:bg-white w-full flex justify-center items-center py-2 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class=""
        >
          <path d="M18 21a8 8 0 0 0-16 0" />
          <circle cx="10" cy="8" r="5" />
          <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
        </svg>
      </NuxtLink>
    </ul>
  </div>
</template>

<script setup>
const route = useRoute();
</script>

<style lang="scss" scoped></style>
