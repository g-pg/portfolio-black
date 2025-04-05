<script lang="ts">
  import { onMount } from 'svelte';
  import MailIcon from '~icons/bx/envelope';
  import LinkedinIcon from '~icons/bx/bxl-linkedin';
  import GithubIcon from '~icons/bx/bxl-github';
  let card: HTMLElement = $state();
  let glow: HTMLElement = $state();
  let glowRed: HTMLElement = $state();
  let bounds: any;

  function rotateToMouse(e: MouseEvent) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    card.style.transform = `
    scale3d(1.07, 1.07, 1.07)
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance) * 2}deg
    )
  `;

    // glow.style.backgroundImage = `
    //   radial-gradient(
    //     circle at
    //     ${center.x * 2 + bounds.width / 2}px
    //     ${center.y * 2 + bounds.height / 2}px,
    //     #19191950,
    //     #0000000f
    //   )
    // `;

    glowRed.style.backgroundImage = `
    radial-gradient(
      circle at
      ${center.x * 2 + bounds.width / 2 - 50}px
      ${center.y * 2 + bounds.height / 2}px,
      rgba(255, 0, 0, 0.08) 0%,
      rgba(0, 0, 0, 0) 80%
    ),
    radial-gradient(
      circle at
      ${center.x * 2 + bounds.width / 2 - 50}px
      ${center.y * 2 + bounds.height / 2}px,
      rgba(0, 255, 0, 0.07) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      circle at
      ${center.x * 2 + bounds.width / 2}px
      ${center.y * 2 + bounds.height / 2}px,
      rgba(0, 0, 255, 0.08) 0%,
      rgba(0, 0, 0, 0) 80%
  )`;
  }

  onMount(() => {
    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
      document.addEventListener('mousemove', rotateToMouse);
    });

    card.addEventListener('mouseleave', () => {
      document.removeEventListener('mousemove', rotateToMouse);
      card.style.transform = '';
      card.style.background = '';
    });
  });
</script>

<div bind:this={card} class="card">
  <div class="glow" bind:this={glow}></div>
  <div class="glow red" bind:this={glowRed}></div>
  <div class="card-content">
    <!-- <div class="logo-col">
      <h2>Gabriel Gusso</h2>
      <span>//</span>
      <h3>web developer</h3>
    </div> -->
    <div class="info-col">
      <a href="https://www.linkedin.com/in/ggusso/" target="_blank">
        <LinkedinIcon />
        <p>/ggusso</p></a>

      <a href="https://github.com/g-pg" target="_blank">
        <GithubIcon />
        <p>/g-pg</p>
      </a>

      <a class="mail" href="mailto:gabrielpgusso@gmail.com" target="_blank">
        <MailIcon />
        <p>gabrielpgusso<br />@gmail.com</p>
      </a>
    </div>
  </div>
</div>

<style>

  .red {
    background-image: radial-gradient(circle at 120% 100%, rgba(255, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
      radial-gradient(circle at 120% 80%, rgba(0, 255, 0, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
      radial-gradient(circle at 120% 80%, rgba(0, 0, 255, 0.08) 0%, rgba(0, 0, 0, 0) 100%);

    /* background: rgb(255, 0, 0); */
  }
  .card {
    width: 100%;
    /* min-width: 450px; */
    max-width: 450px;
    height: 250px;
    /* background: rgba(61, 61, 61, 0.188); */
    /* background-image: radial-gradient(circle at 50% 30%, rgba(25, 25, 25, 0.314), rgba(0, 0, 0, 0.06)); */
    border: 1px solid rgb(41, 41, 41);
    border-radius: 8px;
    /* width: 300px; */
    /* height: 400px; */
    box-shadow: 0 1px 5px #00000099;

    position: relative;

    transition-duration: 300ms;
    transition-property: transform, box-shadow;
    transition-timing-function: ease-out;
    transform: rotate3d(0);
    overflow: hidden;
    aspect-ratio: 16/9;
  }
  .card:hover {
    transition-duration: 150ms;
    box-shadow: 0 5px 20px 5px #10101044;
  }

  .card::after {
    content: '';
    display: inline-block;
    width: 15%;
    height: 200%;
    position: absolute;
    top: -50%;
    left: -30%;
    background-color: rgba(255, 255, 255, 0.052);
    transform: rotate(20deg);
    filter: blur(2px);
    animation: reflect 0.8s ease-in-out;
    animation-delay: 0.6s;
  }

  @keyframes reflect {
    /* transition: all 0.9s ease-in-out; */

    100% {
      left: 170%;
    }
  }

  .card .glow {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    /* z-index: 999; */
  }

  .card-content {
    padding: 1rem;
    text-align: center;
    /* font-family: var(--overpass); */
    /* color: var(--cl-text-low); */
    color: rgba(255, 255, 255, 0.89);
    text-transform: uppercase;
    z-index: 990;
    position: relative;
    font-family: var(--overpass);
    display: grid;
    grid-template-columns: repeat (3, 1fr);
    place-items: center;
    width: 80%;
    margin-inline: auto;
    /* border: 1px solid red; */
  }

  /* .logo-col {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    text-align: center;
    margin-inline: auto;
    padding-top: 1rem;
  } */

  .info-col {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
    /* width: 80%; */
    height: 200px;
    font-size: 0.875rem;
    text-transform: lowercase;
    width: 100%;
    /* border: 1px solid red; */
  }

  .info-col a {
    height: 55px;
  }
  .info-col a {
    transition: all 0.2s ease;
  }

  .info-col a:hover {
    /* transform: scale(1.2); */
    color: #979797;

    background-clip: text;

    /* -webkit-background-clip: text; */
    /* -webkit-text-fill-color: transparent; */
  }

  .info-col :global(svg) {
    font-size: 1.8rem;
  }

  @media (max-width: 500px) {
    .card {
      /* height: 200px; */
      /* padding: 2rem; */
      /* height: auto; */
      /* aspect-ratio: none; */
    }
    .card-content {
      height: 200px;

      width: 90%;
    }

    .info-col {
      /* display: flex; */
      /* gap: 2rem; */
      /* flex-direction: column; */
    }
  }
</style>
