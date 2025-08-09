<script setup lang="ts">
const { repos, members } = useGithub();

const donors = [
  {
    name: 'UDI',
    url: 'https://udi.no',
    logo: 'https://media.snl.no/media/192735/standard_udi.png',
  },
];
</script>

<template>
  <div class="mx-auto px-4 sm:px-6 xl:px-24 max-w-[1440px]">
    <!-- Projects Section -->
    <section class="mb-12">
      <h2 class="text-[2rem] font-bold text-[#2d2926] mt-6 mb-4">Our Projects</h2>

      <div class="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <template v-if="!repos">
          <div v-for="n in 3" :key="n" class="project-card h-48 animate-pulse" />
        </template>

        <template v-else>
          <ProjectCard v-for="repo in repos.data.value" :key="repo.id" :repo="repo" />
        </template>
      </div>
    </section>

    <!-- Members Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-medium text-gray-900 mb-6">Members</h2>

      <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
        <template v-if="!members">
          <div v-for="n in 2" :key="n" class="bg-gray-200 rounded-lg h-40 animate-pulse" />
        </template>

        <template v-else>
          <MemberCard v-for="member in members.data.value" :key="member.login" :member="member" />
        </template>
      </div>
    </section>

    <!-- Donate Section -->
    <section class="bg-gray-900 text-white mb-12">
      <div class="flex flex-col md:flex-row relative max-w-7xl mx-auto">
        <div class="w-full md:w-7/12 xl:w-8/12 relative">
          <a target="_blank" href="https://github.com/sponsors/zackha" class="no-underline block h-full" rel="noopener noreferrer">
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
            rel="noopener noreferrer"
            class="group inline-flex items-center justify-between gap-4 px-6 py-4 text-[1.063rem] font-normal leading-[1.35] bg-gray-600 text-white hover:bg-blue-700 focus:bg-blue-700">
            Donate via GitHub Sponsors
            <RightArrow class="text-yellow-400 w-6 group-hover:text-white group-focus:text-white" />
          </a>
        </div>
      </div>
    </section>

    <!-- Join Us Section -->
    <section class="bg-[#e5e9f0] p-8 mb-12">
      <h2 class="text-3xl font-medium text-[#212a3b] mb-3">Join Us</h2>
      <p class="text-gray-700 text-lg mb-6">
        We welcome volunteer developers to join our mission. Thanks to the generous support of our donors, we provide stipends to our contributors so they can focus on building
        impactful solutions for communities in Norway.
      </p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/codefornorway/website/issues/new?template=join-request.yml"
        class="group inline-flex items-center justify-between gap-4 px-6 py-4 text-[1.063rem] font-normal leading-[1.35] bg-gray-600 text-white hover:bg-blue-700 focus:bg-blue-700">
        Become a Volunteer
        <RightArrow class="text-yellow-400 w-6 group-hover:text-white group-focus:text-white" />
      </a>
    </section>

    <!-- Donors Section with Logos -->
    <section class="mb-12">
      <h2 class="text-2xl font-medium text-gray-900 mb-6">Our Donors</h2>
      <div class="flex flex-wrap gap-8 items-center">
        <a
          v-for="donor in donors"
          :key="donor.name"
          :href="donor.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col items-center w-40 hover:scale-105 transition-transform">
          <img :src="donor.logo" :alt="donor.name" class="h-32 object-contain mb-3" />
        </a>
      </div>
    </section>
  </div>
</template>
