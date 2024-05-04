import { onMount } from 'svelte';

export function checkViewport() {
  let isMobile = $state(false);

  onMount(() => {
    isMobile = window.innerWidth < 780;
  });

  return {
    get isMobile() {
      return isMobile;
    },
  };
}
