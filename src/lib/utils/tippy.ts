import tippy, { type Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
export function generateTippy(node: HTMLElement, options: Props | { content: string }) {
  if (!options.content) return;

  const newOptions = { ...options, touch: 'hold' } as Props;

  const tip = tippy(node, newOptions);

  return {
    destroy() {
      () => tip.destroy();
    },
  };
}
