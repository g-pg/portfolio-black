<script lang="ts">
  import { textShuffle } from '$lib/utils/textShuffle';
  import CardsIcon from '~icons/tabler/cards';
  import LinkedinIcon from '~icons/bx/bxl-linkedin';
  import MeIcon from '~icons/tabler/user-question';
</script>

<div class="page-wrapper">
  <main class="container">
    <div class="title-wrapper fly">
      <h1>Gabriel Gusso</h1>
      <span>//</span>
      <h2
        use:textShuffle={{
          playOn: ['hover', 'load'],
          speed: 0.08,
          duration: 3,
        }}>
        Web Developer
      </h2>
    </div>
    <div class="icons-wrapper fly">
      <a
        href="/projects"
        use:textShuffle={{targetNode: document.querySelector('.title-wrapper h2') as HTMLElement, finalText: 'Projetos', }}>
        <CardsIcon />
      </a>
      <a
        href="/about"
        target="_blank"
        title="Sobre"
        use:textShuffle={{targetNode: document.querySelector('.title-wrapper h2') as HTMLElement, finalText: 'Sobre',}}>
        <MeIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/ggusso/"
        target="_blank"
        title="Linkedin"
        use:textShuffle={{targetNode: document.querySelector('.title-wrapper h2') as HTMLElement, finalText: 'LinkedIn', }}>
        <LinkedinIcon />
      </a>
    </div>
  </main>
</div>

<style>
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
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
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
    display: flex;
    align-items: center;
    /* flex-direction: column; */
    font-size: 1rem;
    gap: 0.5rem;
    position: relative;
    min-width: 286px;
    /* pointer-events: none; */
    cursor: default;
    user-select: none;
    animation-delay: 0.3s;

    /* transition: all .5s ease; */
  }
  h2 {
    position: absolute;
    left: 152px;
    width: max-content;
    /* top: 0; */
  }

  .icons-wrapper {
    display: flex;
    gap: 1rem;
    font-size: 1.7rem;
    animation-delay: 0.95s;
  }

  a {
    cursor: pointer;
    transition: all 0.2s ease;
  }
  a:hover {
    transform: translateY(2px);
    color: var(--cl-text-low);
  }
</style>
