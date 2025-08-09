<script setup lang="ts">
const url = useRequestURL();

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', href: '/icon.png' },
    { rel: 'apple-touch-icon', href: '/icon.png' },
    { rel: 'msapplication-TileImage', href: '/icon.png' },
  ],
});

useSeoMeta({
  title: 'Code for Norway — Civic Technology for Public Good',
  description: 'Code for Norway is a non-profit civic tech initiative that develops open-source digital infrastructure to address public challenges across Norway.',
  ogTitle: 'Code for Norway — Civic Technology for Public Good',
  ogDescription: 'Independent civic technology initiative advancing public digital infrastructure through open collaboration, engineering excellence, and community participation.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  twitterCard: 'summary_large_image',
  ogImage: `${url.origin}/social-card.png`,
  twitterImage: `${url.origin}/social-card.png`,
  ogType: 'website',
  ogUrl: url.origin,
  ogSiteName: 'Code for Norway',
  robots: 'index, follow',
  keywords:
    'civic tech, open source, public infrastructure, digital public services, Norway, nonprofit technology, participatory development, code for norway, GIS, nuxt, supabase, help map, work for norway',
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
