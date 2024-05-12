<script lang="ts">
  import BottomNav from '$lib/components/nav/BottomNav.svelte';
  import ProjectsGrid from '$lib/components/pages/projects/ProjectsGrid.svelte';
  import Tools from '$lib/components/pages/projects/Tools.svelte';
  import { projects, type ProjectFilterTool } from '$lib/components/pages/projects/projectsData';
  import { checkViewport } from '$lib/stores/isMobile.svelte';

  let filteredProjects = $state(projects);
  let filteredTool = $state('');

  const viewport = checkViewport();
  function filterProjects(tool: ProjectFilterTool) {
    if (viewport.isMobile) return;

    filteredProjects = projects.filter(project => {
      if (project.filterTools?.includes(tool)) {
        return true;
      }
    });

    filteredTool = tool;
  }

  function resetProjects() {
    filteredProjects = projects.filter(p => p);
    filteredTool = '';
  }
</script>

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
