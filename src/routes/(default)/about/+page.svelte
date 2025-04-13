<script lang="ts">
  import BottomNav from '$lib/components/nav/BottomNav.svelte';
  import AboutItem from '$lib/components/pages/about/AboutItem.svelte';
  import gsap from 'gsap';
  import { onMount } from 'svelte';

  onMount(() => {
    gsap.fromTo(
      '#about-wrapper h2',
      {
        x: -20,
        opacity: 0,
      },
      {
        delay: 0.2,
        stagger: 0.1,
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: 'power1.inOut',
      }
    );
  });

  let openedItem = $state<number>(-1);

  type Item = {
    title: string;
    text?: string;
    htmlText?: string;
  };
  const items: Item[] = [
    {
      title: 'Quem sou eu',
      htmlText: `<p>Sou um desenvolvedor full stack no limbo entre o back e o front-end. Eu gosto de entregar experiências
      e <i>deixar as coisas bonitas</i>, mas o meu coração está em escrever algoritmos e resolver problemas lógicos.
      <br/><br/>
      Sou formado em Direito pela PUCPR, tenho uma paixão indizível por filosofia e, quando o tempo permite, gosto de fazer meus vizinhos chorarem com as minhas incríveis habilidades na guitarra.   
      <br/></br/>
        </p>
       `,
    },

    {
      title: 'Por que sou desenvolvedor?',
      htmlText: `<p>Eu gosto de programar. Eu realmente gosto. Deus é bom por me permitir trabalhar com o que me dá prazer.
        </p>
       `,
    },
    {
      title: 'O que eu valorizo',
      htmlText: `<p>Em colegas, o interesse genuíno. Nada me satisfaz mais que conversar e trilhar um caminho com alguém verdadeiramente interessado nos mesmos objetivos.
      <br/><br/>
      Em um time, a comunicação. Acima do conhecimento técnico.
        Aprendi durante a faculdade que, profissional ou não, qualquer um pode
        aprender qualquer coisa. Mas uma ideia não se realiza quando não é bem expressada.</p>`,
    },
    {
      title: 'Como eu trabalho',
      htmlText: `<p>Eu gosto de ser criativo <i>on the go</i>. Todo projeto tem problemas, e talvez a minha parte preferida seja investigar as soluções.
    
        </p>`,
    },
  ];
</script>

<svelte:head>
  <title>Gabriel Gusso - Sobre mim</title>
</svelte:head>
<div class="container page-wrapper">
  <div class="content-wrapper" id="about-wrapper">
    {#each items as item, i}
      <AboutItem title={item.title} index={i} bind:openedItem>
        {#if item.text}
          <p>{item.text}</p>
        {:else if item.htmlText}
          {@html item.htmlText}
        {/if}
      </AboutItem>
    {/each}
  </div>
</div>
<div class="nav-wrapper">
  <BottomNav />
</div>

<style>
  .page-wrapper {
    /* padding-top: min(3rem, 20vh); */
    display: grid;
    place-content: center;
    max-width: 800px;
    min-height: 80dvh;
    /* border: 1px solid red; */
    /* border: 1px solid red; */
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    /* min-height: 50dvh; */
    /* max-height: 70dvh; */
    /* min-width: 40vw; */
    overflow: auto;
  }

  .nav-wrapper {
    padding-top: min(3rem, 20vh);
  }

  p {
    text-transform: none;
    font-family: var(--overpass);
    line-height: 1.5;
    font-size: 0.975rem;
    /* font-size: 1rem; */
    color: var(--cl-grey-900);
  }

  @media (max-width: 780px) {
    .nav-wrapper {
      padding-bottom: 2rem;
    }
  }
</style>
