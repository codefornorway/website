<script setup lang="ts">
import type { OrganizationRepo, RepositoryContributor } from '~~/types';

const route = useRoute();
const repoName = route.params.name as string;

const { data: repo, error: repoError, pending: repoLoading } = await useFetch<OrganizationRepo>(`/api/github/repos/${repoName}`);

const { data: contributors, error: contributorsError, pending: contributorsLoading } = await useFetch<RepositoryContributor[]>(`/api/github/repos/${repoName}/contributors`);

if (repoError.value) {
  throw createError({ statusCode: 500, statusMessage: 'Could not load repository' });
}
if (contributorsError.value) {
  throw createError({ statusCode: 500, statusMessage: 'Could not load contributors' });
}
</script>

<template>
  <section class="mx-auto px-4 mt-2 sm:px-6 xl:px-24 max-w-[1440px]">
    <NuxtLink to="/" class="text-[#0072ce] underline font-light mb-8 block">Home</NuxtLink>

    <div v-if="repoLoading" class="space-y-4">
      <div class="h-10 bg-gray-100 rounded animate-pulse w-1/2"></div>
      <div class="h-6 bg-gray-100 rounded animate-pulse w-full"></div>
      <div class="h-4 bg-gray-100 rounded animate-pulse w-1/4"></div>
    </div>

    <div v-else-if="repoError" class="text-red-500">⚠️ {{ repoError.statusMessage || 'Error loading repository.' }}</div>

    <div v-else class="max-w-lg">
      <h1 class="text-4xl font-bold tracking-wide">{{ formatRepoName(repo?.name || '') }}</h1>
      <p class="text-[#2d2926] mt-4 tracking-wide font-light text-2xl">{{ repo?.description || 'No description available.' }}</p>

      <div class="text-sm text-gray-600 mt-4">
        ⭐ {{ repo?.stargazers_count }} stars | 🍴 {{ repo?.forks_count }} forks | 📅 Created: {{ new Date(repo?.created_at || '').toLocaleDateString() }}
      </div>

      <a :href="repo?.html_url" target="_blank" class="text-blue-600 underline mt-4 block">View on GitHub →</a>

      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Contributors</h2>

        <div v-if="contributorsLoading" class="space-y-2">
          <div v-for="n in 3" :key="n" class="h-10 bg-gray-100 rounded animate-pulse" />
        </div>

        <div v-else-if="contributorsError" class="text-gray-500">❌ Could not load contributors.</div>

        <ul v-else-if="contributors && contributors.length" class="space-y-3">
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
