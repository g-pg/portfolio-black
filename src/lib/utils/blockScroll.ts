type BlockScrollOptions = {
	delay: number;
};

export function blockScroll(node: HTMLElement, options: BlockScrollOptions) {
	document.body.style.overflow = 'hidden';

	setTimeout(() => {
		document.body.style.overflow = 'auto';
	}, options.delay * 1000);

	return {
		destroy() {
			document.body.style.overflow = 'auto';
		},
	};
}
