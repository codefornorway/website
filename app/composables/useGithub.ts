import type { OrganizationRepo, OrganizationMember, RepositoryContributor } from '~~/types';

export function useGithub(repoName?: string) {
  const base = useRuntimeConfig().public.githubApiBase;
  const fetcher = <T>(path: string) => $fetch<T>(`${base}${path}`);

  return {
    repos: !repoName ? useAsyncData<OrganizationRepo[]>('org-repos', () => fetcher('/repos')) : null,

    members: !repoName ? useAsyncData<OrganizationMember[]>('org-members', () => fetcher('/members')) : null,

    repo: repoName ? useAsyncData<OrganizationRepo>(`repo-${repoName}`, () => fetcher(`/repos/${repoName}`)) : null,

    contributors: repoName ? useAsyncData<RepositoryContributor[]>(`contributors-${repoName}`, () => fetcher(`/repos/${repoName}/contributors`)) : null,
  };
}
