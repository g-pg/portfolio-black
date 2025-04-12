<script lang="ts">
  import type { Project } from './projectsData';
  import CloseIcon from '~icons/material-symbols/cancel-outline-rounded';
  import ExternalLinkIcon from '~icons/tabler/external-link';
  import notebookPicture from '$lib/assets/pictures/notebook-mock.png';
  import gsap from 'gsap';
  import { generateTippy } from '$lib/utils/tippy';
  import GithubIcon from '~icons/bx/bxl-github';
  import MobileMock from '$lib/components/mocks/MobileMock.svelte';

  type ProjectText = keyof Project['texts'];
  type Props = {
    project: Project;
    showView: boolean;
  };

  let { project, showView = $bindable() }: Props = $props();

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
{#snippet info(text: ProjectText)}
  <h3 class="info-title">{infoTitles[text]}</h3>

  {#if Array.isArray(project.texts[text])}
    {#each project.texts[text] as t}
      <p>{t}</p>
    {/each}
  {:else}
    <p>{@html project.texts[text as keyof Project['texts']]}</p>
  {/if}
{/snippet}

{#snippet phoneMock(project: Project)}
  <div class="phone-mock">
    <MobileMock>
      {#if project?.videos?.mobile}
        <video class="project-phone-img" src={project.videos?.mobile} muted autoplay loop></video>
      {:else if project.images?.mobile}
        <img class="project-phone-img" src={project?.images?.mobile} alt="" />
      {/if}
    </MobileMock>
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
          {#if project.links}
            {#if project.links?.url}
              {@render projectLinks('url', project.links?.url)}
            {/if}
            {#if project.links?.github}
              {@render projectLinks('github', project.links?.github)}
            {/if}
          {/if}
        </div>
      </div>
      <div class="content {project.isMobile && 'mobile-project'}">
        <div class="info-column">
          {#each Object.keys(project.texts) as t}
            <div class="info-wrapper">
              {@render info(t as ProjectText)}
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
    max-width: 1300px;
  }

  .close-btn {
    z-index: 5005;
    color: var(--cl-grey-600);
    font-size: 2.5rem;
    position: absolute;
    top: 1rem;
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
    min-width: 500px;
    grid-area: info;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'info  mocks';
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
    min-height: 200px;
  }
  .desktop-mock,
  .phone-mock {
    pointer-events: none;
    position: relative;
  }

  .desktop-mock {
    width: clamp(340px, 80vw, 700px);
    z-index: 5000;
  }

  .phone-mock {
    transform: scale(0.35) translateY(-35%);
    z-index: 5010;
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
    top: 0;
    right: -15%;
  }

  .mobile-project .phone-mock {
    transform: scale(0.8) translateY(-20%);
    top: 0;
    left: 0;
    /* border: 1px solid red; */
    overflow: hidden;
  }
  .desktop-mock-img {
    z-index: 4900;

    position: relative;
  }

  .project-desktop-img {
    position: absolute;
    top: 2.3%;
    left: 13%;
    width: 74.3%;
    z-index: 4880;
  }

  .project-phone-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
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
      grid-template-columns: 1fr;
      grid-template-areas:
        'mocks'
        'info';
      gap: 4rem;
    }

    .info-column {
      min-width: auto;
    }
    .mocks-wrapper {
      position: relative;
      width: fit-content;
      margin-inline: auto;
      top: 1rem;
    }

    .mobile-project .mocks-wrapper {
      width: auto;
    }

    .header {
      display: flex;
      flex-direction: column;
    }
    .phone-mock {
      transform: scale(0.35) translate(90%, -40%);
      right: 0;
    }
    .mobile-project .phone-mock {
      transform: scale(0.4) translateY(-100%);
    }
  }

  @media (max-width: 750px) {
    .phone-mock {
      transform: scale(0.3) translate(90%, -70%);
      right: 0;
    }
  }

  @media (max-width: 600px) {
    .phone-mock {
      transform: scale(0.2) translate(180%, -150%);
      right: 0;
    }
  }
</style>
