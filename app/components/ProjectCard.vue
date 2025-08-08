<script setup>
defineProps(['repo']);
</script>

<template>
  <NuxtLink :to="`/projects/${repo.name}`" class="project-card">
    <div class="flex flex-col flex-1 pr-6">
      <h3 class="text-2xl font-medium text-[#2d2926] mb-2">{{ formatRepoName(repo.name) }}</h3>
      <p class="text-[#2d2926] mb-4">{{ repo.description || 'No description.' }}</p>
    </div>
    <RightArrow class="text-[#0072ce] w-6" />
  </NuxtLink>
</template>
