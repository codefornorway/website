import { defineEventHandler, createError } from 'h3';
import { octokit } from '~~/server/utils/github';

export default defineEventHandler(async event => {
  const org = process.env.GITHUB_ORG || 'codefornorway';
  const name = event.context.params?.name;

  if (!name) {
    throw createError({ statusCode: 400, message: 'Repository name is required' });
  }

  try {
    const { data } = await octokit.repos.listContributors({
      owner: org,
      repo: name,
      per_page: 100,
    });

    return data.map(contributor => ({
      login: contributor.login,
      avatar_url: contributor.avatar_url,
      html_url: contributor.html_url,
      contributions: contributor.contributions,
    }));
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: 'Failed to load contributors',
    });
  }
});
