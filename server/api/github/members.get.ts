import type { OrganizationMember } from '~~/types';
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

    return octokit.orgs
      .listMembers({
        org: config.githubOrg,
        per_page: 100,
      })
      .then(({ data: users }) => {
        return Promise.all(
          users.map(({ login, avatar_url, html_url }) =>
            octokit.users.getByUsername({ username: login }).then(({ data }) => {
              const { name, bio, followers } = data;
              return { login, name, bio, followers, avatar_url, html_url };
            })
          )
        ) as Promise<OrganizationMember[]>;
      })
      .catch(err => {
        console.error('Error fetching GitHub members:', err);
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to fetch GitHub members.',
        });
      });
  },
  {
    group: 'api',
    name: 'organization-members',
    getKey: () => 'all',
    swr: true,
    maxAge: 60 * 5,
  }
);
