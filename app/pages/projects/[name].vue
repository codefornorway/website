<script setup>
const route = useRoute();
const { fetchRepo, fetchContributors } = useGithub();

const repo = ref(null);
const contributors = ref([]);

const loading = ref(true);
const error = ref(null);

const contributorsLoading = ref(true);
const contributorsError = ref(null);

onMounted(async () => {
  try {
    repo.value = await fetchRepo(route.params.name);
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }

  try {
    contributors.value = await fetchContributors(route.params.name);
  } catch (err) {
    contributorsError.value = err;
  } finally {
    contributorsLoading.value = false;
  }
});
</script>

<template>
  <section class="p-6 max-w-3xl mx-auto">
    <NuxtLink to="/" class="text-blue-500 underline mb-6 block">← Back to Home</NuxtLink>

    <div v-if="loading" class="space-y-4">
      <div class="h-10 bg-gray-100 rounded animate-pulse w-1/2"></div>
      <div class="h-6 bg-gray-100 rounded animate-pulse w-full"></div>
      <div class="h-4 bg-gray-100 rounded animate-pulse w-1/4"></div>
    </div>

    <div v-else-if="error" class="text-red-500">⚠️ {{ error.message || 'Error loading repository.' }}</div>

    <div v-else>
      <h1 class="text-3xl font-bold">{{ repo.name }}</h1>
      <p class="text-gray-700 mt-2">{{ repo.description || 'No description available.' }}</p>

      <div class="text-sm text-gray-600 mt-4">
        ⭐ {{ repo.stargazers_count }} stars | 🍴 {{ repo.forks_count }} forks | 📅 Created: {{ new Date(repo.created_at).toLocaleDateString() }}
      </div>

      <a :href="repo.html_url" target="_blank" class="text-blue-600 underline mt-4 block">View on GitHub →</a>

      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Contributors</h2>

        <div v-if="contributorsLoading" class="space-y-2">
          <div v-for="n in 3" :key="n" class="h-10 bg-gray-100 rounded animate-pulse" />
        </div>

        <div v-else-if="contributorsError" class="text-gray-500">❌ Could not load contributors.</div>

        <ul v-else-if="contributors.length" class="space-y-3">
          <li v-for="user in contributors" :key="user.login" class="flex items-center gap-3">
            <img :src="user.avatar_url" class="w-8 h-8 rounded-full" />
            <a :href="user.html_url" target="_blank" class="text-blue-600 hover:underline">
              {{ user.login }}
            </a>
            <span class="text-sm text-gray-500">({{ user.contributions }} contributions)</span>
          </li>
        </ul>

        <div v-else class="text-gray-500">No contributors found.</div>
      </div>
    </div>
  </section>
</template>
