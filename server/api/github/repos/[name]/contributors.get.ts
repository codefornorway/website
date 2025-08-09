import type { RepositoryContributor } from '~~/types';
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
      .listContributors({
        owner: config.githubOrg,
        repo: name,
        per_page: 100,
      })
      .then(({ data }) => {
        return data.map<RepositoryContributor>(contributor => ({
          login: contributor.login ?? '',
          avatar_url: contributor.avatar_url ?? '',
          html_url: contributor.html_url ?? '',
          contributions: contributor.contributions ?? 0,
        }));
      })
      .catch(err => {
        console.error(`Error fetching contributors for "${name}":`, err);
        throw createError({
          statusCode: 500,
          statusMessage: `Failed to fetch contributors for repository "${name}".`,
        });
      });
  },
  {
    group: 'api',
    name: 'repository-contributors',
    getKey: event => event.context.params?.name || 'unknown',
    swr: true,
    maxAge: 60 * 5,
  }
);
