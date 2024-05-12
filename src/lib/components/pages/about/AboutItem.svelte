<script lang="ts">
  import { fly } from 'svelte/transition';
  import type { Snippet } from 'svelte';
  import ArrowRight from '~icons/bx/bxs-right-arrow';
  import { textShuffle } from '$lib/utils/textShuffle';

  type Props = {
    title: string;
    children: Snippet;
    openedItem: number;
    index: number;
  };

  let { title, index, children, openedItem = $bindable() }: Props = $props();

  let showContent = $state(false);

  $effect(() => {
    showContent = openedItem === index;
  });
</script>

<div class="wrapper" class:show={showContent}>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <h2 onclick={() => (openedItem = openedItem === index ? -1 : index)}>
    <span use:textShuffle={{ playOn: ['hover'], speed: 0.05, duration: 0.8 }}>{title}</span>
    <ArrowRight />
  </h2>
  <div class="accordion">
    <div class="content">{@render children()}</div>
  </div>
</div>

<style>
  .wrapper {
    transition: all 0.2s ease;
    /* max-width: 800px; */
  }

  h2 {
    transition: all 0.3s ease;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 400;
    font-family: var(--overpass);
    /* display: flex;
    align-items: center;
    justify-content: flex-start; */
    width: fit-content;
    gap: 1rem;
    font-size: clamp(1rem, 5vw, 1.3rem);
    /* font-size: 1.3rem; */
  }

  h2 :global(svg) {
    font-size: 0.7rem;
    transform: translateY(-3px);
    transition: all 0.3s ease;
  }

  h2:hover :global(svg),
  .show h2 :global(svg) {
    transform: translateX(1.5rem);
  }
  .show h2 :global(svg) {
    transform: translateX(1.5rem) translateY(-3px) rotate(90deg);
  }

  .content :global(p) {
    text-transform: none;
    font-family: var(--overpass);
    line-height: 1.5;
    /* font-size: 0.975rem; */
    font-size: clamp(0.875rem, 3vw, 1rem);
    color: var(--cl-grey-900);
  }

  .accordion {
    display: grid;
    grid-template-rows: 0fr;
    transition: all 0.3s ease;
  }

  .content {
    overflow: hidden;
    transition: all 0.5s ease;
  }

  .show .accordion {
    grid-template-rows: 1fr;
    margin-top: 1rem;
  }
</style>
