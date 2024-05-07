<script lang="ts">
  import { page } from '$app/stores';
  import { textShuffle } from '$lib/utils/textShuffle';
</script>

{#snippet anchor(href: string, text: string)}
  <a {href} use:textShuffle>{text}</a>
{/snippet}
<nav>
  {#if $page.url.pathname === '/about'}
    {@render anchor('/projects', 'Ver meu trabalho')}
  {:else if $page.url.pathname === '/projects'}
    {@render anchor('/about', 'Sobre mim')}
  {/if}
  <a href="/contact" use:textShuffle>Entrar em contato</a>
  <!-- <span>//</span> -->
</nav>

<style>
  nav {
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    color: var(--cl-text-low);
    font-family: var(--overpass);
    width: 100%;
    max-width: 800px;
    /* padding-bottom: 2rem; */
    /* margin-top: -2rem; */
    /* mix-blend-mode: difference; */
    z-index: 5000;

    /* padding-bottom: 2rem; */

    display: none;
  }

  a {
    cursor: pointer;
  }

  @media (max-width: 780px) {
    a {
      padding-inline: 1rem;
      font-size: 0.8rem;
    }
  }
</style>
