<script lang="ts">
  import { textShuffle } from '$lib/utils/textShuffle';
  import { fly, scale } from 'svelte/transition';
  import type { Project } from './projectsData';
  import CloseIcon from '~icons/material-symbols/cancel-outline-rounded';
  import ExternalLinkIcon from '~icons/tabler/external-link';
  import notebookPicture from '$lib/assets/pictures/notebook-mock.png';
  import phonePicture from '$lib/assets/pictures/phone-mock.png';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { generateTippy } from '$lib/utils/tippy';
  import Underline from '$lib/components/misc/Underline.svelte';
  import GithubIcon from '~icons/bx/bxl-github';
  type Props = {
    project: Project;
    showView: boolean;
  };

  let { project, showView = $bindable() }: Props = $props();
  let thumbBtn: HTMLElement;

  let infoTitles: { [key in keyof Project['texts']]: string } = {
    company: 'Empresa',
    roles: 'Meu papel',
    description: 'Comentários',
    tools: 'Ferramentas',
  };

  $effect(() => {
    if (showView) {
      gsap.to('.view-container', {
        width: '100vw',
        // height: () => (window.innerWidth < 500 ? '100dvh' : '100vw'),
        height: 'max(100vw, 100dvh)',
        duration: 0.5,
        borderRadius: 0,
      });
    } else if (!showView) {
      gsap.set('.view', {});
      // onMount(() => {
      gsap.to('.view-container', {
        // opacity: 1,
        width: '0px',
        height: '0px',
        duration: 0.5,
        borderRadius: () => (window.innerWidth < 800 ? '0' : '500vw'),
      });
    }
  });

  $effect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = showView ? 'hidden' : 'auto';
    }
  });

  function getIcon(type: string) {
    switch (type) {
      case 'github':
        return GithubIcon;
      case 'url':
        return ExternalLinkIcon;
      default:
        null;
    }
  }
</script>

<!-- <Underline></Underline> -->
{#snippet info(text)}
  <h3 class="info-title">{infoTitles[text as  keyof Project['texts']]}</h3>

  {#if Array.isArray(project.texts[text as  keyof Project['texts']])}
    {#each project.texts[text as keyof Project['texts']] as t}
      <p>{t}</p>
    {/each}
  {:else}
    <p>{@html project.texts[text as  keyof Project['texts']]}</p>
  {/if}
{/snippet}

{#snippet phoneMock(project: Project)}
  <div class="phone-mock">
    <img class="phone-mock-img" src={phonePicture} alt="" />
    {#if project?.videos?.mobile}
      <video class="project-phone-img" src={project.videos?.desktop} muted autoplay loop></video>
    {:else if project.images?.mobile}
      <img class="project-phone-img" src={project?.images?.mobile} alt="" />
    {/if}
  </div>
{/snippet}

{#snippet desktopMock(project: Project)}
  <div class="desktop-mock">
    <img class="desktop-mock-img" src={notebookPicture} alt="" />
    {#if project?.videos?.desktop}
      <video class="project-desktop-img" src={project.videos?.desktop} muted autoplay loop></video>
    {:else if project.images?.desktop}
      <img class="project-desktop-img" src={project?.images?.desktop} alt="" />
    {/if}
  </div>
{/snippet}

{#snippet projectLinks(type: string, href: string)}
  {#if href}
    {#if href === 'private'}
      {@const SvelteComponent = getIcon(type)}
      <a class="private-link" href={null} use:generateTippy={{ content: 'Oops, este projeto é privado!' }}>
        <SvelteComponent />
      </a>
    {:else}
      {@const SvelteComponent_1 = getIcon(type)}
      <a {href} target="_blank">
        <SvelteComponent_1 />
      </a>
    {/if}
  {/if}
{/snippet}
<!-- transition:fly={{ y: -window.innerHeight, opacity: 1, duration: 800 }} -->
<!-- <div class="overlay" class:visible={showView}></div> -->
<!-- {#if showView} -->
<div class="view-container">
  <div class="view">
    <button class="close-btn" onclick={() => (showView = false)}><CloseIcon /></button>
    <div class="view-wrapper container">
      <div class="header">
        <h2>{project?.fullName}</h2>
        <div class="icons">
          {@render projectLinks('url', project.links?.url)}
          {@render projectLinks('github', project.links?.github)}
        </div>
      </div>
      <div class="content">
        <div class="info-column">
          {#each Object.keys(project.texts) as t}
            <div class="info-wrapper">
              {@render info(t)}
            </div>
          {/each}
        </div>

        <div class="mocks-column">
          <div class="mocks-wrapper">
            {#if project.videos?.desktop || project.images?.desktop}
              {@render desktopMock(project)}
            {/if}
            {#if project.videos?.mobile || project.images?.mobile}
              {@render phoneMock(project)}
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- {/if} -->

<style>
  .view-container {
    position: fixed;
    width: 0px;
    height: 0px;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 500vw;
    background: var(--cl-white);
    z-index: 5000;
    aspect-ratio: 1;
  }

  .view {
    position: absolute;
    background: var(--cl-white);
    width: 100vw;
    height: 100dvh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5010;
    overflow: auto;
    max-width: 1440px;
  }

  .close-btn {
    z-index: 5005;
    color: var(--cl-grey-600);
    font-size: 2.5rem;
    position: absolute;
    /* position: sticky; */
    top: 1rem;
    /* top: 1rem; */
    left: 50%;
    transform: translateX(-50%);
  }

  .view-wrapper {
    padding-top: 5rem;

    /* padding-inline: 2rem; */
    color: var(--cl-grey-300);
    /* margin-inline: auto; */
    position: relative;
  }

  .header {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    gap: 1rem;
    color: var(--cl-grey-300);
  }

  .header h2 {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
  }

  .icons {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: clamp(1.5rem, 5vw, 2rem);
    z-index: 999999;
  }

  .icons :global(svg) {
    padding: 0;
    transform: translateY(6px);
  }

  .private-link {
    cursor: not-allowed;
  }

  .info-column {
    width: 100%;
    grid-area: info;
  }

  .content {
    display: grid;
    grid-template-areas: 'info mocks mocks';
    margin-top: 3rem;
    gap: 2rem;
    padding-bottom: 3rem;
  }

  .info-wrapper :global(.underline) {
    --color: var(--cl-text-low);
  }
  .mocks-column {
    width: 100%;
    position: relative;

    grid-area: mocks;
  }

  .mocks-wrapper {
    position: sticky;
    top: 1rem;
  }
  .desktop-mock,
  .phone-mock {
    top: 0;
    right: 0;
    position: relative;

    /* overflow: hidden; */
  }

  .desktop-mock {
    width: clamp(340px, 80vw, 800px);
    z-index: 5000;
  }

  .phone-mock {
    width: clamp(90px, 20vw, 360px);
    max-width: fit-content;
    z-index: 5010;
    position: absolute;
    top: 15%;
    right: 0;
  }

  .desktop-mock-img,
  .phone-mock-img {
    z-index: 4900;
    position: relative;
    overflow: hidden;
  }

  .project-desktop-img {
    position: absolute;
    top: 2.3%;
    left: 13%;
    width: 74.3%;
    z-index: 4880;
  }

  .project-phone-img {
    position: absolute;
    top: 2.5%;
    left: 6.5%;
    width: 87%;
    height: auto;
    z-index: 4880;
    border-radius: 12px;
    max-height: 350px;
  }
  .info-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* min-width: 350px; */
  }

  p {
    line-height: 1.5;
  }

  ::selection {
    background: var(--cl-bg);
    color: var(--cl-text);
  }

  @media (max-width: 1250px) {
    .content {
      grid-template-areas:
        'mocks'
        'info';
      gap: 4rem;
    }

    .mocks-wrapper {
      position: relative;
      width: fit-content;
      margin-inline: auto;
    }

    .phone-mock {
      top: 10%;
      right: 0;
    }

    .header {
      display: flex;
      flex-direction: column;
    }
  }
</style>
