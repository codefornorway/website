import type { RepositoryContributor } from '~~/types';
import { octokit } from '~~/server/utils/github';

export default defineCachedEventHandler(
  async event => {
    const name = event.context.params?.name;

    if (!name) {
      throw createError({ statusCode: 400, message: 'Repository name is required' });
    }

    const response = await octokit.repos.listContributors({
      owner: process.env.GITHUB_ORG as string,
      repo: name,
      per_page: 100,
    });

    const contributors: RepositoryContributor[] = response.data.map(contributor => ({
      login: contributor.login ?? '',
      avatar_url: contributor.avatar_url ?? '',
      html_url: contributor.html_url ?? '',
      contributions: contributor.contributions,
    }));

    return contributors;
  },
  {
    group: 'api',
    name: 'repository-contributors',
    getKey: event => event.context.params?.name || 'unknown',
    swr: true,
    maxAge: 60 * 5,
  }
);
