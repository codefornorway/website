import { octokit } from '~~/server/utils/github';

export default defineEventHandler(async event => {
  const name = event.context.params?.name;

  if (!name) {
    throw createError({ statusCode: 400, message: 'Repository name is required' });
  }

  return octokit.repos
    .listContributors({
      owner: process.env.GITHUB_ORG as string,
      repo: name,
      per_page: 100,
    })
    .then(response => {
      return response.data.map(contributor => ({
        login: contributor.login,
        avatar_url: contributor.avatar_url,
        html_url: contributor.html_url,
        contributions: contributor.contributions,
      }));
    });
});
