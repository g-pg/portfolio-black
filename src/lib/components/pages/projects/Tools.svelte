<script lang="ts">
  import { generateTippy } from '$lib/utils/tippy';
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
    filtered: boolean;
  };

  let { filterProjects, resetProjects, filtered }: Props = $props();

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
      toggleActions: 'play reverse restart reverse',
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
      class="tool infinite filter-btn enter-animation"
      bind:this={plusIcon}
      onmouseleave={() => {
        showPlus = true;
        rotatePlusIcon = true;
      }}><InfiniteIcon /></span>
  </div>
{/snippet}

<div class="tools-wrapper">
  {#each projectTools as tool, i}
    <button class="tool enter-animation" onclick={() => filterProjects(tool as ProjectFilterTool)}>{tool}</button>
  {/each}

  <div class="controls-wrapper">
    {@render plus()}

    <!-- <button class="plus tool reset-btn filter-btn enter-animation" onclick={resetProjects}><ResetIcon /></button> -->
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
    /* border: 1px solid red; */
    gap: 0.5rem;
    color: var(--cl-text-low);
  }

  .rotate {
    animation: 1s cubic-bezier(0.27, 0.53, 0.94, 1.06) rotate forwards;
  }

  .plus-wrapper {
    /* animation: 1s ease rotate infinite; */

    /* aspect-ratio: 1; */
    height: 28.8px;
    width: 28.8px;
    font-size: 1.5rem;
    position: relative;
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

  @keyframes fly {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .reset-btn :global(svg) {
    transition: all 0.3s ease;
  }
  .reset-btn:hover :global(svg) {
    transform: rotate(45deg);
  }

  .reset-btn:focus-within :global(svg) {
    /* transform: scale(0.8); */
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
    .reset-btn {
      display: none;
    }
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
