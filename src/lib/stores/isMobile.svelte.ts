import { browser } from '$app/environment';
import { onMount } from 'svelte';

export function checkViewport() {
  let isMobile = $state(false);

  if (browser) {
    isMobile = window.innerWidth < 780;
  }

  return {
    get isMobile() {
      return isMobile;
    },
  };
}

export const viewport = checkViewport();
