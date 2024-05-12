<script lang="ts">
  import '$lib/styles/reset.css';
  import '$lib/styles/globals.css';
  import SocialLabel from '$lib/components/nav/SocialLabel.svelte';
  import { page } from '$app/stores';

  let { children } = $props();
</script>

<title>Gabriel Gusso - Portfolio</title>
{#if $page.url.pathname !== '/contact'}
  <SocialLabel />
{/if}
{@render children()}

<style>
</style>
