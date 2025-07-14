export function useGithub() {
  const fetchRepos = async () => {
    return await $fetch('/api/github/repos');
  };

  const fetchRepo = async (name: string) => {
    return await $fetch(`/api/github/repos/${name}`);
  };

  const fetchContributors = async (name: string) => {
    return await $fetch(`/api/github/repos/${name}/contributors`);
  };

  const fetchMembers = async () => {
    return await $fetch('/api/github/members');
  };

  return {
    fetchRepos,
    fetchRepo,
    fetchContributors,
    fetchMembers,
  };
}
