<script setup>
const { fetchRepos, fetchMembers } = useGithub();

const repos = ref([]);
const members = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const [repoData, memberData] = await Promise.all([fetchRepos(), fetchMembers()]);
    repos.value = repoData;
    members.value = memberData;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-white text-gray-900 font-sans">
    <!-- Hero -->
    <section class="text-center px-4 py-20 max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">You can change Norway for the better!</h1>
      <p class="text-lg text-gray-700">Can you design, write, or code? Help Norway reach its full potential at Code for Norway.</p>
    </section>

    <!-- Projects -->
    <section class="max-w-3xl mx-auto px-4 py-10">
      <h2 class="text-2xl font-semibold mb-6 text-center">Projects</h2>
      <div v-if="loading" class="grid gap-4 md:grid-cols-2">
        <div v-for="n in 6" :key="n" class="h-28 bg-gray-100 rounded-lg animate-pulse" />
      </div>
      <div v-else-if="error" class="text-red-600 text-center">⚠️ Failed to load repositories.</div>
      <div v-else class="grid gap-4 md:grid-cols-2">
        <NuxtLink
          v-for="repo in repos"
          :key="repo.id"
          :to="`/projects/${repo.name}`"
          class="block bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
          <h3 class="text-lg font-medium mb-1">{{ repo.name }}</h3>
          <p class="text-sm text-gray-600">{{ repo.description || 'No description.' }}</p>
          <div class="text-xs text-gray-500 mt-2">⭐ {{ repo.stargazers_count }} | 🍴 {{ repo.forks_count }}</div>
        </NuxtLink>
      </div>
    </section>

    <!-- Members -->
    <section class="max-w-3xl mx-auto px-4 py-10">
      <h2 class="text-2xl font-semibold mb-6 text-center">Organization Members</h2>
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="n in 8" :key="n" class="h-24 bg-gray-100 rounded-full animate-pulse" />
      </div>
      <div v-else-if="error" class="text-red-600 text-center">⚠️ Failed to load members.</div>
      <div v-else-if="members.length" class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <a
          v-for="member in members"
          :key="member.login"
          :href="member.html_url"
          target="_blank"
          class="flex flex-col items-center text-center p-4 border rounded-lg hover:shadow-md transition bg-white">
          <img :src="member.avatar_url" alt="" class="w-16 h-16 rounded-full mb-2" />
          <div class="text-sm font-medium text-gray-800">{{ member.login }}</div>
        </a>
      </div>
      <div v-else class="text-center text-gray-500">No members found.</div>
    </section>

    <!-- Join Call to Action -->
    <section class="max-w-2xl mx-auto px-4 py-10 text-center">
      <h2 class="text-2xl font-semibold mb-4">Join Code for Norway</h2>
      <p class="text-gray-700 mb-6">If you'd like to contribute, open a GitHub issue describing who you are and how you'd like to help.</p>
      <a
        href="https://github.com/codefornorway/.github/issues/new?template=join-request.md"
        target="_blank"
        class="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Open Join Request
      </a>
    </section>

    <!-- Support CTA -->
    <section class="max-w-2xl mx-auto px-4 py-10 text-center">
      <h2 class="text-2xl font-semibold mb-4">Support Code for Norway</h2>
      <p class="text-gray-700 mb-6">Your support helps us build civic tech for a better Norway.</p>
      <a href="https://github.com/sponsors/zackha" target="_blank" class="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
        Donate via GitHub Sponsors
      </a>
    </section>
  </div>
</template>
