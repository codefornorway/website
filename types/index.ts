export interface OrganizationRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  login: string;
  name: string | null;
  bio: string | null;
  followers: number;
  avatar_url: string;
  html_url: string;
}

export interface RepositoryContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}
