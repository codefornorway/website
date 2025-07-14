<script setup>
const { fetchRepos } = useGithub();

const repos = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    repos.value = await fetchRepos();
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="p-6 max-w-5xl mx-auto">
    <NuxtLink to="/" class="text-blue-500 underline mb-6 block">← Back to Home</NuxtLink>

    <h1 class="text-3xl font-bold mb-6">GitHub Projects</h1>

    <!-- Loading State -->
    <div v-if="loading" class="grid gap-4 md:grid-cols-2">
      <div v-for="n in 6" :key="n" class="h-28 bg-gray-100 rounded animate-pulse" />
    </div>

    <!-- Hata -->
    <div v-else-if="error" class="text-red-500">⚠️ Something went wrong while loading repositories.</div>

    <!-- Repo List -->
    <div v-else class="grid gap-4 md:grid-cols-2">
      <NuxtLink v-for="repo in repos" :key="repo.id" :to="`/projects/${repo.name}`" class="block border rounded-lg p-4 hover:shadow transition bg-white">
        <h2 class="text-xl font-semibold mb-1">{{ repo.name }}</h2>
        <p class="text-gray-600 text-sm">{{ repo.description || 'No description.' }}</p>
        <div class="text-xs text-gray-500 mt-2">⭐ {{ repo.stargazers_count }} | 🍴 {{ repo.forks_count }}</div>
      </NuxtLink>
    </div>
  </section>
</template>
