<script lang="ts">
  import { browser } from '$app/environment';
  import { onNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import Navbar from '$lib/components/nav/Navbar.svelte';
  import { navState } from '$lib/stores/navState.svelte.js';
  import { sleep } from '$lib/utils/sleep.js';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';

  type Document = {
    startViewTransition?: (cb: () => void) => void;
  };

  let { children, data } = $props();

  onNavigate(navigation => {
    if (!(document as Document).startViewTransition!) return;
    if (navState.navOrigin) return;

    return new Promise(resolve => {
      (document as Document).startViewTransition!(async () => {
        resolve();

        await navigation.complete;
      });
    });
  });

  let resize = $state(0);
  let timeout = $state(0);

  // onMount(() => {
  //   window.addEventListener('resize', () => {
  //     clearInterval(timeout);
  //     timeout = setTimeout(() => {
  //       resize++;
  //       console.log(resize);
  //     }, 200);
  //   });
  // });

  if (browser) {
    gsap.registerPlugin(ScrollTrigger);
  }
</script>

<Navbar />
{#if !navState.navOrigin}
  {#if $page.url.pathname !== '/'}
    <div class="spacing"></div>
  {/if}

  <main>
    {@render children()}
  </main>
{/if}

<style>
  .spacing {
    padding-top: var(--header-height);
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
    }
  }

  @keyframes slide-from-right {
    from {
      transform: translateX(30px);
    }
  }

  @keyframes slide-to-left {
    to {
      transform: translateX(-30px);
    }
  }

  :root::view-transition-old(root) {
    animation:
      90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
  }

  :root::view-transition-new(root) {
    animation:
      200ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
  }
</style>
