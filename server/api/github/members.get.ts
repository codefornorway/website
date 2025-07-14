import { octokit } from '~~/server/utils/github';

export default defineEventHandler(async event => {
  return octokit.orgs
    .listMembers({
      org: process.env.GITHUB_ORG as string,
      per_page: 100,
    })
    .then(response => {
      return response.data.map(user => ({
        login: user.login,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
      }));
    });
});
