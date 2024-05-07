<script lang="ts">
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  onMount(() => {
    let scrollControl = gsap.to('.scroll-msg', {
      opacity: 1,
      delay: 1.5,
      duration: 0.3,
      y: -5,
    });

    ScrollTrigger.create({
      trigger: '.scroll-msg',
      start: '-100% 70%',
      end: 'center 80% center',
      // markers: true,
      onLeave: () => {
        scrollControl.reverse();
      },
      onEnterBack: () => {
        scrollControl.play();
      },
    });
  });
</script>

<!--  -->
<div class="scroll-msg">
  <p>Scroll</p>
  <div class="asterisk">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 384 512"
      ><path
        fill="currentColor"
        d="M192 32c17.7 0 32 14.3 32 32v135.5l111.5-66.9c15.2-9.1 34.8-4.2 43.9 11s4.2 34.8-11 43.9L254.2 256l114.3 68.6c15.2 9.1 20.1 28.7 11 43.9s-28.7 20.1-43.9 11l-111.6-67V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V312.5L48.5 379.4c-15.2 9.1-34.8 4.2-43.9-11s-4.2-34.8 11-43.9L129.8 256L15.5 187.4c-15.2-9.1-20.1-28.7-11-43.9s28.7-20.1 43.9-11l111.6 67V64c0-17.7 14.3-32 32-32" /></svg>
  </div>
</div>

<style>
  .scroll-msg {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* padding-top: 18rem; */
    color: var(--cl-text-low);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.6rem;
    opacity: 0;
  }

  .asterisk {
    font-size: 0.2rem;
    animation: 4s spin infinite linear;
    padding: 0;
    margin: 0;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
