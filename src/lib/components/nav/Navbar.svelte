<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { textShuffle } from '$lib/utils/textShuffle';
	import ArrowLeft from '~icons/mynaui/arrow-long-left';


</script>

<div class="nav-wrapper">
	<div class="container">
		<nav>
			{#if $page.url.pathname !== '/'}
				<div class="breadcrumb">
					<button class="breadcrumb-btn" onclick={() => goto('/')} use:textShuffle={{targetNode: document.querySelector('.breadcrumb-btn span') as HTMLElement}}>
						<ArrowLeft font-size="2rem" color="var(--cl-low-text)" />
						<span>Voltar</span>
					</button>
				</div>
			{/if}
		</nav>


	</div>
</div>

<style>
	.nav-wrapper {
		padding-block: 1rem;
		position: fixed;
		top: 0;
		height: var(--header-height);
	}

	.breadcrumb-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-transform: uppercase;
		color: var(--cl-text-low);
	}

	.breadcrumb-btn:hover {
		color: var(--cl-text);
	}
</style>
