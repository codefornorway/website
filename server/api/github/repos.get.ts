import type { OrganizationRepo } from '~~/types';
import { octokit } from '~~/server/utils/github';

export default defineCachedEventHandler(
  async () => {
    const config = useRuntimeConfig();

    if (!config.githubOrg) {
      throw createError({
        statusCode: 500,
        statusMessage: 'GitHub organization name is missing in runtime config.',
      });
    }

    return octokit.repos
      .listForOrg({
        org: config.githubOrg,
        type: 'public',
        per_page: 100,
      })
      .then(({ data }) => {
        return data
          .filter(repo => repo.name !== '.github')
          .map<OrganizationRepo>(repo => ({
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
      })
      .catch(err => {
        console.error('Error fetching GitHub repos:', err);
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to fetch GitHub repositories.',
        });
      });
  },
  {
    group: 'api',
    name: 'organization-repos',
    getKey: () => 'all',
    swr: true,
    maxAge: 60 * 5,
  }
);
