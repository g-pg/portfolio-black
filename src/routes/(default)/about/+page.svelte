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
      htmlText: `<p>Olá! Sou um desenvolvedor fullstack altamente inclinado para o front-end: desenvolver algoritmos é um hobby, mas
        nada me satisfaz mais que entregar experiências. E eu gosto delas agradáveis, elegantes [e com boas surpresas,
        aqui e ali].
        <br/>
        <br/>
        Moro em Curitiba, no Paraná. Formei-me em Direito pela PUCPR em 2017. Tenho uma paixão indizível por filosofia e, quando o tempo permite, gosto de fazer meus vizinhos chorarem com as minhas incríveis habilidades na guitarra.   
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
        <br/><br/>
        Se os problemas estão escondidos, eu os procuro: como melhorar a experiência do usuário? Como otimizar esse algoritmo? Qual é a cereja do bolo?
        <br/><br/>
        </p>`,
    },
    // {
    //   title: 'Que ferramentas eu utilizo?',
    //   htmlText: `
    //   <p>

    //     <br/><br/>
    //     Se os problemas estão escondidos, eu os procuro: como melhorar a experiência do usuário? Como otimizar esse algoritmo? Qual é a cereja do bolo?
    //     <br/><br/>
    //     </p>`,
    // },
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
  .text-wrapper {
    overflow: auto;
    max-height: 70vh;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .text-division {
    position: relative;
    /* display: grid; */
    /* grid-template-columns: 70px 1fr; */
    gap: 2rem;
  }

  .division-title {
    text-transform: none;
    font-family: var(--overpass);
    line-height: 1.5;
    font-size: 0.875rem;
    color: var(--cl-text-low);
    display: inline-block;
    /* width: 100%; */
    /* max-width: 80px; */
    position: sticky;

    /* border: 1px solid red; */
    padding-block: 1rem;
    top: 0;
    height: min-content;
    /* padding: 1rem; */
  }

  p {
    text-transform: none;
    font-family: var(--overpass);
    line-height: 1.5;
    font-size: 0.975rem;
    /* font-size: 1rem; */
    color: var(--cl-grey-900);
  }

  span {
    color: #ecc390;
  }

  @media (max-width: 780px) {
    .text-wrapper {
      margin-top: 3rem;
      overflow: unset;
      max-height: unset;
      position: relative;
    }

    .nav-wrapper {
      padding-bottom: 2rem;
    }
  }
</style>
