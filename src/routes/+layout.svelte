<script lang="ts">
  import '$lib/styles/reset.css';
  import '$lib/styles/globals.css';
  import SocialLabel from '$lib/components/nav/SocialLabel.svelte';

  let { children } = $props();
</script>

<SocialLabel />
{@render children()}

<style>
</style>
