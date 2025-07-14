import { octokit } from '~~/server/utils/github';

export default defineEventHandler(async event => {
  const name = event.context.params?.name;

  if (!name) {
    throw createError({ statusCode: 400, message: 'Repository name is required' });
  }

  return octokit.repos
    .get({
      owner: process.env.GITHUB_ORG as string,
      repo: name,
    })
    .then(response => {
      return {
        id: response.data.id,
        name: response.data.name,
        full_name: response.data.full_name,
        html_url: response.data.html_url,
        description: response.data.description,
        stargazers_count: response.data.stargazers_count,
        forks_count: response.data.forks_count,
        created_at: response.data.created_at,
        updated_at: response.data.updated_at,
      };
    });
});
