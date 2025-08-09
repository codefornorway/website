<script setup lang="ts">
defineProps(['repos']);
</script>

<template>
  <footer class="bg-[#2d2926] text-white mt-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid grid-cols-1 md:grid-cols-3">
        <NuxtLink to="/" class="flex h-14 items-center space-x-4 mb-10">
          <LogoIcon class="h-full text-white" />
          <div class="h-full w-px bg-white" />
          <span class="text-4xl tracking-tight text-white font-extralight">Code for Norge</span>
        </NuxtLink>

        <div class="mb-10">
          <h3 class="text-2xl mb-5">Our Projects</h3>
          <div class="h-px bg-[#5f5d5c] mb-5"></div>
          <ul class="space-y-4">
            <li v-for="repo in repos" :key="repo.id">
              <NuxtLink :to="`/projects/${repo.name}`" class="hover:text-blue-400">{{ formatRepoName(repo.name) }}</NuxtLink>
            </li>
          </ul>
        </div>

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
</template>
