<script lang="ts">
  import ArrowLeft from '~icons/mynaui/arrow-long-left';
  import ArrowRight from '~icons/mynaui/arrow-long-right';
  import { textShuffle } from '$lib/utils/textShuffle';
  import { onMount } from 'svelte';

  type Props = {
    text: string;
    direction: 'left' | 'right';
    onclick?: any;
    href?: string;
    finalGap?: number;
    style?: string;
    type?: 'submit';
  };

  let { text, direction, onclick, href, finalGap = 32, style, ...rest }: Props = $props();

  const tag = $derived(href ? 'a' : 'button');

  let element: HTMLElement;
</script>

<svelte:element
  this={tag}
  style="--final-gap: {finalGap}px; {style}"
  role="button"
  tabindex="0"
  {href}
  type={rest.type}
  class="element {direction}"
  {onclick}>
  <span class="text" use:textShuffle={{ playOn: ['hover'], duration: 0.3 }}>{text}</span>
  {#if direction === 'right'}
    <ArrowRight font-size="2rem" />
  {:else}
    <ArrowLeft font-size="2rem" />
  {/if}
</svelte:element>

<style>
  .element {
    display: flex;
    align-items: center;

    gap: 1rem;
    transition: all 0.3s ease;
    width: max-content;
    flex-direction: row-reverse;
    text-transform: uppercase;
    color: var(--cl-text-low);
    font-size: 1.5rem;
    /* width: 100%; */
    font-family: var(--overpass);
  }

  .element :global(svg) {
    transform: translateY(-2px);
    font-size: 2rem;
    /* transition: all 0.5s ease; */
  }
  .right {
    flex-direction: row;
  }
  /* .element:hover :global(svg) {
    transform: translateX(-12px);
  }
  .element.right:hover :global(svg) {
    transform: translateX(12px);
  } */

  .text {
    width: max-content;
  }
  .element:hover {
    gap: var(--final-gap);
    color: var(--cl-text);
  }
</style>
