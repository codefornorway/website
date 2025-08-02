import { octokit } from '~~/server/utils/github';

export default defineEventHandler(async () => {
  return octokit.repos
    .listForOrg({
      org: process.env.GITHUB_ORG as string,
      type: 'public',
      per_page: 100,
    })
    .then(response => {
      return response.data
        .filter(repo => repo.name !== '.github')
        .map(repo => ({
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
    });
});
