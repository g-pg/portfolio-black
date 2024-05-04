<script lang="ts">
	import { projects, type Project } from './projectsData';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { textShuffle } from '$lib/utils/textShuffle';
	import { blockScroll } from '$lib/utils/blockScroll';
	import ProjectView from './ProjectView.svelte';

	let pageTitle: HTMLElement;

	let selectedProject: Project | null = $state(null);
	let showProjectView = $state(false);



	onMount(() => {
		const tl = gsap.timeline();

tl.to('.project', {
	y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
	ease: 'none',
	// stagger: .1,
});

ScrollTrigger.create({
	animation: tl,
	trigger: '#projects-section',
	// start: 'top bottom',
	
	scrub: true,
});
		let scrollControl = gsap.to('.scroll-msg', {
			opacity: 1,
			delay: 1.5,
			duration: 0.3,
			y: -5,
		});

		ScrollTrigger.create({
			trigger: '.scroll-msg',
			start: '-100% bottom',
			end: 'center 80% center',
			onLeave: () => {
				scrollControl.reverse();
			},
			onEnterBack: () => {
				scrollControl.play();
			},
		});
	});

	let gsapChangeBg: gsap.core.Tween;

	export function handleProjectsHover(node: HTMLElement, color: string) {
		function enter() {
			gsapChangeBg = gsap.to('.fake-bg', {
				width: '80%',
				height: '80%',
				ease: 'power2',
				backgroundColor: () => color,
				duration: 0.8,
				delay: 0,
			
			});
		}

		function leave() {
			gsapChangeBg.reverse().then(() => {
				gsapChangeBg.kill();
			});
		}

		// node.addEventListener('mouseenter', () => enter());

		// node.addEventListener('mouseleave', () => leave());

		return {
			destroy() {
				node.removeEventListener('mouseenter', () => enter());
				node.removeEventListener('mouseleave', () => leave());
			},
		};
	}

	let translateDown = $state([false, 0]);

	
</script>

<div class="fake-bg"></div>
<!-- <div class="wrapper" id="projects-section" use:blockScroll={{ delay: 1.6 }}> -->
<div class="wrapper" id="projects-section">
	<h1
		id="projects-title"
		bind:this={pageTitle}
		use:textShuffle={{ playOn: ['load'], duration: 1.5, speed: 0.1 }}
	>
		Projetos
	</h1>

	<div class="scroll-msg">
		<p>Scroll</p>
		<div class="asterisk">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 384 512"
				><path
					fill="currentColor"
					d="M192 32c17.7 0 32 14.3 32 32v135.5l111.5-66.9c15.2-9.1 34.8-4.2 43.9 11s4.2 34.8-11 43.9L254.2 256l114.3 68.6c15.2 9.1 20.1 28.7 11 43.9s-28.7 20.1-43.9 11l-111.6-67V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V312.5L48.5 379.4c-15.2 9.1-34.8 4.2-43.9-11s-4.2-34.8 11-43.9L129.8 256L15.5 187.4c-15.2-9.1-20.1-28.7-11-43.9s28.7-20.1 43.9-11l111.6 67V64c0-17.7 14.3-32 32-32"
				/></svg
			>
		</div>
	</div>
	<div class="projects-wrapper">
		{#each projects as p, i}
			<!-- <div class="project _{i + 1}" data-speed="0.1" use:handleProjectsHover={p.mainColor}> -->
				<!-- <ProjectView project={p} {pageTitle} /> -->
			<!-- </div> -->
	
				<div class="project _{i + 1}" data-speed="0.15" 	class:translateDown={translateDown[0] && translateDown[1] !== i} >
					<span class="project-description">[{p.type}]</span>
					<button
					onclick={() => {
						selectedProject = p;
						showProjectView = true;
					}}
					onmouseenter={() => (translateDown = [true, i])}
					onmouseleave={() => (translateDown = [false, i])}
				
					data-speed="0.05"
					class="project"
					use:handleProjectsHover={p.mainColor}
					style="background-image: url({p.thumbnail})"
					use:textShuffle={{
						targetNode: pageTitle,
						finalText: p.shortName,
						reverseOnMouseLeave: true,
						dictionary: 'all',
						speed: 0.06,
						duration: 0.6,
					}}
				>
					</button>
			</div>
			
		{/each}
	</div>
</div>

<ProjectView project={selectedProject!} bind:showView={showProjectView} />

<style>
	.wrapper {
		margin-top: 100dvh;

		/* display: grid; */
		/* place-items: center; */
		/* min-height: 50vh; */
		/* width: 100%; */
		/* position: absolute; */
	}

	.fake-bg {
		position: fixed;
		height: 0;
		width: 0;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}

	h1 {
		color: var(--cl-text-high);
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		/* opacity: 0.2; */
		font-size: clamp(3rem, 10vw, 10rem);
		cursor: default;
		pointer-events: none;
		z-index: 500;
		mix-blend-mode: difference;
	}

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

	
	.projects-wrapper {
	
		display: grid;

		grid-template-rows: 1fr;
		column-gap: 0.8rem;
		
		place-items: center;
		position: relative;
		max-width: 1440px;
		margin-inline: auto;
		min-height: 100vh;

	}

	.project {
		top: 0;
		position: absolute;
		background-size: cover;
		height: 220px;
		width: 340px;
		transition: all 1s ease;
		mix-blend-mode: difference;
	} 
	
	.project-description {
		text-transform: lowercase;
		position: absolute;
		left: 0;
		top: -3.9rem;
		/* color: var(--cl-text-low); */
		/* color: white; */
		/* font-weight: 100; */
		opacity: 0.3;
		font-size: 0.75rem;
	}
	.project._1 {
		left: 10%;
		top: 0;
		left: 1rem;
		z-index: 510;
	}

	.project._2 {
		z-index: 490;
		top: 20%;
		right: 2rem;
	}

	.project._3 {
		z-index: 490;
		top: 40%;
		left: 4rem;
	}

	.project._4 {
		z-index: 510;
		top: 60%;
		right: 4rem;
	}

	.project:hover {
		transform: translate(-10px, -20px) !important;
	}
	.translateDown {
		transform: translate(-1px,1px) !important;
	}


	@media (max-width: 768px) {
		.project {
			height: 120px;
			width: 150px;
		}

		.project-description {
			font-size: .5rem;
		}
	}
</style>
