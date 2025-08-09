import type { OrganizationRepo } from '~~/types';
import { octokit } from '~~/server/utils/github';

export default defineCachedEventHandler(
  async event => {
    const config = useRuntimeConfig();
    const name = event.context.params?.name;

    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Repository name is required',
      });
    }

    if (!config.githubOrg) {
      throw createError({
        statusCode: 500,
        statusMessage: 'GitHub organization name is missing in runtime config.',
      });
    }

    return octokit.repos
      .get({
        owner: config.githubOrg,
        repo: name,
      })
      .then(({ data }) => {
        const repo: OrganizationRepo = {
          id: data.id,
          name: data.name,
          full_name: data.full_name,
          html_url: data.html_url,
          description: data.description,
          stargazers_count: data.stargazers_count ?? 0,
          forks_count: data.forks_count ?? 0,
          created_at: data.created_at ?? '',
          updated_at: data.updated_at ?? '',
        };
        return repo;
      })
      .catch(err => {
        console.error(`Error fetching GitHub repo "${name}":`, err);
        throw createError({
          statusCode: 500,
          statusMessage: `Failed to fetch repository "${name}".`,
        });
      });
  },
  {
    group: 'api',
    name: 'organization-repo',
    getKey: event => event.context.params?.name || 'unknown',
    swr: true,
    maxAge: 60 * 5,
  }
);
