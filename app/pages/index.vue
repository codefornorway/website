<script setup>
const { fetchRepos, fetchMembers } = useGithub();

const repos = ref([]);
const members = ref([]);
const loading = ref(true);
const error = ref(null);

function formatRepoName(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

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
  <div class="min-h-screen">
    <!-- Header -->
    <header class="bg-[#f7f8f9] border-b-[5px] border-[#e2e5e7]">
      <!-- Top Bar -->
      <div class="bg-[#f3f4f6]">
        <div class="max-w-7xl mx-auto px-4 sm:px-2 lg:px-4">
          <div class="flex justify-between items-center py-2 text-[17px] text-[#2d2926]">
            <span>
              E-post:
              <a href="mailto:hey@codefornorway.org" class="hover:text-[#00569c] hover:underline">
                <strong>hey@codefornorway.org</strong>
              </a>
            </span>
            <div class="flex items-center space-x-1">
              <a href="https://github.com/codefornorway/website/issues/new?template=join-request.yml" target="_blank" class="hover:text-[#00569c] hover:underline">Join us</a>
              <RightArrow class="w-5" />
            </div>
          </div>
        </div>
      </div>

      <!-- Main Header -->
      <div class="max-w-7xl mx-auto px-4 sm:px-2 lg:px-4">
        <div class="flex justify-between items-center py-4">
          <div></div>
          <div class="flex items-center space-x-4">
            <LogoIcon class="h-14" />
            <div class="h-14 w-px bg-black" />
            <span class="text-4xl tracking-tight text-black font-extralight">Code for Norge</span>
          </div>
          <div></div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mx-auto px-4 sm:px-6 xl:px-24 max-w-[1440px]">
      <!-- Hero Section -->
      <section class="mb-12">
        <h2 class="text-[2rem] font-bold text-[#2d2926] mt-6 mb-4">Our Projects</h2>
        <!--<p class="text-[#2d2926] mb-8 text-2xl font-light max-w-4/6">
          Our projects have real impact in local communities. There are countless opportunities to build digital products, programs and services across a number of skill levels and
          practice areas.
        </p>-->

        <!-- Projects Cards -->
        <div class="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div v-if="loading" v-for="n in 3" :key="n" class="project-card h-48 animate-pulse" />
          <div v-else-if="error" class="text-red-600 text-center">⚠️ Failed to load repositories.</div>
          <NuxtLink v-else v-for="repo in repos" :key="repo.id" :to="`/projects/${repo.name}`" class="project-card">
            <div class="flex flex-col flex-1 pr-6">
              <h3 class="text-2xl font-medium text-[#2d2926] mb-2">{{ formatRepoName(repo.name) }}</h3>
              <p class="text-[#2d2926] mb-4">{{ repo.description || 'No description.' }}</p>
            </div>
            <RightArrow class="text-[#0072ce] w-6" />
          </NuxtLink>
        </div>
        <!--<div class="text-right">
          <a href="#" class="text-[#1e40af] hover:text-[#1e3a8a] font-medium">Til alle tjenester →</a>
        </div>-->
      </section>

      <!-- News Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-medium text-gray-900 mb-6">Members</h2>

        <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
          <div v-if="loading" v-for="n in 2" :key="n" class="bg-gray-200 rounded-lg h-40 animate-pulse" />
          <div v-else-if="error" class="text-red-600 text-center">⚠️ Failed to load members.</div>
          <a v-else v-for="member in members" :href="member.html_url" :key="member.login" target="_blank" class="members-card group">
            <div class="flex relative h-full">
              <div class="flex-1 items-start justify-start pr-4">
                <div class="flex items-center space-x-3 mb-4">
                  <img :src="member.avatar_url" alt="" class="w-13 h-13 rounded-full" />
                  <div class="space-y-0.5">
                    <h3 class="font-semibold text-gray-900 group-[&:hover]:underline">{{ member.name }}</h3>
                    <p class="text-sm font-medium text-gray-500">{{ member.followers }} Followers</p>
                  </div>
                </div>

                <p class="mt-1 leading-snug text-ellipsis line-clamp-3 text-[#2d2926]">
                  {{ member.bio || '' }}
                </p>
              </div>
              <RightArrow class="text-[#0072ce] w-6" />
              <div class="absolute right-0 top-0 px-1 py-0.5 text-xs bg-gray-200">Member</div>
            </div>
          </a>
        </div>

        <!--<div class="text-right mt-6">
          <a href="#" class="text-[#1e40af] hover:text-[#1e3a8a] font-medium">Les flere meldinger →</a>
        </div>-->
      </section>

      <!--  
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="font-bold text-gray-900 mb-3">Politiet har pågrepad ettersøkt siktet mann i 20-årene</h3>
          <p class="text-sm text-gray-500 mb-2">Publisert: 4. august 2024 kl. 17:50 | Trøndelag politidistrikt</p>
          <p class="text-gray-600 text-sm mb-4">
            Trøndelag politidistrikt pågarep den tredje siktede personen som har vært ettersøkt i voldssak fra Trondheim. Han er siktet for grov kroppsskade og frihetsberøvelse.
          </p>
          <span class="text-[#1e40af] text-sm">→</span>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="font-bold text-gray-900 mb-3">Konsert på Bjerke Travbane - trafikale begrensninger</h3>
          <p class="text-sm text-gray-500 mb-2">Publisert: 1. august 2024 kl. 14:37 | Oslo politidistrikt</p>
          <p class="text-gray-600 text-sm mb-4">
            Tirsdag 5. august arrangeres en AC/DC-konsert på Bjerke Travbane. På grunn av trafikale utfordringer vil derfor rikvist 4/Trondheimsveien bli stengt mellom Sinsen og
            Kabelvågen i tidsrommet fra kl. 17:20 til kl. 24. 01 natt til onsdag. Omkjøring i Gjerrud...
          </p>
          <span class="text-[#1e40af] text-sm">→</span>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="font-bold text-gray-900 mb-3">Ny politikontakt i Sula</h3>
          <p class="text-sm text-gray-500 mb-2">Publisert: 1. august 2024 kl. 12:41 | Møre og Romsdal politidistrikt</p>
          <p class="text-gray-600 text-sm mb-4">
            Christina Celine Flesjø Straumfors skal bidra til et at lokalsamfunnet, kommunen og politiet samarbeider godt om kriminalitetsforebyggende arbeid i Sula kommune.
          </p>
          <span class="text-[#1e40af] text-sm">→</span>
        </div>
      </section>

      <div class="text-right mb-8">
        <a href="#" class="text-[#1e40af] hover:text-[#1e3a8a] font-medium">Nyheter og presse →</a>
      </div>
      -->

      <div class="flex flex-col space-y-0 mb-12">
        <section class="bg-gray-900 text-white">
          <div class="flex flex-col md:flex-row relative">
            <div class="w-full md:w-7/12 xl:w-8/12 relative">
              <a target="_blank" href="https://github.com/sponsors/zackha" class="no-underline">
                <div class="relative w-full h-full">
                  <img
                    alt="Politidirektoratet"
                    width="1080"
                    height="1000"
                    decoding="async"
                    class="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src="https://github.blog/wp-content/uploads/2019/05/mona-heart-featured.png?w=1600" />
                </div>
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
    </main>

    <!-- Footer -->
    <footer class="bg-[#2d2926] text-white mt-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <!-- Column 1 -->
          <div class="flex h-14 items-center space-x-4 mb-10">
            <LogoIcon class="h-full text-white" />
            <div class="h-full w-px bg-white" />
            <span class="text-4xl tracking-tight text-white font-extralight">Code for Norge</span>
          </div>

          <!-- Column 2 -->
          <div class="mb-10">
            <h3 class="text-2xl mb-5">Our Projects</h3>
            <div class="h-px bg-[#5f5d5c] mb-5"></div>
            <ul class="space-y-4">
              <li v-if="repos.length" v-for="repo in repos" :key="repo.id" :to="`/projects/${repo.name}`">
                <NuxtLink :to="`/projects/${repo.name}`" class="hover:text-blue-400">{{ formatRepoName(repo.name) }}</NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Column 3 -->
          <div>
            <h3 class="text-2xl mb-5">codefornorway.org</h3>
            <div class="h-px bg-[#5f5d5c] mb-5"></div>
            <ul class="space-y-4">
              <li><a href="https://github.com/codefornorway/website/issues/new?template=join-request.yml" target="_blank" class="hover:text-blue-400">Join us</a></li>
              <li><a href="https://github.com/codefornorway/.github/blob/main/LICENSE" target="_blank" class="hover:text-blue-400">MIT License</a></li>
              <li><a href="mailto:hey@codefornorway.org?body=from%20codefornorway.org" class="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
