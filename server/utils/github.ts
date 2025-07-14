import { Octokit } from '@octokit/rest';

const token = process.env.GITHUB_TOKEN;

if (!token) {
  throw new Error('GITHUB_TOKEN is missing in environment variables');
}

export const octokit = new Octokit({
  auth: token,
});
