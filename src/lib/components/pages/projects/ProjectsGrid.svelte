<script lang="ts">
  import ScrollMessage from '../../nav/ScrollMsg.svelte';
  import { projects, type Project as ProjectType } from './projectsData';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { textShuffle } from '$lib/utils/textShuffle';
  import { blockScroll } from '$lib/utils/blockScroll';
  import ProjectView from './ProjectView.svelte';
  import { checkViewport } from '$lib/stores/isMobile.svelte';
  import { preload } from '$lib/utils/preload';
  import { getRandomNumber } from '$lib/utils/randomNum';

  const viewport = checkViewport();
  let pageTitle: HTMLElement;

  let selectedProject: ProjectType | null = $state(null);
  let showProjectView = $state(false);

  onMount(() => {
    projects.forEach(project => {
      if (project.videos) {
        preload(project.videos?.desktop ?? '');
        preload(project.videos?.mobile ?? '');
      }

      if (project.images) {
        preload(project.images?.mobile ?? '');
        preload(project.images?.desktop ?? '');
      }
    });
    const tl = gsap.timeline();
    tl.to('.project', {
      y: (_i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
    });

    ScrollTrigger.create({
      animation: tl,
      trigger: '#projects-section',
      scrub: true,
    });

    projectsEl = gsap.utils.toArray('.project');

    // if (window.innerWidth < 780) {
    bubbleGrowOnScroll(projectsEl);
    // }

    gsap.fromTo(
      pageTitle,
      { opacity: 0 },
      {
        opacity: 1,

        duration: 0.5,
        scrollTrigger: {
          trigger: pageTitle,
          toggleActions: 'play none none reverse',
          start: 'top 60%',
        },

        onStart: () => textShuffle(pageTitle, { playOn: ['load'], duration: 0.8, speed: 0.06 }) as any,
      }
    );
  });

  function bubbleGrowOnScroll(projects: HTMLElement[]) {
    const grow = gsap.fromTo(projects, { scale: 0.5 }, { scale: 1, stagger: 0.5, duration: 0.5, ease: 'ease' });

    ScrollTrigger.create({
      animation: grow,
      trigger: '.projects-wrapper',
      start: 'top bottom',
      end: 'top center',
      scrub: true,
    });
  }

  let projectsEl: HTMLElement[];
  const mouseMovementSpeed = 0.12;
  let xForce = $state(0);
  let yForce = $state(0);
  let requestAnimationFrameId: number | null = null;

  const lerp = (start: number, end: number, amount: number) => start * (1 - amount) + end * amount;

  function handleMouseMovement(e: MouseEvent) {
    const { movementX, movementY } = e;
    xForce += movementX * mouseMovementSpeed;
    yForce += movementY * mouseMovementSpeed;

    if (!requestAnimationFrameId) {
      requestAnimationFrameId = requestAnimationFrame(floatAround);
    }
  }

  function floatAround() {
    xForce = lerp(xForce, 0, 0.16);
    yForce = lerp(yForce, 0, 0.16);

    projectsEl.forEach((el, i) => {
      const { left, right, top, bottom } = el.getBoundingClientRect();
      if ([left].some(n => n < 15) || right >= window.innerWidth - 15) {
        gsap.set(el, {
          x: 0,
          y: 0,
        });
        return;
      }

      if (i % 3 === 0) {
        gsap.set(el, { x: `+=${xForce * mouseMovementSpeed * 0.5}`, y: `+=${yForce * mouseMovementSpeed}` });
      } else if (i % 2 === 0) {
        gsap.set(el, {
          x: `+=${xForce * mouseMovementSpeed}`,
          y: `+=${yForce * mouseMovementSpeed}`,
        });
      } else {
        gsap.set(el, { x: `+=${xForce * mouseMovementSpeed * 0.25} `, y: `+=${yForce * mouseMovementSpeed}` });
      }
    });

    requestAnimationFrame(floatAround);
  }

  let resize = $state(0);
  let wrapperEl: HTMLElement;
</script>

<div
  class="wrapper"
  id="projects-section"
  bind:this={wrapperEl}
  use:blockScroll={{ delay: 1.6 }}
  onresize={() => resize++}>
  <h1 id="projects-title" bind:this={pageTitle}>Projetos</h1>

  {#if viewport.isMobile}
    <ScrollMessage />
  {/if}

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="projects-wrapper" onmousemove={handleMouseMovement}>
    {#each projects as p, i}
      <div class="project {p.className}" data-speed="0.3">
        <button
          class="project-btn"
          data-speed="0.2"
          onclick={() => {
            selectedProject = p;

            showProjectView = true;
          }}
          use:textShuffle={{
            targetNode: pageTitle,
            finalText: p.type,
            reverseOnMouseLeave: true,
            dictionary: 'all',
            speed: 0.06,
            duration: 0.6,
          }}>
          {p.shortName}
        </button>
      </div>
    {/each}
    {#if selectedProject}
      <ProjectView project={selectedProject!} bind:showView={showProjectView} />
    {/if}
  </div>
</div>

<style>
  h1 {
    color: var(--cl-text-high);
    position: sticky;
    top: 45%;

    font-size: clamp(2rem, 10vw, 6rem);
    cursor: default;
    pointer-events: none;
    z-index: 500;
    text-align: center;
    mix-blend-mode: difference;
    text-transform: uppercase;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .projects-wrapper {
    display: grid;
    /* grid-template-rows: 1fr; */
    column-gap: 0.8rem;
    place-items: center;
    position: relative;
    max-width: 1440px;
    margin-inline: auto;
    min-height: 90vh;
    /* border: 1px solid red; */
  }

  .project {
    position: absolute;
    top: 0;

    border-radius: 50%;
    height: 90px;
    width: 90px;
    transition:
      transform 0.5s ease-out,
      filter 0.3s ease,
      background 0.3s ease,
      border 0.5s ease,
      scale 0.5s ease;
    /* color: var(--cl-bg); */
    text-transform: uppercase;
    aspect-ratio: 1;
    mix-blend-mode: difference;
    font-size: 0.8rem;
    border: 2px solid white;
    font-family: var(--overpass);
  }

  .project-btn {
    width: 100%;
    height: 100%;
  }

  .project:hover {
    background: white;
    color: black;
    z-index: 510;
  }

  @media (min-width: 780px) {
    .project:hover {
      scale: 1.2 !important;
    }
  }

  .project.axon {
    left: 16%;
    top: 0;
    height: 150px;
    width: 150px;
    z-index: 510;
  }

  .project.old_portfolio {
    z-index: 490;
    top: 40%;
    left: 10%;
    width: 110px;
    height: 110px;
    /* filter: blur(1px); */
  }

  .project.hub {
    z-index: 490;
    top: 40%;
    right: 15%;
    width: 100px;
    height: 100px;
  }

  .project.connect {
    z-index: 510;
    top: 0;
    right: 30%;
    width: 180px;
    height: 180px;
  }

  .project.muvi {
    z-index: 490;
    top: 60%;
    width: 130px;
    height: 130px;
  }
  @media (max-width: 768px) {
    .projects-wrapper {
      margin-top: 100vh;
      min-height: 100vh;
    }
    .project {
      height: 120px;
      width: 150px;
    }

    .project-description {
      font-size: 0.5rem;
    }

    .project.axon {
      left: 1rem;
    }

    .project.muvi {
      top: 0;
    }

    .project.connect {
      left: 1rem;
      top: 45%;
    }

    .project.hub {
      top: 35%;
      left: unset;
      right: 1rem;
    }
  }
</style>
