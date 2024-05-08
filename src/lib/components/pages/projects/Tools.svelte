<script lang="ts">
  import { fly } from 'svelte/transition';
  import PlusIcon from '~icons/lucide/plus';
  import InfiniteIcon from '~icons/bx/infinite';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  const tools = [
    'Javascript',
    'Typescript',
    'HTML',
    'CSS',
    'SASS',
    'GSAP',
    'Vite',
    'Svelte',
    'SvelteKit',
    'React',
    'Next',
    'Figma',
    'Mongo',
    'SQL',
    'Prisma',
    'Node',
    'Docker',
  ];

  let plusIcon: HTMLElement;
  let rotatePlusIcon = $state(true);
  let showPlus = $state(true);
  let plusAnimation = 0;

  let playedToolsAnimation = false;
  onMount(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      '.tool',
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.05,
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
  {#if showPlus}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <span
      class="tool plus"
      class:rotate={rotatePlusIcon}
      bind:this={plusIcon}
      onmouseenter={() => (showPlus = false)}
      onmouseleave={() => (showPlus = true)}><PlusIcon /></span>
  {:else}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <span
      in:fly={{ y: 20, opacity: 0, duration: 300 }}
      class="tool infinite"
      bind:this={plusIcon}
      onmouseleave={() => {
        showPlus = true;
        rotatePlusIcon = true;
      }}><InfiniteIcon /></span>
  {/if}
{/snippet}

<div class="tools-wrapper">
  {#each tools as tool, i}
    <span class="tool">{tool}</span>
  {/each}

  {@render plus()}
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

  .tools-wrapper span {
    line-height: 1.3rem;
  }

  .rotate {
    animation: 1s cubic-bezier(0.27, 0.53, 0.94, 1.06) rotate forwards;
  }
  .plus,
  .infinite {
    /* animation: 1s ease rotate infinite; */

    /* aspect-ratio: 1; */
    height: 28.8px;
    width: 28.8px;
    font-size: 1.5rem;
  }

  .infinite {
    color: var(--cl-grey-900);
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
