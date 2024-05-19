<script lang="ts">
  import '$lib/styles/reset.css';
  import '$lib/styles/globals.css';
  import SocialLabel from '$lib/components/nav/SocialLabel.svelte';
  import { page } from '$app/stores';

  let { children } = $props();
</script>

<svelte:head>
  <title>Gabriel Gusso - Portfólio</title>
  <meta name="description" content="Desenvolvedor full-stack localizado em Curitiba, PR." />
  <meta name="keywords" content="HTML, CSS, JavaScript, Svelte, React, SvelteKit, NextJS, Node, Express" />
  <!-- open graph -->
  <meta property="og:image" content="https://i.postimg.cc/XJ8fdV0s/og-img.png" />
  <meta property="og:description" content="Desenvolvedor full-stack localizado em Curitiba, PR." />
  <meta property="og:title" content="Gabriel Gusso - Portfólio" />

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-W6DL9XBDQS"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-W6DL9XBDQS');
  </script>
</svelte:head>

{#if $page.url.pathname !== '/contact'}
  <SocialLabel />
{/if}
{@render children()}

<style>
</style>
