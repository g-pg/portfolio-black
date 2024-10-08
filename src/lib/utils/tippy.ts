import tippy, { type Props } from 'tippy.js';
import '$lib/styles/tippy.css';
// import 'tippy.js/dist/tippy.css';
export function generateTippy(node: HTMLElement, options: Props | { content: string }) {
  if (!options.content) return;

  const newOptions = { allowHTML: true, theme: 'black', ...options } as Props;

  const tip = tippy(node, newOptions);

  return {
    destroy() {
      () => tip.destroy();
    },
  };
}
