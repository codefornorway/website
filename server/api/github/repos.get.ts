import { octokit } from '~~/server/utils/github';
import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async () => {
  try {
    const org = process.env.GITHUB_ORG || 'codefornorway';
    const { data } = await octokit.repos.listForOrg({
      org,
      type: 'public',
      per_page: 100,
    });

    return data.map(repo => ({
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
  } catch (error: any) {
    console.error('[GitHub Repo Error]', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch GitHub repositories',
    });
  }
});
