<script setup>
const { fetchMembers } = useGithub();

const members = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    members.value = await fetchMembers();
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
    <h1 class="text-3xl font-bold mb-6">Organization Members</h1>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="n in 8" :key="n" class="h-24 bg-gray-100 rounded animate-pulse" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-red-500">⚠️ Failed to load members.</div>

    <!-- Members List -->
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

    <!-- Empty -->
    <div v-else class="text-gray-500">No members found.</div>
  </section>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
