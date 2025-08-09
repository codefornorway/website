import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN, // private
    githubOrg: process.env.GITHUB_ORG, // private
    public: {
      githubApiBase: '/api/github',
    },
  },
});
