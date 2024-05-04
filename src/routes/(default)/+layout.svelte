<script lang="ts">
  import { browser } from '$app/environment';
  import { onNavigate } from '$app/navigation';
  import Navbar from '$lib/components/nav/Navbar.svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  type Document = {
    startViewTransition?: (cb: () => void) => void;
  };

  let { children, data } = $props();

  onNavigate(navigation => {
    if (!(document as Document).startViewTransition!) return;
    return new Promise(resolve => {
      (document as Document).startViewTransition!(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  if (browser) {
    gsap.registerPlugin(ScrollTrigger);
  }
</script>

<Navbar />
{@render children()}

<style>
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
