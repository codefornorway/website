import { octokit } from '~~/server/utils/github';

export default defineEventHandler(async () => {
  const { data: users } = await octokit.orgs.listMembers({
    org: process.env.GITHUB_ORG!,
    per_page: 100,
  });

  return Promise.all(
    users.map(async ({ login, avatar_url, html_url }) => {
      const { data } = await octokit.users.getByUsername({ username: login });

      const { name, bio, followers } = data;

      return { login, name, bio, followers, avatar_url, html_url };
    })
  );
});
