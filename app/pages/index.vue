<script setup>
const repos = ref([]);
const members = ref([]);
const loading = ref(true);
const error = ref(null);

const { fetchRepos, fetchMembers } = useGithub();

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
  <div class="mx-auto px-4 sm:px-6 xl:px-24 max-w-[1440px]">
    <section class="mb-12">
      <h2 class="text-[2rem] font-bold text-[#2d2926] mt-6 mb-4">Our Projects</h2>

      <div class="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <template v-if="loading">
          <div v-for="n in 3" :key="n" class="project-card h-48 animate-pulse" />
        </template>

        <div v-else-if="error" class="text-red-600 text-center">⚠️ Failed to load repositories.</div>

        <template v-else>
          <ProjectCard v-for="repo in repos" :key="repo.id" :repo="repo" />
        </template>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-medium text-gray-900 mb-6">Members</h2>

      <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
        <template v-if="loading">
          <div v-for="n in 2" :key="n" class="bg-gray-200 rounded-lg h-40 animate-pulse" />
        </template>

        <div v-else-if="error" class="text-red-600 text-center">⚠️ Failed to load members.</div>

        <template v-else>
          <MemberCard v-for="member in members" :key="member.login" :member="member" />
        </template>
      </div>
    </section>

    <!-- Donate Section -->
    <section class="bg-gray-900 text-white mb-12">
      <div class="flex flex-col md:flex-row relative max-w-7xl mx-auto">
        <div class="w-full md:w-7/12 xl:w-8/12 relative">
          <a target="_blank" href="https://github.com/sponsors/zackha" class="no-underline block h-full">
            <img
              alt="Donate to Code for Norway"
              width="1080"
              height="1000"
              decoding="async"
              class="w-full h-full object-cover"
              src="https://github.blog/wp-content/uploads/2019/05/mona-heart-featured.png?w=1600"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </a>
        </div>
        <div class="w-full md:w-5/12 xl:w-4/12 mt-8 md:mt-0 p-8">
          <h2 class="text-gray-100 text-3xl font-medium">Donate to Code for Norway</h2>
          <p class="text-gray-100 text-lg my-4">
            We create volunteer-driven solutions for Norway that deliver real impact to communities nationwide. 100% of your donation goes directly to the developers and
            contributors who make these projects possible.
          </p>
          <a
            target="_blank"
            href="https://github.com/sponsors/zackha"
            class="group inline-flex items-center justify-between gap-4 px-6 py-4 text-[1.063rem] font-normal leading-[1.35] transition-colors duration-200 bg-gray-600 text-white hover:bg-blue-700 focus:bg-blue-700">
            Donate via GitHub Sponsors
            <RightArrow class="transition-colors text-yellow-400 w-6 group-hover:text-white group-focus:text-white" />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
