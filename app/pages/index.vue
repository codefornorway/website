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

const { fetchMembers } = useGithub();

const members = ref([]);
const loadingMembers = ref(true);
const errorMembers = ref(null);

onMounted(async () => {
  try {
    members.value = await fetchMembers();
  } catch (err) {
    errorMembers.value = err;
  } finally {
    loadingMembers.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-white text-black">
    <section class="text-center px-4 max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold mb-6">You can change Norway for the better!</h1>
      <p class="text-xl mb-8">Can you design, write, or code? You can help Norway live up to its full potential at Code for Norway.</p>
    </section>
    <section class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Projects</h1>
      <div v-if="loading" class="grid gap-4 md:grid-cols-2">
        <div v-for="n in 6" :key="n" class="h-28 bg-gray-100 rounded animate-pulse" />
      </div>
      <div v-else-if="error" class="text-red-500">⚠️ Something went wrong while loading repositories.</div>
      <div v-else class="grid gap-4 md:grid-cols-2">
        <NuxtLink v-for="repo in repos" :key="repo.id" :to="`/projects/${repo.name}`" class="block border rounded-lg p-4 hover:shadow transition bg-white">
          <h2 class="text-xl font-semibold mb-1">{{ repo.name }}</h2>
          <p class="text-gray-600 text-sm">{{ repo.description || 'No description.' }}</p>
          <div class="text-xs text-gray-500 mt-2">⭐ {{ repo.stargazers_count }} | 🍴 {{ repo.forks_count }}</div>
        </NuxtLink>
      </div>
    </section>
    <section class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Organization Members</h1>
      <div v-if="loadingMembers" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="n in 8" :key="n" class="h-24 bg-gray-100 rounded animate-pulse" />
      </div>
      <div v-else-if="errorMembers" class="text-red-500">⚠️ Failed to load members.</div>
      <div v-else-if="members.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a
          v-for="member in members"
          :key="member.login"
          :href="member.html_url"
          target="_blank"
          class="flex flex-col items-center p-4 border rounded hover:shadow transition bg-white">
          <img :src="member.avatar_url" class="w-16 h-16 rounded-full mb-2" />
          <div class="text-sm font-medium text-gray-700">{{ member.login }}</div>
        </a>
      </div>
      <div v-else class="text-gray-500">No members found.</div>
    </section>
    <section class="max-w-2xl mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold mb-4">Join Code for Norway</h2>
      <p class="text-lg mb-6">If you'd like to contribute to Code for Norway, open a GitHub issue describing who you are and how you'd like to help.</p>
      <a href="https://github.com/codefornorway/.github/issues/new?template=join-request.md" target="_blank" class="btn">Open Join Request</a>
    </section>
    <section class="max-w-2xl mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold mb-4">Support Code for Norway</h2>
      <p class="text-lg mb-6">Your support helps us build civic tech for a better Norway.</p>
      <a href="https://github.com/sponsors/zackha" target="_blank" class="btn">Donate via GitHub Sponsors</a>
    </section>
  </div>
</template>
