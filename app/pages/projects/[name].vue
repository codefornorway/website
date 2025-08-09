<script setup lang="ts">
const route = useRoute();
const repoName = route.params.name as string;

const { repo, contributors } = useGithub(repoName);

if (repo?.error.value) {
  throw createError({ statusCode: 500, statusMessage: 'Could not load repository' });
}
if (contributors?.error.value) {
  throw createError({ statusCode: 500, statusMessage: 'Could not load contributors' });
}
</script>

<template>
  <section class="mx-auto px-4 mt-2 sm:px-6 xl:px-24 max-w-[1440px]">
    <NuxtLink to="/" class="text-[#0072ce] underline font-light mb-8 block">Home</NuxtLink>

    <!-- Repo Loading -->
    <div v-if="repo?.pending.value" class="space-y-4">
      <div class="h-10 bg-gray-100 rounded animate-pulse w-1/2"></div>
      <div class="h-6 bg-gray-100 rounded animate-pulse w-full"></div>
      <div class="h-4 bg-gray-100 rounded animate-pulse w-1/4"></div>
    </div>

    <!-- Repo Error -->
    <div v-else-if="repo?.error.value" class="text-red-500">⚠️ {{ repo.error.value.statusMessage || 'Error loading repository.' }}</div>

    <!-- Repo Data -->
    <div v-else-if="repo?.data.value" class="max-w-lg">
      <h1 class="text-4xl font-bold tracking-wide">
        {{ formatRepoName(repo.data.value.name) }}
      </h1>
      <p class="text-[#2d2926] mt-4 tracking-wide font-light text-2xl">
        {{ repo.data.value.description || 'No description available.' }}
      </p>

      <div class="text-sm text-gray-600 mt-4">
        ⭐ {{ repo.data.value.stargazers_count }} stars | 🍴 {{ repo.data.value.forks_count }} forks | 📅 Created: {{ formatDate(repo.data.value.created_at) }}
      </div>

      <a :href="repo.data.value.html_url" target="_blank" class="text-blue-600 underline mt-4 block">View on GitHub →</a>

      <!-- Contributors -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Contributors</h2>

        <div v-if="contributors?.pending.value" class="space-y-2">
          <div v-for="n in 3" :key="n" class="h-10 bg-gray-100 rounded animate-pulse" />
        </div>

        <div v-else-if="contributors?.error.value" class="text-gray-500">❌ Could not load contributors.</div>

        <ul v-else-if="contributors?.data.value?.length" class="space-y-3">
          <li v-for="user in contributors.data.value" :key="user.login" class="flex items-center gap-3">
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
