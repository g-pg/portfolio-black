<script lang="ts">
  import BottomNav from '$lib/components/nav/BottomNav.svelte';
  import ProjectsGrid from '$lib/components/pages/projects/ProjectsGrid.svelte';
  import Tools from '$lib/components/pages/projects/Tools.svelte';
  import { navState } from '$lib/stores/navState.svelte';
</script>

<div class="page-wrapper">
  <div class="container">
    <Tools />
  </div>
  <ProjectsGrid />
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
