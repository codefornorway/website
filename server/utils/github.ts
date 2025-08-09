import { Octokit } from '@octokit/rest';

export function createGithubClient() {
  const { githubToken } = useRuntimeConfig();

  if (!githubToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GitHub API token is missing in runtime config.',
    });
  }

  return new Octokit({
    auth: githubToken,
  });
}

export const octokit = createGithubClient();
