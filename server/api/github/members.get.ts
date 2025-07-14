import { defineEventHandler, createError } from 'h3';
import { octokit } from '~~/server/utils/github';

export default defineEventHandler(async () => {
  const org = process.env.GITHUB_ORG || 'codefornorway';

  try {
    const { data } = await octokit.orgs.listMembers({
      org,
      per_page: 100,
    });

    return data.map(user => ({
      login: user.login,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
    }));
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch GitHub members',
    });
  }
});
