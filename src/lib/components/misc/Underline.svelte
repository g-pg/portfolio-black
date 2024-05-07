<script lang="ts">
  import type { PropsWithChildren, Snippet } from 'svelte';

  const { children }: { children: Snippet } = $props();
</script>

<div class="wrapper">
  <!-- <slot /> -->
  {@render children()}
</div>

<style>
  /* .wrapper :global(a),
  .wrapper :global(span),
  .wrapper :global(.underline) {
    text-decoration: none;
    color: white;
    transition: all 1s ease;
    position: relative;
    display: inline;
  }

  .wrapper :global(a)::after,
  .wrapper :global(span)::after,
  .wrapper :global(.underline)::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: var(--cl-text);
    bottom: -1px;
    left: 0px;
    transition: all 0.3s ease;
    transform: scaleX(0);
    transform-origin: 0 0;
  }

  .wrapper :global(a):hover::after,
  .wrapper :global(span):hover::after,
  .wrapper :global(.underline)::after {
    transform: scaleX(1);
    transform-origin: 0 0;
  } */
</style>
