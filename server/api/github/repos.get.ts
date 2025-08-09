import type { OrganizationRepo } from '~~/types';
import { octokit } from '~~/server/utils/github';

export default defineCachedEventHandler(
  async () => {
    const response = await octokit.repos.listForOrg({
      org: process.env.GITHUB_ORG as string,
      type: 'public',
      per_page: 100,
    });

    const repos: OrganizationRepo[] = response.data
      .filter(repo => repo.name !== '.github')
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        html_url: repo.html_url,
        description: repo.description,
        stargazers_count: repo.stargazers_count ?? 0,
        forks_count: repo.forks_count ?? 0,
        created_at: repo.created_at ?? '',
        updated_at: repo.updated_at ?? '',
      }));

    return repos;
  },
  {
    group: 'api',
    name: 'organization-repos',
    getKey: () => 'all',
    swr: true,
    maxAge: 60 * 5,
  }
);
