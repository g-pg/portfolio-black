import { projects } from '$lib/components/pages/projects/projectsData';

export async function load() {
  const enabledProjects = projects.filter(project => project.enabled);

  return {
    projects: enabledProjects,
  };
}
