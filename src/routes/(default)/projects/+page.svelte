<script lang="ts">
  import ProjectsGrid from '$lib/components/pages/projects/ProjectsGrid.svelte'
  import Tools from '$lib/components/pages/projects/Tools.svelte'
</script>

<div class="page-wrapper">
  <div class="container">
    <Tools />
  </div>
  <ProjectsGrid />
</div>

<style>
  .page-wrapper {
    padding-top: var(--header-height);
  }
</style>
