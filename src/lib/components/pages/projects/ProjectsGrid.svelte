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

  const viewport = checkViewport();
  let pageTitle: HTMLElement;

  let selectedProject: ProjectType | null = $state(null);
  let showProjectView = $state(false);

  onMount(() => {
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

    if (!requestAnimationFrameId && !viewport.isMobile) {
      requestAnimationFrameId = requestAnimationFrame(floatAround);
    }
  }

  function floatAround() {
    xForce = lerp(xForce, 0, 0.15);
    yForce = lerp(yForce, 0, 0.15);

    projectsEl.forEach((el, i) => {
      // console.log(window.innerWidth);
      // console.log(el.innerText, el.getBoundingClientRect());
      const { left, right, top, bottom } = el.getBoundingClientRect();

      if (i === 0) {
        console.log([bottom]);
      }
      if ([left, top].some(n => n < 15) || right >= window.innerWidth - 15 || bottom >= window.innerHeight - 15) {
        gsap.set(el, {
          x: 0,
          y: 0,
        });
        return;
      }

      if (i % 2 === 0) {
        gsap.set(el, {
          x: `+=${xForce * mouseMovementSpeed}`,
          y: `+=${yForce * mouseMovementSpeed}`,
        });
      } else if (i % 3 === 0) {
        gsap.set(el, { x: `+=${xForce * mouseMovementSpeed * 0.5}`, y: `+=${yForce * mouseMovementSpeed}` });
      } else {
        gsap.set(el, { x: `+=${xForce * mouseMovementSpeed * 0.25} `, y: `+=${yForce * mouseMovementSpeed}` });
      }
    });

    requestAnimationFrame(floatAround);
  }

  let resize = $state(0);
  let wrapperEl: HTMLElement;
</script>

<div class="fake-bg"></div>
<div
  class="wrapper"
  id="projects-section"
  bind:this={wrapperEl}
  use:blockScroll={{ delay: 1.6 }}
  onresize={() => resize++}>
  <!-- <div class="wrapper" id="projects-section"> -->
  <h1 id="projects-title" bind:this={pageTitle} use:textShuffle={{ playOn: ['load'], duration: 1, speed: 0.08 }}>
    Projetos
  </h1>

  <!-- {#if viewport.isMobile} -->
  <ScrollMessage />
  <!-- {/if} -->

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="projects-wrapper" onmousemove={handleMouseMovement}>
    {#each projects as p, i}
      <!-- <Project project={p} {pageTitle} /> -->
      <div class="project {p.shortName.toLowerCase()}" data-speed="0.3">
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
    <!-- {#if selectedProject?.fullName === p.fullName} -->
    <!-- {/if} -->
    {#if selectedProject}
      <ProjectView project={selectedProject!} bind:showView={showProjectView} />
    {/if}
  </div>
</div>

<style>
  .wrapper {
    margin-top: 50dvh;
  }

  h1 {
    color: var(--cl-text-high);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* opacity: 0.2; */
    font-size: clamp(3rem, 10vw, 7rem);
    cursor: default;
    pointer-events: none;
    z-index: 500;
    text-align: center;
    mix-blend-mode: difference;
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
    min-height: 100vh;
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
      border 0.5s ease;
    /* color: var(--cl-bg); */
    text-transform: uppercase;
    aspect-ratio: 1;
    mix-blend-mode: difference;
    font-size: 0.8rem;
    border: 2px solid white;
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

  .project.axon {
    left: 16%;
    top: 0;
    height: 150px;
    width: 150px;
    z-index: 510;
  }

  .project.muvi {
    z-index: 490;
    top: 10%;
    right: 15%;
    width: 110px;
    height: 110px;
    /* filter: blur(1px); */
  }

  .project.hub {
    z-index: 490;
    top: 40%;
    left: 10%;
    width: 100px;
    height: 100px;
    filter: blur(0.5px);
  }

  .project.connect {
    z-index: 510;
    top: 30%;
    right: 40%;
    width: 180px;
    height: 180px;
  }

  @media (max-width: 768px) {
    .projects-wrapper {
      margin-top: 100vh;
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
