<script lang="ts">
  import { textShuffle } from '$lib/utils/textShuffle';
  import { onMount } from 'svelte';
  import CardsIcon from '~icons/tabler/cards';

  import MeIcon from '~icons/tabler/user-question';

  import MailIcon from '~icons/bx/envelope';
</script>

{#snippet icon(href: string, name: string, icon: any)}
  <a
    class={name.toLowerCase()}
    {href}
    use:textShuffle={{targetNode: document.querySelector('.title-wrapper h2') as HTMLElement, finalText: name, duration: 0.5, speed: 0.05}}>
    <svelte:component this={icon} />
  </a>
{/snippet}

<div class="page-wrapper">
  <main class="container">
    <div class="title-wrapper fly">
      <h1>Gabriel Gusso</h1>
      <span>//</span>
      <h2
        use:textShuffle={{
          playOn: ['hover', 'load'],
          speed: 0.06,
          duration: 1.6,
        }}>
        Web Developer
      </h2>
    </div>
    <div class="icons-wrapper fly">
      {@render icon('/projects', 'Projetos', CardsIcon)}
      {@render icon('/about', 'Sobre', MeIcon)}
      {@render icon('/contact', 'Contato', MailIcon)}
    </div>
  </main>
  <p class="location fly">Curitiba, Brasil.</p>
</div>

<style>
  .projects-page-wrapper {
    position: relative;
  }
  .page-wrapper {
    /* margin-top: -2rem; */
    display: grid;
    place-content: center;
    min-height: 100dvh;
    /* overflow: hidden; */
  }

  h1,
  h2,
  h3 {
    color: var(--cl-text);
    font-weight: 400;
    font-size: inherit;
    text-transform: uppercase;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    scale: 1.2;
  }

  .fly {
    transition: all 2s ease;
    animation: 0.5s forwards fromBottom;
    animation-delay: 4s;
    opacity: 0;
  }

  @keyframes fromBottom {
    0% {
      /* opacity: 0; */
      transform: translateY(10px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .title-wrapper {
    font-family: var(--overpass);
    display: flex;
    align-items: center;
    font-size: 1rem;
    gap: 0.5rem;
    position: relative;
    min-width: 286px;
    cursor: default;
    user-select: none;
    animation-delay: 0.3s;
    text-align: center;
  }
  h2 {
    position: absolute;
    left: 165px;
    width: max-content;
    /* top: 0; */
  }

  .icons-wrapper {
    display: flex;
    gap: 1rem;
    font-size: 1.5rem;
    animation-delay: 1.4s;
  }

  a {
    cursor: pointer;
    transition: all 0.2s ease;
  }
  a:hover {
    transform: translateY(2px);
    color: var(--cl-text-low);
  }
  .location {
    position: absolute;
    top: 90%;
    left: 50%;
    translate: -40% 0;
    /* transform: translateX(-40%); */
    color: var(--cl-text-low);
    font-family: var(--overpass);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    opacity: 1;
    text-align: center;
    animation-delay: 1.8s;
    opacity: 0;
    text-transform: uppercase;
  }

  @media (max-width: 400px) {
    main {
      scale: 1;
    }
  }
</style>
