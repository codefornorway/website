// server/api/github/repos.get.ts
import { octokit } from '~~/server/utils/github';
import { defineEventHandler, createError, getQuery, setResponseHeader } from 'h3';

export default defineEventHandler(async event => {
  const cached = await useStorage().getItem('github:repos');

  if (cached) {
    setResponseHeader(event, 'x-cache', 'HIT');
    return cached;
  }

  try {
    const org = process.env.GITHUB_ORG || 'codefornorway';
    const { data } = await octokit.repos.listForOrg({
      org,
      type: 'public',
      per_page: 100,
    });

    const repos = data.map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
    }));

    // sunucu tarafı cache (5 dakika)
    await useStorage().setItem('github:repos', repos);
    setTimeout(() => useStorage().removeItem('github:repos'), 1000 * 60 * 5); // 5 dakika

    setResponseHeader(event, 'x-cache', 'MISS');
    return repos;
  } catch (error: any) {
    console.error('[GitHub Repo Error]', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch GitHub repositories',
    });
  }
});
