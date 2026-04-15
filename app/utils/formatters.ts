export function formatRepoName<T extends string>(name: T): T {
  if (!name) return name;

  const words = name.includes("-") ? name.split("-") : [name];

  return words
    .map((w) => {
      if (!w) return "";
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ") as T;
}

export function formatDate(date: string): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
