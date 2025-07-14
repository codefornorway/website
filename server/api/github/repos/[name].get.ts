import { defineEventHandler, createError } from 'h3';
import { octokit } from '~~/server/utils/github';

export default defineEventHandler(async event => {
  const org = process.env.GITHUB_ORG || 'codefornorway';
  const name = event.context.params?.name;

  if (!name) {
    throw createError({ statusCode: 400, message: 'Repository name is required' });
  }

  try {
    const { data } = await octokit.repos.get({
      owner: org,
      repo: name,
    });

    return {
      id: data.id,
      name: data.name,
      full_name: data.full_name,
      html_url: data.html_url,
      description: data.description,
      stargazers_count: data.stargazers_count,
      forks_count: data.forks_count,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 404,
      message: 'Repository not found',
    });
  }
});
