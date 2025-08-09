import type { OrganizationRepo } from '~~/types';
import { octokit } from '~~/server/utils/github';

export default defineCachedEventHandler(
  async event => {
    const name = event.context.params?.name;

    if (!name) {
      throw createError({ statusCode: 400, message: 'Repository name is required' });
    }

    const response = await octokit.repos.get({
      owner: process.env.GITHUB_ORG as string,
      repo: name,
    });

    const repo: OrganizationRepo = {
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

    return repo;
  },
  {
    group: 'api',
    name: 'organization-repo',
    getKey: event => event.context.params?.name || 'unknown',
    swr: true,
    maxAge: 60 * 5,
  }
);
