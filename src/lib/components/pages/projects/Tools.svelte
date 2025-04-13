<script lang="ts">
  import { fly } from 'svelte/transition';
  import PlusIcon from '~icons/lucide/plus';
  import InfiniteIcon from '~icons/bx/infinite';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { projectTools, type ProjectFilterTool } from './projectsData';
  import ResetIcon from '~icons/material-symbols/refresh-rounded';

  type Props = {
    filterProjects: (tool: ProjectFilterTool) => void;
    resetProjects: () => void;
    filteredTool: string;
  };

  let { filterProjects, resetProjects, filteredTool }: Props = $props();

  let plusIcon: HTMLElement;
  let rotatePlusIcon = $state(true);
  let showPlus = $state(true);
  let plusAnimation = 0;

  let playedToolsAnimation = false;
  onMount(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      '.enter-animation',
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.03,
        ease: 'circ.inOut',
      }
    );

    ScrollTrigger.create({
      animation: tl,
      // toggleActions: 'play reverse restart reverse',
      trigger: '.tools-wrapper',
      start: 'top center',

      onLeave: () => clearInterval(plusAnimation),
      onEnterBack: () => {
        plusAnimation = setInterval(() => {
          rotatePlusIcon = !rotatePlusIcon;
        }, 5000);
      },
    });
  });
</script>

{#snippet plus()}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="plus-wrapper" class:showPlus class:rotate={rotatePlusIcon}>
    <span
      class="tool plus filter-btn enter-animation"
      bind:this={plusIcon}
      in:fly={{ y: 20, opacity: 0, duration: 300 }}><PlusIcon /></span>

    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <span
      in:fly={{ y: 20, opacity: 0, duration: 300 }}
      class="infinite filter-btn enter-animation"
      bind:this={plusIcon}
      onmouseleave={() => {
        // showPlus = true;
        // rotatePlusIcon = true;
      }}><InfiniteIcon /></span>
  </div>
{/snippet}

<div class="tools-wrapper">
  {#each projectTools as tool, i (tool + i)}
    <button
      class="tool enter-animation"
      class:filteredTool={tool === filteredTool}
      onclick={() => filterProjects(tool as ProjectFilterTool)}>{tool}</button>
  {/each}

  <div class="controls-wrapper">
    {#if filteredTool}
      <button
        in:fly={{ y: 20, opacity: 0, duration: 300 }}
        class:show={filteredTool}
        class="reset-btn enter-animation"
        onclick={resetProjects}><ResetIcon /></button>
    {:else}
      {@render plus()}
    {/if}
  </div>
</div>

<style>
  .tools-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    flex-wrap: wrap;
    width: 100%;
    max-width: 850px;
    margin-inline: auto;
    font-family: var(--overpass);
    text-transform: uppercase;
  }

  .tool {
    text-transform: uppercase;
    transition: all 0.3s ease;
  }

  .filteredTool {
    transform: translateY(-5px) !important;
    color: rgb(255, 217, 0);
  }

  .tool:hover:not(.filter-btn) {
    transform: translateY(-5px) !important;
  }
  .controls-wrapper {
    width: 100%;
    justify-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline: auto;
    gap: 0.5rem;
    font-size: 1.5rem;
  }

  .reset-btn {
    padding: 0;
    margin: 0;
    height: 25px;
    width: 25px;
    font-size: 1.4rem;
    opacity: 0 !important;
    transition: all 0.5s ease;
  }

  .reset-btn.show {
    opacity: 1 !important;
  }
  .reset-btn :global(svg) {
    transition: all 0.3s ease;
  }
  .reset-btn:hover :global(svg) {
    transform: rotate(45deg);
  }

  .rotate {
    transform-origin: center;
    animation: 1s cubic-bezier(0.27, 0.53, 0.94, 1.06) rotate forwards;
  }

  .plus-wrapper {
    height: 28.8px;
    width: 28.8px;
    position: relative;
  }

  @media (max-width: 768px) {
    .plus-wrapper {
      width: 14px;
      height: 14px;
      aspect-ratio: 1;
    }
  }
  .infinite,
  .plus {
    top: 0;
    left: 0;
    position: absolute;
    color: var(--cl-grey-900);
    transition: all 0.2s ease;
  }

  .infinite {
    opacity: 0 !important;
    transform: translateY(20px);
  }

  .plus-wrapper:hover .plus {
    opacity: 0 !important;
    transform: translateY(-20px);
  }

  .plus-wrapper:hover .infinite {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  .plus-wrapper .plus {
    opacity: 1 !important;
    /* animation: fly 0.5 ease forwards; */
    transform: translateY(0px) !important;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    .tools-wrapper {
      gap: 0.8rem;
    }
    .tools-wrapper span {
      font-size: 0.8rem;
    }

    .plus,
    .infinite {
      height: 18px;
      width: 18px;
    }
  }
</style>
