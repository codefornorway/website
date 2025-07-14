// server/api/github/members.get.ts
import { defineEventHandler, createError, setResponseHeader } from 'h3';
import { octokit } from '~~/server/utils/github';

export default defineEventHandler(async event => {
  const org = process.env.GITHUB_ORG || 'codefornorway';

  const cached = await useStorage().getItem('github:members');
  if (cached) {
    setResponseHeader(event, 'x-cache', 'HIT');
    return cached;
  }

  try {
    const { data } = await octokit.orgs.listMembers({
      org,
      per_page: 100,
    });

    const members = data.map(user => ({
      login: user.login,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
    }));

    await useStorage().setItem('github:members', members);
    setTimeout(() => useStorage().removeItem('github:members'), 1000 * 60 * 5);

    setResponseHeader(event, 'x-cache', 'MISS');
    return members;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch GitHub members',
    });
  }
});
