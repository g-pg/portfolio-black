<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { navState } from '$lib/stores/navState.svelte';
  import { blockScroll } from '$lib/utils/blockScroll';
  import { clickOutside } from '$lib/utils/clickOutside';
  import { textShuffle } from '$lib/utils/textShuffle';
  import gsap from 'gsap';
  import { onMount } from 'svelte';
  import ArrowLeft from '~icons/mynaui/arrow-long-left';
  import ArrowBtn from '../buttons/ArrowBtn.svelte';
  import { scrollDirection } from '$lib/utils/scrollDirection';

  let showNav = $state(false);

  function listMenu() {
    return gsap.fromTo(
      '.burger-menu li',
      {
        x: -10,
        opacity: 0,
      },
      {
        delay: 0.3,
        stagger: 0.1,
        // duration: 0.3,
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power1.inOut',
      }
    );
  }

  let menuReversedList: HTMLElement[] = [];
  onMount(() => {
    menuReversedList = gsap.utils.toArray('.burger-menu li').reverse() as HTMLElement[];
  });
  function unlistMenu() {
    return gsap.to(menuReversedList, {
      x: 10,
      opacity: 0,
      stagger: 0.1,
      // duration: 0.3,
      duration: 0.3,
      ease: 'power1.inOut',
    });
  }

  function handleOpenNav() {
    if (!showNav) {
      showNav = true;
      listMenu();
      blockScroll();
    } else {
      unlistMenu().then(() => (showNav = false));
      blockScroll().destroy();
    }
  }

  function handleNavigate() {
    navState.setNavOrigin();
    handleOpenNav();
  }

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

<div>
  <div class="container bar-wrapper">
    {#if $page.url.pathname !== '/'}
      <nav>
        <div class="breadcrumb" class:faded use:scrollDirection ondirection={handleScroll}>
          <button
            class="breadcrumb-btn"
            onclick={() => goto('/')}
            use:textShuffle={{targetNode: document.querySelector('.breadcrumb-btn span') as HTMLElement}}>
            <ArrowLeft font-size="2rem" color="var(--cl-low-text)" />
            <span>Voltar</span>
          </button>
        </div>
      </nav>
    {/if}
    <div>
      <nav class="burger-nav" class:open={showNav} use:clickOutside onclick_outside={() => (showNav = false)}>
        <button class="burger-btn" class:open={showNav} onclick={() => handleOpenNav()}>
          <span class="burger-line"></span>
        </button>

        {#snippet link(href: string, text: string)}
          <a {href} onclick={handleNavigate} use:textShuffle={{ playOn: ['hover'], duration: 0.4 }}>{text}</a>
        {/snippet}
        <div class="burger-menu">
          <ul>
            <li>
              {@render link('/', 'Home')}
            </li>
            <li>
              {@render link('/projects', 'Projetos')}
            </li>
            <li>
              {@render link('/about', 'Sobre mim')}
            </li>

            <li>
              <ArrowBtn
                text="Fale comigo"
                direction="right"
                onclick={handleNavigate}
                href="/contact"
                finalGap={36}
                style="color: var(--cl-text)" />
              <!-- <a href="/contact" class="contact-link" onclick={handleNavigate}
                ><span use:textShuffle={{ playOn: ['hover'], duration: 0.3 }}>Fale comigo</span>
                <ArrowRight font-size="2rem" color="var(--cl-low-text)" />
              </a> -->
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</div>

<style>
  .bar-wrapper {
    padding-block: 1rem;
    position: fixed;
    top: 0;
    height: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 1000;
  }

  .breadcrumb-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
    color: var(--cl-text-low);
  }

  .breadcrumb-btn:hover {
    color: var(--cl-text);
  }

  .burger-btn {
    margin-left: auto;

    position: fixed;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
    z-index: 100;

    backdrop-filter: blur(2px);
    padding: 25px;
    width: 35px;
    border-radius: 50vw;
    display: grid;
    place-content: center;
    gap: 1rem;
    z-index: 1000;
    /* border: 1px solid blue; */
  }

  .burger-line {
    display: inline-block;
    width: 25px;
    height: 1px;
    background: var(--cl-text);
    transform: translateX(5px);
    /* position: absolute; */

    transition: all 0.5s ease;
    /* background: red; */
  }

  .burger-btn::before {
    position: absolute;
    content: '';
    width: 35px;
    height: 1px;
    top: 15px;
    right: 50%;
    transform: translateX(50%);
    background: var(--cl-text);
    transition: all 0.5s ease;
  }

  .burger-btn::after {
    position: absolute;
    content: '';
    width: 35px;
    height: 1px;
    bottom: 15px;
    right: 50%;
    transform: translateX(50%);
    background: var(--cl-text);
    transition: all 0.5s ease;
  }

  .burger-btn:hover .burger-line {
    /* width: 25px; */
  }

  .burger-btn:hover .burger-line::after {
    width: 35px;
  }

  .burger-btn:hover .burger-line::before {
    width: 25px;
  }

  .burger-btn.open .burger-line {
    opacity: 0;
    transform: translateX(-20px);
  }

  .burger-btn.open::before {
    transform: translate(50%, 5px) rotate(-45deg);
    /* opacity: 1; */
  }
  .burger-btn.open::after {
    transform: translate(50%, -15px) rotate(45deg) !important;
    /* opacity: 1; */
  }

  .burger-menu {
    font-family: var(--overpass);
    /* --height: 20vh; */
    position: fixed;
    background: rgb(0, 0, 0);
    width: 100vw;

    height: 100dvh;
    top: 0;
    right: -100%;
    /* right: -50%; */
    /* right: -100%; */
    transition: all 0.5s ease;
    text-transform: uppercase;
    padding: 3rem 5rem 1rem 1rem;
    /* padding-top: 5rem; */
    border-radius: 8px 0 0 8px;
    backdrop-filter: blur(10px);
    padding: max(3rem, 10vw);
    padding-top: max(5rem, 10vw);
  }

  .open .burger-menu {
    right: 0;
    top: 0;
  }

  .burger-nav ul {
    display: flex;
    flex-direction: column;
    height: 100%;
    /* padding-top: 3rem; */
  }

  .burger-nav li {
    padding: 1rem;
    font-size: 1.5rem;
  }

  .burger-nav ul {
    /* height: 50vh; */
  }

  .burger-nav li:last-child {
    margin-top: auto;
  }

  .burger-nav a {
    transition: all 0.3s ease;
  }
  .burger-nav a:hover {
    color: var(--cl-text-low);
  }

  /* .contact-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.5s ease;
    width: fit-content;
  }

  .contact-link:hover {
    gap: 3rem;
  } */
  @media (max-width: 780px) {
    .breadcrumb {
      transition: all 0.3s ease;
    }
    .breadcrumb.faded {
      opacity: 0;
      transform: translateY(-30px);
    }
  }
</style>
