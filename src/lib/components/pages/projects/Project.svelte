<script lang="ts">
  import { textShuffle } from '$lib/utils/textShuffle';
  import { onMount } from 'svelte';
  import ProjectView from './ProjectView.svelte';
  import type { Project } from './projectsData';
  import { browser } from '$app/environment';

  let showProjectView = $state(false);

  let { project, pageTitle }: { project: Project; pageTitle: HTMLElement } = $props();
  let targetNode = $state();

  //   $effect(() => {
  //     if (browser) {
  //       targetNode =
  //     }
  //   });
</script>

{#if browser}
  <button
    class="project-btn"
    data-speed="0.2"
    onclick={() => {
      showProjectView = true;
    }}
    use:textShuffle={{
      targetNode: document.querySelector('#projects-title')! as HTMLElement,
      finalText: project.shortName,
      reverseOnMouseLeave: true,
      dictionary: 'all',
      speed: 0.06,
      duration: 0.6,
    }}>
    [{project.type}]
  </button>
{/if}

{#if showProjectView}
  <ProjectView {project} bind:showView={showProjectView} />
{/if}

<style>
  .project-btn {
    width: 100%;
    height: 100%;
  }
</style>
