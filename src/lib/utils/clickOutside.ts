export function clickOutside(node: HTMLElement) {
  function handleClick(e: MouseEvent) {
    if (node && !node.contains(e.target as Node) && !e.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('click_outside'));
    }
  }

  document.addEventListener('mousedown', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('mousedown', handleClick, true);
    },
  };
}
