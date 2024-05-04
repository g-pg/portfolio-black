<script lang="ts">
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import axonSitePicture from '$lib/assets/pictures/site-axon-desktop.png';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { browser } from '$app/environment';

	if (browser) {
		gsap.registerPlugin(ScrollTrigger);
	}
	onMount(() => {
		// gsap.registerPlugin(ScrollTrigger);

		const windowWrap = gsap.utils.wrap(
			-300,
			window.innerWidth + Math.abs(300 * 8 - window.innerWidth)
		);

		const tl = gsap.timeline();

		gsap.set('.project', {
			x: (i) => i * 300 + 'px',
		});

		tl.to('.project', {
			y: 0,
			duration: 1,
			delay: 0,
			ease: 'elastic.out(.5,1)',
			stagger: 0.1,
			// ease: 'power4.inOut',
		});

		const moveLeft = tl.to(
			'.project',
			{
				duration: 100,
				ease: 'ease(10)',

				// yoyo: true,
				x: () => '-=' + (window.innerWidth + 290),
				backgroundPositionX: '+=100',
				// stagger: 0.01,
				modifiers: {
					x: (x) => windowWrap(parseFloat(x)) + 'px',
					// backgroundPositionX: (x) => -parseFloat(x) % 290,
					// right: gsap.utils.unitize((right) => {}),
					// x: gsap.utils.unitize((x) => {

					// }),
				},

				repeat: -1,
			},
			'<'
		);
	});

	let projects: HTMLElement;
</script>

<div class="wrapper">
	<div class="projects-wrapper" bind:this={projects}>
		{#each new Array(9) as p}
			<div class="project" style="background-image: url({axonSitePicture})">
				<!-- <img src={axonSitePicture} alt="Site da Axon Technology" /> -->
			</div>
		{/each}
	</div>
</div>

<style>
	.wrapper {
		margin-top: 10vh;

		/* display: grid; */
		/* place-items: center; */
		/* min-height: 50vh; */
		/* width: 100%; */
		/* position: absolute; */
	}
	.projects-wrapper {
		margin-top: 10vh;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
		grid-template-rows: 1fr;
		column-gap: 0.8rem;
		width: 100%;
		place-items: center;
		position: relative;
	}

	.project {
		top: 0;
		left: 0;
		position: absolute;
		height: 530px;
		width: 290px;
		transform: translateY(200%);
		background-size: cover;
		/* background-position-x: 900px; */
		filter: grayscale(1);
		transition:
			filter 0.5s ease,
			background 1s ease;
		/* max-width: 300px; */
	}

	.project:hover {
		filter: grayscale(0);
		background-size: 400%;
	}
	.project img {
		filter: grayscale(1);
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		object-fit: cover;
		object-position: left;
	}
</style>
