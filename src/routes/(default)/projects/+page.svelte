<script lang="ts">
  import BottomNav from '$lib/components/nav/BottomNav.svelte';
  import ProjectsGrid from '$lib/components/pages/projects/ProjectsGrid.svelte';
  import Tools from '$lib/components/pages/projects/Tools.svelte';
  import { projects, type ProjectFilterTool } from '$lib/components/pages/projects/projectsData';
  import { checkViewport, viewport } from '$lib/stores/isMobile.svelte';

  let filteredProjects = $state(projects);
  let filteredTool = $state('');

  function filterProjects(tool: ProjectFilterTool) {
    // if (viewport.isMobile) return;

    if (filteredTool === tool) {
      resetProjects();
      return;
    }

    filteredProjects = projects.filter(project => project.filterTools?.includes(tool));
    filteredTool = tool;
  }

  function resetProjects() {
    filteredProjects = projects.filter(p => p);
    filteredTool = '';
  }
</script>

<svelte:head>
  <title>Gabriel Gusso - Projetos</title>
</svelte:head>
<div class="page-wrapper">
  <div class="container">
    <Tools {filterProjects} {resetProjects} {filteredTool} />
  </div>
  <ProjectsGrid projects={filteredProjects} />
  <div class="nav-wrapper">
    <BottomNav />
  </div>
</div>

<style>
  .page-wrapper {
    display: flex;
    flex-direction: column;
  }

  .nav-wrapper {
    z-index: 1;
    margin-top: -2rem;
  }
  @media (max-width: 780px) {
  }
</style>
