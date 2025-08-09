import type { OrganizationRepo, OrganizationMember, RepositoryContributor } from '~~/types';

export function useGithub(repoName?: string) {
  const base = useRuntimeConfig().public.githubApiBase;
  const fetcher = <T>(path: string) => useFetch<T>(`${base}${path}`);

  return {
    repos: !repoName ? fetcher<OrganizationRepo[]>('/repos') : null,

    members: !repoName ? fetcher<OrganizationMember[]>('/members') : null,

    repo: repoName ? fetcher<OrganizationRepo>(`/repos/${repoName}`) : null,

    contributors: repoName ? fetcher<RepositoryContributor[]>(`/repos/${repoName}/contributors`) : null,
  };
}
