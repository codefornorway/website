import type { OrganizationRepo, OrganizationMember, RepositoryContributor } from '~~/types';

export function useGithub(repoName?: string) {
  const base = useRuntimeConfig().public.githubApiBase;
  const fetcher = <T>(path: string) => useFetch<T>(`${base}${path}`);

  const repos = fetcher<OrganizationRepo[]>('/repos');
  const members = fetcher<OrganizationMember[]>('/members');
  const repo = repoName ? fetcher<OrganizationRepo>(`/repos/${repoName}`) : null;
  const contributors = repoName ? fetcher<RepositoryContributor[]>(`/repos/${repoName}/contributors`) : null;

  return { repos, members, repo, contributors };
}
