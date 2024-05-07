<script lang="ts">
  import MailIcon from '~icons/bx/envelope';
  import LinkedinIcon from '~icons/bx/bxl-linkedin';
  import GithubIcon from '~icons/bx/bxl-github';
  import { onMount } from 'svelte';
  import { scrollDirection } from '$lib/utils/scrollDirection';
  import { page } from '$app/stores';

  let faded = $state(false);

  function handleScroll(e: any) {
    const direction = e.detail;

    if (direction === 'down') {
      faded = true;
    } else {
      faded = false;
    }
  }
</script>

{#if $page.url.pathname !== '/'}
  <div class="wrapper" class:faded use:scrollDirection ondirection={handleScroll}>
    <a href="https://www.linkedin.com/in/ggusso/" target="_blank">
      <LinkedinIcon />
      <p>/ggusso</p></a>

    <a href="https://github.com/g-pg" target="_blank">
      <GithubIcon />
      <p>/g-pg</p>
    </a>

    <a class="mail" href="https://github.com/g-pg" target="_blank">
      <MailIcon />
      <p>gabrielpgusso<br />@gmail.com</p>
    </a>
  </div>
{/if}

<style>
  .faded {
    opacity: 0.2;
    right: -300px !important;
  }
  .wrapper {
    position: fixed;
    right: -125px;
    bottom: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    font-size: 1.25rem;
    padding: 0.8rem calc(1rem + 8px) 0.8rem 0.8rem;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(3px);
    z-index: 999;
    transition: all 0.5s ease;
    /* width: 120px; */
  }
  a {
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  a:hover {
    color: var(--cl-text-med);
  }

  p {
    font-size: 0.75rem;
    text-transform: lowercase;
    font-family: var(--overpass);
    line-height: 1.5;
  }

  a {
    height: 25px;
  }

  @media (min-width: 780px) {
    .wrapper:hover {
      right: -8px;
    }
  }
  @media (max-width: 780px) {
    .wrapper {
      font-size: 1rem;
      right: -115px;
      padding: 10px;
    }
  }
</style>
