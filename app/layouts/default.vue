<script setup>
const repos = ref([]);

const { fetchRepos } = useGithub();

onMounted(async () => {
  try {
    repos.value = await fetchRepos();
  } catch {
    repos.value = [];
  }
});
</script>

<template>
  <div class="min-h-screen">
    <Header />
    <main>
      <slot />
    </main>
    <Footer :repos="repos" />
  </div>
</template>
