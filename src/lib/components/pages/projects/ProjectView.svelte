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
        height: () => (window.innerWidth < 800 ? '100dvh' : '100vw'),
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
</script>

{#snippet info(text)}
  <h3 class="info-title">{infoTitles[text as  keyof Project['texts']]}</h3>

  {#if Array.isArray(project.texts[text as  keyof Project['texts']])}
    {#each project.texts[text as keyof Project['texts']] as t}
      <p>{t}</p>
    {/each}
  {:else}
    <p>{project.texts[text as  keyof Project['texts']]}</p>
  {/if}
{/snippet}

{#snippet phoneMock(project: Project)}
  <div class="phone-mock">
    <img class="phone-mock-img" src={phonePicture} alt="" />
    {#if project?.videos?.mobile}
      <video class="project-mobile-img" src={project.videos?.desktop} muted autoplay loop></video>
    {:else if project.images?.mobile}
      <img class="project-phone-img" src={project?.images?.mobile} alt="" />
    {/if}
  </div>
{/snippet}

{#snippet desktopMock(project: Project)}
  <div class="desktop-mock">
    <img class="desktop-mock-img" src={notebookPicture} alt="" />
    {#if project?.videos?.desktop}
      <div class="video-wrapper project-desktop-img">
        <video src={project.videos?.desktop} muted autoplay loop></video>
      </div>
    {:else if project.images?.desktop}
      <img class="project-desktop-img" src={project?.images?.desktop} alt="" />
    {/if}
  </div>
{/snippet}
<!-- transition:fly={{ y: -window.innerHeight, opacity: 1, duration: 800 }} -->
<!-- <div class="overlay" class:visible={showView}></div> -->
<!-- {#if showView} -->
<div class="view-container">
  <div class="view">
    <button class="close-btn" onclick={() => (showView = false)}><CloseIcon /></button>
    <div class="view-wrapper">
      <div class="header">
        <h2>{project?.fullName}</h2>
        <div class="icons">
          <a href={project.links?.url}><ExternalLinkIcon /></a>
        </div>
      </div>
      <div class="content">
        <div class="project-info">
          {#each Object.keys(project.texts) as t}
            <div class="info-wrapper">
              {@render info(t)}
            </div>
          {/each}
        </div>

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
    width: 80vw;
    height: 90dvh;
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
    top: 1rem;
    /* top: 1rem; */
    left: 50%;
    transform: translateX(-50%);
  }

  .view-wrapper {
    padding-top: 5rem;
    /* width: 90%; */
    /* max-width: 1440px; */
    padding-inline: 2rem;
    color: var(--cl-grey-300);
    /* overflow: auto; */
    margin-inline: auto;
    margin-top: 1rem;
    /* min-height: 100%; */
    /* min-height: 100vh; */
    position: relative;
    /* display: grid;
        place-content: center; */
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
    font-size: clamp(1.3rem, 5vw, 2rem);
  }

  .project-info {
    width: 35%;
    /* border: 1px solid red; */
  }

  .mocks-wrapper {
    width: 60%;
    position: absolute;
    top: 7%;
    right: 0;
    min-height: 100%;
  }

  .desktop-mock,
  .phone-mock {
    /* top: -50px; */
    top: 0;
    right: 0;
    position: absolute;
    /* width: 100%; */
  }

  .desktop-mock {
    width: clamp(300px, 50vw, 850px);
  }

  .phone-mock {
    width: clamp(200px 10vw, 360px);
  }

  .desktop-mock-img,
  .phone-mock-img {
    z-index: 4900;
    position: relative;
  }

  .phone-mock {
    z-index: 4950;
    top: min(30%, 7vw);
    /* top: 20%; */
    right: 1rem;

    /* position: absolute; */
    /* overflow: hidden; */

    /* max-width: 200px; */
  }

  .project-desktop-img {
    position: absolute;
    top: 17.5%;

    left: 14.5%;
    width: 71%;
    height: 100%;
    z-index: 4880;
  }

  .project-desktop-img {
    /* border: 1px solid red; */
  }
  .project-desktop-img video {
    /* height: 500px; */
    /* transform: translateY(4px); */
    width: 100%;
    object-position: center;
    object-fit: fill;
    position: absolute;
  }
  .project-phone-img {
    position: absolute;
    top: 2.5%;
    /* top: 1px; */
    left: 7.1%;
    width: 86.3%;
    height: auto;
    z-index: 4880;
    border-radius: 12px;
    max-height: 350px;
  }
  .project-info {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  p {
    line-height: 1.5;
  }
  ::selection {
    background: var(--cl-bg);
    color: var(--cl-text);
  }

  .info-wrapper {
    text-transform: none;
  }

  .info-title {
    margin-bottom: 0rem;
  }

  .view-wrapper {
    /* margin-top: 2rem; */
    /* padding: 2rem; */
  }
  @media (max-width: 1100px) {
    .close-btn {
      /* top: 3rem; */
      margin-top: 1rem;
    }

    .mocks-wrapper {
      height: 100%;
      top: 8%;
      right: 0;
    }

    .phone-mock {
      width: 300px;
      top: 20px;
      max-width: clamp(90px, 15vw, 200px);
    }

    .view {
      /* top: 50vh; */
      width: 100%;
      height: 100dvh;
    }

    .project-info {
      width: 100%;
    }

    @media (max-width: 500px) {
      .view-container {
        border-radius: 0;
      }
      .header {
        justify-content: center;
      }

      .mocks-wrapper {
        top: 6rem;

        right: 0;
        min-height: auto;
        height: auto;
        width: 100%;
        max-width: auto;
      }

      .phone-mock {
        left: 65%;
      }

      .desktop-mock {
        left: 10%;
      }

      .project-info {
        margin-top: 250px;
      }
    }
  }
</style>
